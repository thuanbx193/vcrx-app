import React, { Component }     from "react";
import {
    View, Text,
    Image,
    StatusBar
}                               from "react-native";
import { connect }              from "react-redux";
import {
    getLocalParticipant
}                               from "../../../../features/base/participants";
import { toggleAudio }          from "./../../../actions";
import {
    getTrackByMediaTypeAndParticipant,
}                               from "../../../../features/base/tracks";
import {
    MEDIA_TYPE
}                               from "../../../../features/base/media";
import { AudioMuteButton }      from "../../../../features/toolbox";
import styles                   from "./styles";

class Header  extends Component {
    constructor(props) {
        super(props);
    }

    _renderLocalAudio = () => {
        if (this.props._idLocalParticipant != "local") {
            let audioButtonStyles = {};
            audioButtonStyles.style     = styles.audioButtonStyles;
            audioButtonStyles.iconStyle = this.props._styleAudioBtn;
            return (
                <AudioMuteButton
                    onClick = { this._onToggleAudio }
                    styles = { audioButtonStyles }
                />
            );
        }
    }

    _onToggleAudio = () => {
        this.props.dispatch(toggleAudio());
    }

    render() {
        return (
            <React.Fragment>
                <View style={styles.header}>
                    <StatusBar hidden = {true}/>
                    <View style={styles.headerGradient}>
                        <View style={this.props._styleIconMic}>
                            {this._renderLocalAudio()}
                        </View>
                        <Image
                            style={styles.headerLogo}
                            source={require("./../../../images/logo_app_header.jpg")}
                        />
                        <Text style={styles.roomIdHeader}>{`${this.props._languages.topica.lms.header.room}: ${this.props._roomId}`}</Text>
                    </View>
                </View>             
            </React.Fragment>
        );
    }
}

export function _mapStateToProps(state) {
    let _track              = state["features/base/tracks"];
    let _participantLocal   = getLocalParticipant(state);

    let audioTrackLocal     = getTrackByMediaTypeAndParticipant(_track, MEDIA_TYPE.AUDIO, _participantLocal.id);
    let _audioMutedLocal     = !audioTrackLocal || audioTrackLocal.muted;
    let _styleIconMic, _styleAudioBtn;
    if(_audioMutedLocal){
        _styleIconMic       = styles.borderIconMicOff;
        _styleAudioBtn      = styles.audioButtonStylesIconMuted;
    }else{
        _styleIconMic       = styles.borderIconMicOn;
        _styleAudioBtn      = styles.audioButtonStylesIconNotMuted;
    }

    return {
        _styleIconMic,
        _styleAudioBtn,
        _roomId                     : state["features/base/conference"].room,
        _idLocalParticipant         : _participantLocal.id,
        _languages                  : state["vcrx"].languages
    };
}

export default connect( _mapStateToProps)(Header);
