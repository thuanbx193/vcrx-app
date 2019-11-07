import React            from "react";
import { connect }      from "react-redux";
import {Base64}         from "js-base64";
import {
    Text, View,
    TouchableHighlight,
    FlatList
}                       from "react-native";
import styles           from "./styles";
import {
    changeTabsChat,
    handleReadMessage
}                       from "../../../actions";
import {
    CHAT_TABS_OPTION,
    CHAT_TABS_PRIVATE,
    KEY_ROLE_TEACHER,
    KEY_ROLE_STUDENT,
    KEY_ROLE_MOBILE,
    KEY_ROLE_ASSISTANT,
    KEY_ROLE_PO
}                       from "../../../constants";
import {
    PERMISSION
}                       from "../../../config";

class UserListChat extends React.Component{
    constructor(props){
        super(props);
    }

    _changeTabsChat = (tabs, toId, toFullname) => {
        this.props.dispatch(changeTabsChat(tabs, toId, toFullname));
        this.props.dispatch(handleReadMessage(toId, CHAT_TABS_PRIVATE));
    }

    _renderItemUser = (user) => {
        let { name } = user.item;
        let displayName = name.split("-")[0] !== KEY_ROLE_MOBILE ? name.slice(3) : Base64.decode(name.slice(3).split("-"));
        let uInfo       = displayName.split("-");
        let notify      = this.props._chatInfo.notifies.private.find(n => (n.from == uInfo[uInfo.length-1] && n.count != 0));

        return (
            <TouchableHighlight
                onPress={ ()=> this._changeTabsChat( CHAT_TABS_PRIVATE, uInfo[uInfo.length - 1], displayName ) }
                key = {user.index}
                style ={styles.chatListUser}>
                <View style={styles.chatHeadTitleView}>
                    <Text style = {styles.chatHeadTitleViewText}>{displayName}</Text>
                    {
                        notify &&
                        <Text style={styles.textNotify}>{notify.count}</Text>
                    }
                </View>
            </TouchableHighlight>
        );
    }

    _keyExtractor = item => item.id;

    render(){
        if( this.props._chatInfo.tabs === CHAT_TABS_OPTION && this.props._users.length > 0){
            return(
                <FlatList
                    data = {this.props._users}
                    renderItem = {this._renderItemUser}
                    keyExtractor={this._keyExtractor}
                />
            );
        }else{
            return(<View/>);
        }
    }
}

function _mapStateToProps(state){
    let participants = state["features/base/participants"];
    let role = state["vcrx"].userInfo.role;
    let users = [];
    users = [
        ...participants.filter(user => user.name && user.name.split("-")[0] === KEY_ROLE_TEACHER),
        ...participants.filter(user => user.name && user.name.split("-")[0] === KEY_ROLE_ASSISTANT),
        ...participants.filter(user => user.name && user.name.split("-")[0] === KEY_ROLE_PO),
        ...participants.filter(user => user.name && user.name.split("-")[0] === KEY_ROLE_STUDENT && !user.audit),
        ...participants.filter(user => user.name && user.name.split("-")[0] === KEY_ROLE_MOBILE && !user.local&& !user.audit)
    ];
    if ( PERMISSION.disablePulicChat.indexOf(role) >= 0){
        users = [
            ...participants.filter(user => user.name && user.name.split("-")[0] === KEY_ROLE_PO)
        ];
    }
    return {
        _users      : users,
        _chatInfo   : state["vcrx"].chatInfo
    };
}

export default connect(_mapStateToProps)(UserListChat);
