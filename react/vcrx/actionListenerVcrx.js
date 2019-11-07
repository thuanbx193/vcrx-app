import { Keyboard }                 from "react-native";
import {
    VIDEO_WARMUP,
    ACTION_VIDEO,
    ACTION_UPDATE_P,
    P_KEY,
    ACTION_KICK,
    ACTION_TOGGLE_MICRO,
    ACTION_SEND_ASSESSMENT,
    ACTION_START_ROOM,
    PORTAL_LINKING,
    ACTION_UPLOAD
}                                   from "./constants";
import {
    participantUpdated,
    getLocalParticipant
}                                   from "./../features/base/participants";
import {
    kickDuplicateUser,
    kickUser,
    toggleMicro,
    changeRoomInfo,
    updateParticipant,
    sendAssessment,
    handleSetMessage,
    handleUploadMaterial,
    changeAssessment,
    updateChatUsers
} from "./actions";
import { JitsiConferenceEvents }    from "./../features/base/lib-jitsi-meet";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

export function _addVcrxListeners(conference, dispatch) {
    let d = new Date();
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    let timeNow = Math.round(new Date(utc + (3600000 * 7)).getTime() / 1000);

    dispatch(updateParticipant(conference));

    conference.addCommandListener(
        ACTION_VIDEO,
        (data) => {
            Keyboard.dismiss();
            let action = data.value.split(",")[0];
            switch (action) {
                case VIDEO_WARMUP.SHOW:
                    dispatch(changeAssessment({ show: false }));
                    dispatch(changeRoomInfo({showVideo: true}));
                    break;
                case VIDEO_WARMUP.PLAY:
                    dispatch(changeRoomInfo({playVideo: true}));
                    break;
                case VIDEO_WARMUP.PAUSE:
                    dispatch(changeRoomInfo({playVideo: false}));
                    break;
                case VIDEO_WARMUP.CLOSE:
                    dispatch(changeRoomInfo({showVideo: false}));
                    break;
            }
        });
    conference.addCommandListener(
        ACTION_UPDATE_P,
        (data, id) => {
            let d = JSON.parse(data.value);
            switch (d.field) {
                case P_KEY.raiseHand:
                    dispatch(participantUpdated({id, raiseHand: d.data}));
                    break;
                case P_KEY.audit:
                    dispatch(participantUpdated({id, audit: d.data}));
            }
        });
    conference.addCommandListener(
        ACTION_TOGGLE_MICRO,
        (data, id) => {
            let d = JSON.parse(data.value);
            dispatch(toggleMicro(d));
        });
    conference.addCommandListener(
        ACTION_KICK,
        (data, id) => {
            if(data) {
                dispatch(kickUser(data.value, data.attributes.action));
            }
        });
    conference.on(
        JitsiConferenceEvents.MESSAGE_RECEIVED,
        (id, body) => {
            body = JSON.parse(entities.decode(body));
            dispatch(updateChatUsers({id: body.userId, fullname: body.userName}));
            dispatch(handleSetMessage(body, body.timestamp));
        });
    conference.on(
        JitsiConferenceEvents.CONFERENCE_JOINED,
        (id, body) => {
            dispatch(kickDuplicateUser(conference));
        });
    conference.addCommandListener(
        ACTION_SEND_ASSESSMENT,
        (data) => {
            dispatch(sendAssessment(data));
        });
    conference.addCommandListener(
        ACTION_START_ROOM,
        (data) => {
            dispatch(changeRoomInfo({timeStarted: data.value}));
        });
    conference.addCommandListener(
        ACTION_UPLOAD,
        (data) => {
            dispatch(handleUploadMaterial(data));
        });
}
