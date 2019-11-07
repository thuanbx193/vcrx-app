import React, { Component } from "react";
import {
    View, Text,
    FlatList
}                           from "react-native";
import { connect }          from "react-redux";
import { translate }        from "../../../../features/base/i18n";
import styles               from "./styles";
import FontAwesome          from "react-native-vector-icons/FontAwesome";
import {saveLogAction, setDataChangeMic, toggleAudio} from "../../../actions";
import {
    CONNECTTION_FAILD, ICON,
    KEY_ROLE_ASSISTANT, KEY_ROLE_MOBILE,
    KEY_ROLE_PO,
    KEY_ROLE_STUDENT,
    KEY_ROLE_TEACHER,
    ACTION_LOG_MIC
} from "../../../constants";
import {MEDIA_TYPE}         from "../../../../features/base/media/constants";
import {
    getTrackByMediaTypeAndParticipant,
}                           from "../../../../features/base/tracks";
import {Base64}             from "js-base64";
import {getParticipants} from "../../../../features/base/participants";
import {ColorPalette} from "../../../../features/base/styles";

class UserList  extends Component {

    findUser = (role, isAudit = false) => user => user.name.split("-")[0] == role && user.audit == isAudit;

    removeDuplicates = (arr, property) => {
        return arr.filter((obj, index, arr) => {
            return arr.map(mapObj => mapObj[property]).indexOf(obj[property]) === index;
        });
    }

    _onToggleAudio = local => () => {
        this.props.dispatch(toggleAudio(local));
    }

    _sortUserList = () => {
        let userList = [];
        let users = this.props._participants.filter(user => user.name && user.email && user.connectionStatus != CONNECTTION_FAILD);

        let teachers        = users.filter(this.findUser(KEY_ROLE_TEACHER));
        let mobileStudents  = users.filter(this.findUser(KEY_ROLE_MOBILE));
        let assistants      = users.filter(this.findUser(KEY_ROLE_ASSISTANT));
        let pos             = users.filter(this.findUser(KEY_ROLE_PO));
        let webStudents     = users.filter(this.findUser(KEY_ROLE_STUDENT));
        let auditStudents   = users.filter(this.findUser(KEY_ROLE_MOBILE, true));
        auditStudents       = auditStudents.filter(user => user.local == true);

        mobileStudents = this.removeDuplicates(mobileStudents,"avatarID");
        return userList.concat(teachers, assistants, pos, webStudents, mobileStudents, auditStudents );
    }

    _getAudioTrack(id){
        let audioTrack = getTrackByMediaTypeAndParticipant(this.props._track, MEDIA_TYPE.AUDIO, id);
        let audioMuted = !audioTrack || audioTrack.muted;
        return audioMuted;
    }

    _renderItem = (user) => {
        let { local, name, raiseHand, id, audit } = user.item;
        let iconName = ICON.IC_MIC_DISABLE;
        let iconStyle = styles.audioButtonStylesIconMuted;
        let color = ColorPalette.darkGrey;
        if(!this._getAudioTrack(id)){
            iconName = ICON.IC_MIC_ENABLE;
            iconStyle =  styles.audioButtonStylesIconNotMuted;
            color = "#4C9AFF";
            if (this.props.dataMic.timeStart && local){
                let dataMic = this.props.dataMic;
                let data = {
                    userId: dataMic.userId,
                    roomId: this.props.idRoom,
                    action: "turn off",
                    status: iconName === ICON.IC_MIC_ENABLE ? "pass" : "fail",
                    timeListen: new Date().getTime() - dataMic.timeStart
                };
                this.props.dispatch(setDataChangeMic({...dataMic, timeStart: 0}));
                this.props.dispatch(saveLogAction(data, ACTION_LOG_MIC));
            }
        }

        let iconList = [
            {role: KEY_ROLE_TEACHER,    icon: ICON.IC_TEACHER},
            {role: KEY_ROLE_ASSISTANT,  icon: ICON.IC_ASSISTANT},
            {role: KEY_ROLE_PO,         icon: ICON.IC_PO},
            {role: KEY_ROLE_STUDENT,    icon: ICON.IC_STUDENT},
            {role: KEY_ROLE_MOBILE,     icon: ICON.IC_MOBILE},
            {role:"ALL",                icon: ICON.IC_ALL_USER}
        ];
        name = name.split("-");
        let icon = iconList.find(icon => icon.role == name[0]).icon;
        if(name[0] == KEY_ROLE_MOBILE && audit) icon = ICON.IC_AUDIT;
        let displayName = name[0] !== KEY_ROLE_MOBILE ? name.slice(1,3).join("-") : Base64.decode(name.slice(1,3).join("-"));
        let role = name[0];
        if(role === KEY_ROLE_TEACHER){
            var videoTrack = getTrackByMediaTypeAndParticipant(this.props._track, MEDIA_TYPE.VIDEO, id);
        }
        return (
            <View key = {user.index} style = {styles.wrapperItemUser}>
                <View style={styles.roleIcon}>
                    <FontAwesome name={icon} size = {14} sty    le={styles.roleIcon}/>
                </View>
                <Text numberOfLines={1} style={local ? styles.userListOwn: styles.userList} >{displayName}</Text>
                { (role == KEY_ROLE_MOBILE || role == KEY_ROLE_STUDENT) && raiseHand &&
                    <FontAwesome name= {ICON.IC_RAISE_HAND} size={14} color={"#0084ff"} style={styles.raiseHand}/>
                }
                { (videoTrack && role === KEY_ROLE_TEACHER && !videoTrack.muted) &&
                    <FontAwesome name= {ICON.IC_WEBCAM} size={14} color={"#DD0000"} style={styles.raiseHand}/>
                }
                <FontAwesome color = {color} name={iconName} size = {14} onPress = {this._onToggleAudio(local)} style = {styles.icAudio}/>
            </View>
        );
    }

    _keyExtractor = item => item.id.toString()

    render() {
        return (
            <View style={styles.listUser}>
                <View style={styles.userListTittle}>
                    <Text style={styles.userListTittleText}>{this.props._languages.topica.vcrx.error.users}</Text>
                </View>
                <FlatList
                    data = {this._sortUserList()}
                    renderItem = {this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }
}

export function _mapStateToProps(state) {
    return {
        _participants       : getParticipants(state),
        _languages          : state["vcrx"].languages,
        _track              : state["features/base/tracks"],
        dataMic             : state["vcrx"].dataMic,
        idRoom              : state["vcrx"].roomInfo.idRoom
    };
}
export default translate(connect(_mapStateToProps)(UserList));
