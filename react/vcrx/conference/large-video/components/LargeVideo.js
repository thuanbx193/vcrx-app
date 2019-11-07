/**
 * LargeVideo.native.js
 * Render ra camera
 *
 * Created : 2018/04/20
 * Modified: 2018/04/20
 * Author  : Anhlh2
 * Edited  : Anhlh2
 *
 * Copyright (c)-2017 TOPICA EDTECH GROUP (www.topica.asia)
 ******************************************************************************/
/* @flow */
import React, { Component } from "react";
import { connect }          from "react-redux";
import styles               from "./styles";
import { ParticipantView }  from "../../../../features/base/participants";

/**
 * Implements a React {@link Component} which represents the large video (a.k.a.
 * the conference participant who is on the local stage) on mobile/React Native.
 *
 * @extends Component
 */
class LargeVideo extends Component<*> {
    /**ư
     * Implements React"s {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <ParticipantView
                avatarStyle = { styles.avatar }
                participantId = { this.props._participantId }
                style = { styles.largeVideo }
                useConnectivityInfoLabel = { true }
                zOrder = { 10011 } />
        );
    }
}


/**
 * Maps (parts of) the Redux state to the associated LargeVideo"s props.
 *
 * Author : jiti team
 * Modified by : ThuanBX
 *
 * @param {Object} state - Redux state.
 * @private
 * @returns {{
 *     _participantId: string
 * }}
 *
 * Description :
 *          - Lấy danh sách tracks( mỗi user sẽ có 1 tracks và được khởi tạo mỗi khi join class ) trong state["features/base/tracks"]
 *          - Bắt sự kiện có người bật camera,  mediaType sẽ là video
 *          - Set cho mọi người đều nhìn thấy camera của người đó
 *          - Nếu không có ai bật camera thì set cho mọi người focus vào camera của chính mình
 */
function _mapStateToProps(state) {
    let participantIdCustom = "";
    let tracks = state["features/base/tracks"];
    let participants = state["features/base/participants"];
    participants.forEach((item) => {
        if (item.name && item.name.substring(0, 2) === "GV"){
            tracks.forEach((track) => {
                if (item.id === track.participantId && !track.local && track.mediaType === "video" && !track.muted){
                    participantIdCustom = track.participantId;
                }
            });
        }
    });

    if(participantIdCustom){
        return {
            _participantId: participantIdCustom
        };

    }else{
        return {
            _participantId: null
        };
    }
}
export default connect(_mapStateToProps)(LargeVideo);
