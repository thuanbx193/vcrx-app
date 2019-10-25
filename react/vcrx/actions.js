import { Alert, Linking, Platform }  from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    ACTION_UPDATE_P,
    P_KEY,
    ACTION_LOG_RAISE_HAND,
    SYSTEM,
    KEY_ACTION_IN,
    KEY_ROLE_MOBILE,
    KEY_AS_ACCOUNT,
    KEY_AS_TOKEN,
    NOTIFY_CHAT_STORAGE,
    CHAT_TABS_PUBLIC,
    CHAT_ID_PUBLIC,
    CHAT_TYPE_PUBLIC,
    CHAT_TYPE_PRIVATE,
    PORTAL_LINKING,
    ACTION_KICK,
    DUPLICATE_USER,
    ID_LOG_ACTION,
    KEY_M_PDF,
    KEY_M_VIDEO,
    KEY_ACTION_OUT,
    KEY_ROLE_AUDIT,
    SOCKET,
    SET_CONFIG,
    ROLE,
    MOBILE_SYSTEM,
    ACTION_LOG_OUT,
    LOGOUT_BY_KICKOUT,
    LOGOUT_BY_INCOMING_CALL,
    CONNECTION_QUALITY,
    APP_VERSION,
    SYSTEM_LOG,
    ACTION_LINKING_PORTAL_CONNECT,
    TYPE_SYSTEM_LOG,
    LOG_INFO_DEVICE,
    LOG_CALL,
    LEAVE_KICK_PO,
    LEAVE_KICK_CALL,
    LEAVE_PROACTIVE,
    LEAVE_KICK_LOSTCONNECT,
    LEAVE_KICK_ETC,
    LEAVE_KICK_DUPLICATE
} from "./constants";
import {
    DEFAULT_SERVER_URL,
    LINK_PLAYSTORE_PORTAL,
    LINK_APPSTORE_PORTAL,
    PERMISSION,
    TIME_EXIT_APP,
    LINK_PLAYSTORE_VCRX,
    LINK_APPSTORE_VCRX,

}                                   from './config';
import {
    CHANGE_ROOM_INFO,
    CHANGE_TABS_CHAT,
    LOGOUT,
    CHANGE_CHAT_INFO,
    CHANGE_USER_INFO,
    CHANGE_ASSESSMENT,
    SET_TIME_NOW,
    CHANGE_LANGUAGE,
    SET_SOCKET,
    TIME_JOIN_CLASS,
    DATA_CHANGE_MIC,
    SET_TIME_EXIT
}                                   from './actionTypes';
import { Base64 }                   from 'js-base64';
import { appNavigate }              from './../features/app';
import {toURLString}                from "./../features/base/util";
import {
    getTrackByMediaTypeAndParticipant,
}                                   from './../features/base/tracks';
import {
    setAudioMuted,
    setVideoMuted
}                                   from './../features/base/media';
import {
    MEDIA_TYPE,
    VIDEO_MUTISM_AUTHORITY
}                                   from "./../features/base/media/constants";
import {
    getLocalParticipant,
    participantUpdated
}                                   from './../features/base/participants';
import {
    setLogsAction,
    setLogInOut,
    setAsyncStorage,
    getLogChat,
    loginAPICore,
    getRoomInfo,
    getLogAction,
    getTimeFromServer,
    addLogAction,
    setLogChat,
    addLogError,
    getAsyncStorage,
    configAPI,
    setLogsInfo,
    getUserInfo,
    setLogsErrorAction,
    checkUpdateAppAPI
}                                   from "./apis";
import RNExitApp                    from 'react-native-exit-app';
import DeviceInfo                   from 'react-native-device-info';

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();


/**
 * Lưu thời gian bắt đầu mở/tắt mic
 * @param status
 * @returns {{type, status: *}}
 */
export function setDataChangeMic(dataMic){
    return{
        type: DATA_CHANGE_MIC,
        dataMic
    }
}

export function saveLogAction(data,type){
    return function(dispatch,getState) {
        if (getState()['features/base/config'].enableLog){
            let datas = {
                system: SYSTEM_LOG,
                timeCreated: Math.round(new Date().getTime()/1000),
                type,
                data
            }
            setLogsAction(datas);
        }
    }
}

export function saveLogInfo(data, type) {
    return function(dispatch,getState) {
        if (getState()['features/base/config'].enableLog) {
            let datas = {
                system: SYSTEM_LOG,
                timeCreated: Math.round(new Date().getTime()/1000),
                type,
                data
            }
            setLogsInfo(datas);
        }
    }
}

export function saveLogError(data, type){
    return function(dispatch,getState) {
        if (getState()['features/base/config'].enableLog) {
            let datas = {
                system: SYSTEM_LOG,
                timeCreated: Math.round(new Date().getTime()/1000),
                type,
                data
            }
            setLogsErrorAction(datas);
        }
    }
}

export function changeUserInfo(userInfo){
    return {
        type: CHANGE_USER_INFO,
        userInfo
    };
}

export function changeRoomInfo(roomInfo){
    return {
        type: CHANGE_ROOM_INFO,
        roomInfo
    };
}

export function changeAssessment(assessmentStudent){
    return{
        type: CHANGE_ASSESSMENT,
        assessmentStudent
    }
}

function setTimeNow(timeNow) {
    return {
        type: SET_TIME_NOW,
        timeNow
    };
}

export function setTimeExitApp(timeExit) {
    return {
        type: SET_TIME_EXIT,
        timeExit
    };
}

export function setConfig(config, index = 3) {
    return function(dispatch) {
        configAPI(config).then(res => {
            if(res.status){
                let domains = res.result.value.split(',');
                const params = {
                    DOMAIN_API: domains[1],
                    DEFAULT_SERVER_URL: domains[0],
                    DOMAIN_SOCKET: domains[2],
                    DOMAIN_LOGS: domains[3],
                    select: index
                };
                AsyncStorage.setItem(SET_CONFIG, JSON.stringify(params));
            }
        });
    }
}

export function setCustomConfig(data, index = 3) {
    return function(dispatch) {
        const params = {
            DOMAIN_API: data.DOMAIN_API,
            DEFAULT_SERVER_URL: data.DEFAULT_SERVER_URL,
            DOMAIN_SOCKET: data.DOMAIN_SOCKET,
            DOMAIN_LOGS: data.DOMAIN_LOGS,
            select: index
        };
        AsyncStorage.setItem(SET_CONFIG, JSON.stringify(params));
    }
}

export function getTimeServer(){
    return function(dispatch,getState) {
        let { userInfo } = getState()['vcrx'];
        getTimeFromServer(userInfo.tokenAPI).then((rsTimeNow)=>{
            if(rsTimeNow.status){
                dispatch(setTimeNow(rsTimeNow.result / 1000));
            }
        });
    }
}

export function updateTimeNow() {
    return function (dispatch, getState){
        dispatch(setTimeNow(getState()['vcrx'].timeNow + 1));
    }
}

export function setLanguage(languages){
    return {
        type: CHANGE_LANGUAGE,
        languages
    };
}

export function setSocket(socket){
    return {
        type: SET_SOCKET,
        socket
    };
}

function handleSetLogInOut(role, actionType) {
    return function (dispatch, getState) {
        let { userInfo, roomInfo } = getState()['vcrx'];
        if(role == ROLE.audit) {
            setLogInOut(roomInfo.idRoomVcrx, actionType, userInfo.participantid, userInfo.tokenAPI, ROLE.auditMobile);
        } else {
            setLogInOut(roomInfo.idRoomVcrx, actionType, userInfo.participantid, userInfo.tokenAPI, ROLE.mobile);
        }
    }
}

export function raiseHand(status = false){
    return function (dispatch,getState){
        let { conference }              = getState()['features/base/conference'];
        let { roomInfo, userInfo,languages }      = getState()['vcrx'];
        if (PERMISSION.disableRaiseHand.indexOf(userInfo.role) == -1){
            if(status){
                conference.sendCommand(ACTION_UPDATE_P, {value: JSON.stringify({field: P_KEY.raiseHand, data: false})});
            }else{
                let _track              = getState()['features/base/tracks'];
                let _participantLocal   = getLocalParticipant(getState());
                let audioTrackLocal     = getTrackByMediaTypeAndParticipant(_track, MEDIA_TYPE.AUDIO, _participantLocal.id);
                let _audioMutedLocal    = !audioTrackLocal || audioTrackLocal.muted;
                if(!_audioMutedLocal){
                    return;
                }
                let localParticipant     = getLocalParticipant(getState);
                let data = {
                    "userId"    : userInfo.id,
                    "roomId"    : roomInfo.idRoom,
                    "state"     : !localParticipant.raiseHand,
                    "system"    : MOBILE_SYSTEM
                }
                dispatch(saveLogAction(data,ACTION_LOG_RAISE_HAND));
                conference.sendCommand(ACTION_UPDATE_P, {value: JSON.stringify({field: P_KEY.raiseHand, data: !localParticipant.raiseHand})});
            }
        } else {
            Alert.alert(languages.topica.vcrx.error.notification,languages.topica.vcrx.error.limited_role);
        }
    }
}

export function startRoom(){
    return function (dispatch, getState){
        let {userInfo, roomInfo} = getState()['vcrx'];
        let localParticipant     = getLocalParticipant(getState);

        if(userInfo.role == ROLE.audit) {
            localParticipant.audit  = true;
            localParticipant.name   = KEY_ROLE_MOBILE +"-" + Base64.encode(userInfo.firstname + " " + userInfo.lastname + "-" + userInfo.id);
            localParticipant.email  = Math.floor(Date.now() / 1000).toString();
        } else {
            localParticipant.audit  = false;
            localParticipant.name   = KEY_ROLE_MOBILE +"-" + Base64.encode(userInfo.firstname + " " + userInfo.lastname + "-" + userInfo.id);
            localParticipant.email  = Math.floor(Date.now() / 1000).toString();
        }

        dispatch(participantUpdated(localParticipant));

        dispatch(setAudioMuted(true, true));
        dispatch(setVideoMuted(true, true));
        dispatch(handleSetLogInOut(userInfo.role, KEY_ACTION_IN));
        setTimeout(() => {
            dispatch(handleGetMessage());
        }, 5000)
    }
}

export function handleLayout(indexLayout){
    return function(dispatch){
        dispatch(changeRoomInfo({indexLayout}));
    }
}


export function toggleMicro(data){
    return function (dispatch,getState){
        let localParticipant = getLocalParticipant(getState);
        if (data.id == localParticipant.id) {
            if(data.status){
                dispatch(raiseHand(true));
            }
            dispatch(setAudioMuted(!data.status, true));
        }
    }
}

export function toggleAudio(local=true){
    return function (dispatch,getState){
        let { languages, userInfo } = getState()['vcrx'];
        let dataMic = {
            timeStart   : new Date().getTime(),
            userId      : userInfo.id,
            isMuted     : true
        };
        if ( PERMISSION.disableMic.indexOf(userInfo.role) == -1){
            let _track              = getState()['features/base/tracks'];
            let _participantLocal   = getLocalParticipant(getState());

            let audioTrackLocal     = getTrackByMediaTypeAndParticipant(_track, MEDIA_TYPE.AUDIO, _participantLocal.id);
            let _audioMutedLocal    = !audioTrackLocal || audioTrackLocal.muted;
            if (_audioMutedLocal || !local){
                Alert.alert(languages.topica.vcrx.error.notification,languages.topica.vcrx.layout.role);
            }else {
                dispatch(setDataChangeMic(dataMic));
                dispatch(setAudioMuted(true, VIDEO_MUTISM_AUTHORITY.USER));
            }
        } else {
            Alert.alert(languages.topica.vcrx.error.notification,languages.topica.vcrx.error.limited_role);
        }
    }
}

export function changeTabsChat(tabs, toId, toFullname){
    let toUserId = 0;
    if(toFullname){
        toUserId = toId;
    }
    return{
        type: CHANGE_TABS_CHAT,
        tabs,
        toId,
        toFullname,
        toUserId
    }
}

export function logout() {
    setAsyncStorage(KEY_AS_ACCOUNT, "");
    setAsyncStorage(KEY_AS_TOKEN, "");
    return {
        type: LOGOUT
    };
}


export function changeChatInfo(chatInfo){
    return {
        type: CHANGE_CHAT_INFO,
        chatInfo
    };
}

export function toggleChatVisible(chatVisible){
    return function (dispatch){
        dispatch(changeChatInfo({chatVisible}));
    }
}

export function sendChat(messages){
    return function (dispatch, getState){
        let {chatInfo, userInfo, roomInfo, timeJoin} = getState()['vcrx'];
        let { conference }       = getState()['features/base/conference']
        let userId      = userInfo.id.toString();
        let userName    = userInfo.firstname + " " + userInfo.lastname;
        let message     = messages.find(p => p.user._id == userInfo.id).text;
        let d           = new Date();
        let utc         = d.getTime() + (d.getTimezoneOffset() * 60000);
        let timestamp   = getState()['vcrx'].timeNow;
        let messageCustom;
        if(chatInfo.tabs == CHAT_TABS_PUBLIC){
            messageCustom = {
                userId,
                userName,
                message,
                timestamp
            }
        }else{
            messageCustom = {
                userId,
                userName,
                message ,
                chatType: CHAT_TYPE_PRIVATE,
                chatFrom: userId,
                chatTo: chatInfo.toId,
                timestamp
            }
        }
        setLogChat(roomInfo.idRoomVcrx, userInfo.id, chatInfo.toId, message, userInfo.tokenAPI);
        conference.sendTextMessage(JSON.stringify(messageCustom));
    }
}

export function handleGetMessage(){
    return function (dispatch, getState){
        let {roomInfo, userInfo, chatInfo } = getState()['vcrx'];
        let nottifyPrivate = [];
        let notifyPublic = 0;
        let messages = [];
        getLogChat(roomInfo.idRoomVcrx, userInfo.tokenAPI).then(rsMessage =>{
            getAsyncStorage(NOTIFY_CHAT_STORAGE).then(_notify =>{
                let notify = JSON.parse(_notify);
                if(!notify || notify.id !== roomInfo.idRoomVcrx){
                    rsMessage.result.map(message =>{
                        let index = nottifyPrivate.findIndex(notify => notify.from === message.fromParticiantId && message.toParticiantId !== CHAT_ID_PUBLIC);
                        if(index !== -1){
                            nottifyPrivate[index] = {from: message.fromParticiantId, count: nottifyPrivate[index].count + 1};
                        } else if(message.toParticiantId === userInfo.id && index === -1){
                            nottifyPrivate.push({from: message.fromParticiantId, count : 1});
                        } else{
                            notifyPublic = notifyPublic + 1;
                        }
                        let uData = chatInfo.users.filter(u=>u.id == message.fromParticiantId);
                        let name = "NO-NAME";
                        if(uData.length){
                            name = uData[0].fullname;
                        }
                        messages.push({
                            _id: Math.round(Math.random() * 1000000),
                            text: entities.decode(message.data),
                            createdAt: new Date(message.timeCreated.substring(0,4),(parseInt(message.timeCreated.substring(5,7))-1),message.timeCreated.substring(8,10),message.timeCreated.substring(11,13),message.timeCreated.substring(14,16),message.timeCreated.substring(17,19)),
                            user: {
                                _id: message.fromParticiantId,
                                name
                            },
                            chatFrom: message.fromParticiantId,
                            chatType: message.toParticiantId != CHAT_ID_PUBLIC ? CHAT_TYPE_PRIVATE: CHAT_TYPE_PUBLIC,
                            chatTo:  message.toParticiantId
                        })
                    })
                    setAsyncStorage(NOTIFY_CHAT_STORAGE, JSON.stringify({id: roomInfo.idRoomVcrx, data: {public: notifyPublic, private: nottifyPrivate}}));
                    dispatch(changeChatInfo({chats: messages, notifies: {public: notifyPublic, private: nottifyPrivate}}));
                } else {
                    rsMessage.result.map(message=>{
                        let name = "NO-NAME";
                        let timeCreated = new Date(message.timeCreated.substring(0,4),(parseInt(message.timeCreated.substring(5,7))-1),message.timeCreated.substring(8,10),message.timeCreated.substring(11,13),message.timeCreated.substring(14,16),message.timeCreated.substring(17,19)).getTime();
                        if(Math.round(timeCreated / 1000) > notify.timestamp && message.fromParticiantId != userInfo.id){
                            let index = notify.data.private.findIndex(notify => notify.from === message.fromParticiantId && message.toParticiantId !== CHAT_ID_PUBLIC);
                            if(index !== -1){
                                notify.data.private[index] = {from: message.fromParticiantId, count: notify.data.private[index].count + 1};
                            } else if(message.toParticiantId === userInfo.id && index === -1){
                                notify.data.private.push({from: message.fromParticiantId, count : 1});
                            } else {
                                notify.data.public = notify.data.public + 1;
                            }
                        }
                        let uData = chatInfo.users.filter(u=> u.id == message.fromParticiantId);
                        if(uData.length){
                            name = uData[0].fullname;
                        }
                        messages.push({
                            _id: Math.round(Math.random() * 1000000),
                            text: entities.decode(message.data),
                            createdAt: new Date(message.timeCreated.substring(0,4),(parseInt(message.timeCreated.substring(5,7))-1),message.timeCreated.substring(8,10),message.timeCreated.substring(11,13),message.timeCreated.substring(14,16),message.timeCreated.substring(17,19)),
                            user: {
                                _id: message.fromParticiantId,
                                name
                            },
                            chatFrom: message.fromParticiantId,
                            chatType: message.toParticiantId != CHAT_ID_PUBLIC ? CHAT_TYPE_PRIVATE: CHAT_TYPE_PUBLIC,
                            chatTo:  message.toParticiantId
                        })
                    })
                    notify.timestamp = Math.round(getState()['vcrx'].timeNow);
                    setAsyncStorage(NOTIFY_CHAT_STORAGE, JSON.stringify(notify));
                    dispatch(changeChatInfo({chats: messages, notifies: notify.data}));
                }
            })
        })
    }
}

export function handleReadMessage(fromIdUser, tabs){
    return function (dispatch, getState){
        let {chatInfo, roomInfo} = getState()['vcrx'];
        let notify = chatInfo.notifies;
        let index = notify.private.findIndex(notify => notify.from == fromIdUser);
        if(tabs === CHAT_TABS_PUBLIC){
            notify.public = 0;
        } else{
            if((index != -1) && notify.private[index]){
                notify.private[index].count = 0;
            }
        }
        dispatch(changeChatInfo({notifies: notify}));
        setAsyncStorage(NOTIFY_CHAT_STORAGE, JSON.stringify({id: roomInfo.idRoomVcrx, data: notify}));
    }
}

export function handleSetMessage(body, timestamp){
    return function (dispatch, getState){
        if(getState()['vcrx'].timeJoin < timestamp || getState()['vcrx'].timeExit < timestamp){
            let {chatInfo, userInfo, roomInfo} = getState()['vcrx'];
            let notify = chatInfo.notifies;
            let chatFrom = parseInt(body.chatFrom ? body.chatFrom : body.userId);
            let message = {
                _id: Math.round(Math.random() * 1000000),
                text: body.message,
                createdAt: new Date(),
                user: {
                    _id: chatFrom,
                    name: body.userName
                },
                chatFrom,
                chatType: body.chatType ? body.chatType : CHAT_TYPE_PUBLIC,
                chatTo:  body.chatTo ? parseInt(body.chatTo) : CHAT_ID_PUBLIC
            }
            chatInfo.chats.push(message);
            let index = notify.private.findIndex(notify => notify.from === chatFrom && message.chatTo !== CHAT_ID_PUBLIC);
            if(message.chatFrom == userInfo.id || chatInfo.toId == message.chatFrom && chatInfo.chatVisible && message.chatTo == userInfo.id || chatInfo.tabs === CHAT_TABS_PUBLIC && chatInfo.toId === message.chatTo){
                dispatch(handleReadMessage(message.chatTo, message.chatType));
                return;
            }
            if (message.chatTo != userInfo.id && message.chatTo != CHAT_ID_PUBLIC){
                return;
            }
            if(index != -1){
                notify.private[index] = {from: message.chatFrom, count: notify.private[index].count + 1};
            } else if(message.chatTo == userInfo.id && index == -1){
                notify.private.push({from: message.chatFrom, count : 1});
            } else{
                notify.public = notify.public + 1;
            }
            dispatch(changeChatInfo({chats: chatInfo.chats, notifies: notify}));
            setAsyncStorage(NOTIFY_CHAT_STORAGE, JSON.stringify({id: roomInfo.idRoomVcrx, data: notify}));
        }
    }
}

export function initRoom(idRoomVcrx, tokenAPI){
    return function(dispatch,getState) {
        getRoomInfo(idRoomVcrx, tokenAPI ).then((rsRoomInfo)=>{
            if (rsRoomInfo){
                let time = setInterval(()=>{
                    if(Math.round(getState()['vcrx'].timeNow)){
                        let timeJoin = Math.round(getState()['vcrx'].timeNow);
                        dispatch(setTimeJoinClass(timeJoin));
                        clearInterval(time);
                    }
                }, 1000)

                let material = rsRoomInfo.result.material;
                if(typeof material !== 'undefined' && material.length > 0){
                    let slide = material.find(m => m.type == KEY_M_PDF);
                    let video = material.find(m => m.type == KEY_M_VIDEO);
                    if (slide != undefined){
                        dispatch(changeRoomInfo({slide:slide.link}));
                    }
                    if (video != undefined){
                        dispatch(changeRoomInfo({video:video.link}));
                    }
                }
                getLogAction(tokenAPI, idRoomVcrx, ID_LOG_ACTION).then((rsLogAction)=>{
                    if(Object.keys(rsLogAction).length != 0 && rsLogAction.result.logActionInRooms.length != 0){
                        let logStartRoom = rsLogAction.result.logActionInRooms[0];
                        if (logStartRoom){
                            let date = new Date(logStartRoom.timeCreated.substring(0,4),(parseInt(logStartRoom.timeCreated.substring(5,7))-1),logStartRoom.timeCreated.substring(8,10),logStartRoom.timeCreated.substring(11,13),logStartRoom.timeCreated.substring(14,16),logStartRoom.timeCreated.substring(17,19));
                            let timeStarted = date.getTime()/1000;
                            dispatch(changeRoomInfo({timeStarted}));
                        }
                    }
                });
                setTimeout(() => {
                    dispatch(handleGetMessage());
                }, 5000)
            } else {
                let link = PORTAL_LINKING.PARAM;
                Linking.canOpenURL(link).then(supported => {
                    if (!supported) {
                        Alert.alert(languages.topica.lms.login.title,
                            languages.topica.homepage.no_portal,
                            [   {
                                    text: languages.topica.homepage.install, onPress: () => {
                                        Platform.OS === 'android' ?
                                        Linking.openURL(LINK_PLAYSTORE_PORTAL) :
                                        Linking.openURL(LINK_APPSTORE_PORTAL)
                                    }
                                },
                                {
                                    text: languages.topica.homepage.cancel, style: 'cancel'
                                }
                            ],
                            { cancelable: false }
                        );
                    } else {
                        return Linking.openURL(link);
                    }
                }).catch(err => console.error('An error occurred', err));
                setTimeout(() => {
                    if(Platform.OS === 'android'){
                        RNExitApp.exitApp();
                    }
                }, 500)
            }
        });
    }
}

export function changeTimeJoinClass(timeJoin){
    return {
        type: TIME_JOIN_CLASS,
        timeJoin
    };
}

export function setTimeJoinClass(time) {
    return function (dispatch) {
        dispatch(changeTimeJoinClass(time))
    }
}

export function joinRoomByLink(uri,isDeep){
    let url = uri;
    return function (dispatch, getState){
        if(uri!=null && uri.indexOf(PORTAL_LINKING.KEY_CHECK) != -1){
            uri = uri.replace("vcrxconnect","https");
            uri = decodeURI(uri);
            if(uri != DEFAULT_SERVER_URL){
                var params = uri.split("/");
                let userId = params[3];
                let vcrxuserid = params[4];
                let firstname = params[8];
                let lastname = params[9];
                let role = params[10];
                let languages = params[11];
                let userInfo = {
                    firstname:firstname,
                    lastname:lastname,
                    id:userId,
                    participantid:vcrxuserid,
                    role
                };
                let roomId = params[5];
                let vcrxroomid = params[6];
                DeviceInfo.getBatteryLevel().then(batteryLevel => {
                    DeviceInfo.getIPAddress().then(ipAddress => {
                        let dataLog = {
                            "userId"           : userId,
                            "roomId"           : roomId,
                            "username"         : firstname + lastname,
                            "brand"            : DeviceInfo.getBrand(),
                            "appVersion"       : DeviceInfo.getVersion(),
                            "systemVersion"    : DeviceInfo.getSystemVersion(),
                            "deviceName"       : DeviceInfo.getDeviceName(),
                            "model"            : DeviceInfo.getModel(),
                            "deviceId"         : DeviceInfo.getDeviceId(),
                            "pin"              : batteryLevel,
                            "carrier"          : DeviceInfo.getCarrier(),
                            "freeDisk"         : DeviceInfo.getFreeDiskStorage(),
                            "ipAddress"        : ipAddress,
                            "maxMemory"        : DeviceInfo.getMaxMemory(),
                            "systemName"       : DeviceInfo.getSystemName(),
                            "timeZone"         : DeviceInfo.getTimezone(),
                            "uniqueID"         : DeviceInfo.getUniqueID(),
                            "system"           : TYPE_SYSTEM_LOG
                        };
                        dispatch(saveLogInfo(dataLog, LOG_INFO_DEVICE));
                    });
                });
                dispatch(changeUserInfo(userInfo));
                dispatch(changeLanguage(languages));
                let dataAction = {
                    userId : userId,
                    userIdVcrx : vcrxuserid,
                    roomId : roomId,
                    roomIdVcrx : vcrxroomid,
                    role: role,
                    timeAvailable : params[7],
                    firstname : firstname,
                    lastname : lastname,
                    systemInfo : DeviceInfo.getSystemName(),
                    uri: url,
                    isDeep: isDeep
                };
                setAsyncStorage('dataInfo', JSON.stringify({roomId: roomId, userId: userId}));
                dispatch(saveLogAction(dataAction, ACTION_LINKING_PORTAL_CONNECT));
                dispatch(changeRoomInfo({idRoom:roomId, timeAvailable: params[7], idRoomVcrx: vcrxroomid}));
                loginAPICore().then(resLogin => {
                    getUserInfo(vcrxuserid, resLogin.result.accessToken).then(async (user)=>{
                        if(user.status ||1){
                            dispatch(changeUserInfo({tokenAPI:resLogin.result.accessToken}));
                            await dispatch(initRoom(vcrxroomid, resLogin.result.accessToken));
                            dispatch(appNavigate(toURLString(DEFAULT_SERVER_URL + "/" + roomId.toString())));
                        } else {
                            let link = PORTAL_LINKING.PARAM;
                            Linking.canOpenURL(link).then(supported => {
                                if (!supported) {
                                    Alert.alert(languages.topica.lms.login.title,
                                        languages.topica.homepage.no_portal,
                                        [   {
                                                text: languages.topica.homepage.install, onPress: () => {
                                                    Platform.OS === 'android' ?
                                                    Linking.openURL(LINK_PLAYSTORE_PORTAL) :
                                                    Linking.openURL(LINK_APPSTORE_PORTAL)
                                                }
                                            },
                                            {
                                                text: languages.topica.homepage.cancel, style: 'cancel'
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                } else {
                                    return Linking.openURL(link);
                                }
                            }).catch(err => console.error('An error occurred', err));
                            setTimeout(() => {
                                if(Platform.OS === 'android'){
                                    RNExitApp.exitApp();
                                }
                            }, 500)
                        }
                    })
                })
            }
        } else {
            if (!isDeep){
                Alert.alert('Thông báo','Đường dẫn nhập vào không hợp lệ');
            } else {
                dispatch(appNavigate(toURLString(uri)));
            }
        }
    }

}

export function updateParticipant(conference){
    return function (dispatch,getState){
        let { userInfo }       = getState()['vcrx'];
        conference.sendCommand(
            ACTION_UPDATE_P, {value: JSON.stringify({field: P_KEY.userInfo, data: {role: KEY_ROLE_MOBILE,id: userInfo.id, fullname: userInfo.firstname + " " +userInfo.lastname, device: `${Platform.OS}`}})});

        if(userInfo.role == ROLE.audit) {
            conference.sendCommand(ACTION_UPDATE_P, { value: JSON.stringify({ field: P_KEY.audit, data: true })});
        }
    }
}

export function exitClass(typeLog = ACTION_LOG_OUT) {
    return function (dispatch, getState) {
        let typeLeaveRoom = LEAVE_PROACTIVE;
        let { userInfo, chatInfo, socket, roomInfo } = getState()['vcrx'];
        if (typeLog === ACTION_LOG_OUT){
            typeLeaveRoom = LEAVE_PROACTIVE
        } else {
            typeLeaveRoom = LEAVE_KICK_ETC
        }
        socket.disconnect();
        let localParticipant = getLocalParticipant(getState);
        let notify = chatInfo.notifies;
        dispatch(toggleChatVisible(false));
        dispatch(handleSetLogInOut(userInfo.role, KEY_ACTION_OUT));
        dispatch(changeRoomInfo({timeStarted:0, showVideo: false, playVideo: false}));
        localParticipant.raiseHand = false;
        dispatch(participantUpdated(localParticipant));
        dispatch(changeTabsChat('',0));
        setAsyncStorage(NOTIFY_CHAT_STORAGE, JSON.stringify({id: getState()['vcrx'].roomInfo.idRoomVcrx, data: notify}));
        setAsyncStorage(TIME_EXIT_APP, JSON.stringify(Math.round(getState()['vcrx'].timeNow)));
        let dataLogout = {
            userId  : userInfo.id,
            roomId  : roomInfo.idRoom,
            device  : MOBILE_SYSTEM,
            type    : typeLeaveRoom
        }
        dispatch(saveLogAction(dataLogout, ACTION_LOG_OUT));
        let link = PORTAL_LINKING.LOGOUT;
        Linking.canOpenURL(link).then(supported => {
            if (!supported) {
                Alert.alert(languages.topica.lms.login.title,
                    languages.topica.homepage.no_portal,
                    [   {
                            text: languages.topica.homepage.install, onPress: () => {
                                Platform.OS === 'android' ?
                                Linking.openURL(LINK_PLAYSTORE_PORTAL) :
                                Linking.openURL(LINK_APPSTORE_PORTAL)
                            }
                        },
                        {
                          text: languages.topica.homepage.cancel, onPress: () => {
                              dispatch(appNavigate(undefined));
                              dispatch(handleSetLogInOut(userInfo.role, KEY_ACTION_OUT));
                          }
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                dispatch(appNavigate(undefined));
                return Linking.openURL(link);
            }
        }).catch(err => console.error('An error occurred', err));
        setTimeout(() => {
            if(Platform.OS === 'android'){
                RNExitApp.exitApp();
            }
        }, 500)
    }
}

export function kickUser(userId, action) {
    return function (dispatch,getState){
        let { userInfo, languages, chatInfo, socket, roomInfo } = getState()['vcrx'];
        let localParticipant = getLocalParticipant(getState);
        if (userId === localParticipant.id || userId === "local") {
            let typeLog = ACTION_LOG_OUT;
            if (action === DUPLICATE_USER){
                typeLog = LEAVE_KICK_DUPLICATE;
            }else if (action === PORTAL_LINKING.CALL){
                typeLog = LEAVE_KICK_CALL;
            } else if (action === PORTAL_LINKING.NETWORK){
                typeLog = LEAVE_KICK_LOSTCONNECT
            } else {
                typeLog = LEAVE_KICK_PO;
            }
            let dataLogout = {
                userId  : userInfo.id,
                roomId  : roomInfo.idRoom,
                device  : MOBILE_SYSTEM,
                type    : typeLog
            }
            dispatch(saveLogAction(dataLogout, ACTION_LOG_OUT));
            socket.disconnect();
            let notify = chatInfo.notifies;
            dispatch(toggleChatVisible(false));
            dispatch(handleSetLogInOut(userInfo.role, KEY_ACTION_OUT));
            dispatch(handleSetLogInOut(userInfo.role, ACTION_KICK));
            dispatch(changeRoomInfo({timeStarted:0, showVideo: false, playVideo: false}));
            localParticipant.raiseHand = false;
            dispatch(participantUpdated(localParticipant));
            dispatch(changeTabsChat('',0));
            setAsyncStorage(NOTIFY_CHAT_STORAGE, JSON.stringify({id: getState()['vcrx'].roomInfo.idRoomVcrx, data: notify}));
            let link = PORTAL_LINKING.OPEN + '/' + action;
            Linking.canOpenURL(link).then(supported => {
                if (!supported) {
                    Alert.alert(languages.topica.lms.login.title,
                        languages.topica.homepage.no_portal,
                        [   {
                                text: languages.topica.homepage.install, onPress: () => {
                                    Platform.OS === 'android' ?
                                    Linking.openURL(LINK_PLAYSTORE_PORTAL) :
                                    Linking.openURL(LINK_APPSTORE_PORTAL)
                                }
                            },
                            {
                                text: languages.topica.homepage.cancel, onPress: () => {
                                    dispatch(handleSetLogInOut(userInfo.role, KEY_ACTION_OUT));
                                    dispatch(appNavigate(undefined));
                                }
                            }
                        ],
                        { cancelable: false }
                    );
                } else {
                    dispatch(appNavigate(undefined));
                    return Linking.openURL(link);
                }
            }).catch(err => console.error('An error occurred', err));
            setTimeout(() => {
                if(Platform.OS === 'android'){
                    RNExitApp.exitApp();
                }
            }, 2000)
        }
    }
}

export function kickDuplicateUser(conference) {
    return function (dispatch, getState) {
        let paticipants = getState()['features/base/participants'];
        let userInfo    = getState()['vcrx'].userInfo;
        paticipants.filter(function (user) {
            let displayName ;
            (user.name && user.email) && user.name.split("-")[0] === KEY_ROLE_MOBILE
                ? displayName = Base64.decode(user.name.slice(3)) : displayName = user.name.slice(3)
            let strTemp = displayName.split("-");
            let userId  = strTemp[strTemp.length-1];
            userId == userInfo.id && !user.local && conference.sendCommandOnce(ACTION_KICK, { value : user.id, attributes: {action: DUPLICATE_USER}});
        });
    }
}


export function sendAssessment(data) {
    return function (dispatch, getState) {
        let localParticipant     = getLocalParticipant(getState);
        let userList             = data.attributes.userList;
        if (data.value && userList.includes(localParticipant.id)) {
            let response = JSON.parse(data.value);
            let assessmentData = response.listAssessmentStudent;
            let assessmentInfo = assessmentData.map((e) => [e.displayName, e.pronunciation, e.vocabulary, e.grammar])
            dispatch(changeAssessment({show: true, data: assessmentInfo}));
        }
    }
}

export function handleUploadMaterial(data) {
    return function(dispatch, getState) {
        getRoomInfo(data.value, data.attributes.token).then(rsRoomInfo => {
            if(rsRoomInfo.result.material && rsRoomInfo.result.material.length > 0){
                let slides = rsRoomInfo.result.material.find(m => m.type == KEY_M_PDF);
                let videos = rsRoomInfo.result.material.find(m => m.type == KEY_M_VIDEO);
                if (slides && videos){
                    dispatch(changeRoomInfo({slide: slides.link, video: videos.link}));
                }
            }
        })
    }
}

export function handleOpenPortal() {
    return function (dispatch, getState) {
        let { languages } = getState()['vcrx'];
        let link = PORTAL_LINKING.OPEN;
        Linking.canOpenURL(link).then(supported => {
            if (!supported) {
                Alert.alert(languages.topica.lms.login.title,
                    languages.topica.homepage.no_portal,
                    [   {
                            text: languages.topica.homepage.install, onPress: () => {
                                Platform.OS === 'android' ?
                                Linking.openURL(LINK_PLAYSTORE_PORTAL) :
                                Linking.openURL(LINK_APPSTORE_PORTAL)
                            }
                        },
                        {
                            text: languages.topica.homepage.cancel, onPress: () => {},
                            style: 'cancel',
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                Linking.openURL(link);
                setTimeout(()=>{
                    if(Platform.OS === 'android'){
                        RNExitApp.exitApp();
                    }
                }, 500);
            }
        }).catch(err => console.error('An error occurred', err));
    }
}

export function handleAddLogSlide(title, message){
    return function (dispatch, getState) {
        let { roomInfo, userInfo } = getState()['vcrx'];
        addLogError(roomInfo.idRoomVcrx, userInfo.participantid, userInfo.id, parseInt(roomInfo.idRoom), 'Lỗi slide '+title, message, userInfo.tokenAPI);
    }
}

export function changeLanguage(key){
    return function(dispatch){
        let languages;
        switch (key) {
            case 'en':
                languages = require('./lang/en.json');
                break;
            case 'vi':
                languages = require('./lang/vi.json');
                break;
            default:
                languages = require('./lang/vi.json');
        }
        dispatch(setLanguage(languages));
    }
}

export function handleWarning(key){
    return function(dispatch){
        dispatch(changeRoomInfo({errorKey:key}));
    }
}

export function handleSendWarning(title, message, socket){
    return function(dispatch, getState){
        let { roomInfo, userInfo, languages } = getState()['vcrx'];
        addLogError(roomInfo.idRoomVcrx, userInfo.participantid, userInfo.id, parseInt(roomInfo.idRoom), title, message, userInfo.tokenAPI)
            .then((res)=>{
                if(res.status == true){
                    Alert.alert(languages.topica.vcrx.error.notification,languages.topica.vcrx.error.title);
                    let dataSocket = [roomInfo.id,roomInfo.idRoomVcrx];
                    socket.emit(SOCKET.WARNING, dataSocket);
                } else {
                    Alert.alert(languages.topica.vcrx.error.notification,languages.topica.vcrx.error.fail);
                }
            });
        dispatch(handleWarning(0));
    }
}

export function updateChatUsers(user){
    return (dispatch, getState) => {
        let { chatInfo } = getState()['vcrx'];
        let { users } = chatInfo;
        let isset = users.findIndex(u=>u.id == user.id);
        if(isset == -1){
            users.push(user);
            dispatch(changeChatInfo({ users }));
        }
    }
}

export function saveLogsConnectionQuality() {
    return (dispatch, getState) => {
        let participants = getState()['features/base/participants'];
        let role         = getState()['vcrx'].userInfo.role === ROLE.mobile ? ROLE.hv : ROLE.audit;
        let date         = new Date(parseInt(getState()['vcrx'].roomInfo.timeAvailable)*1000);
        let hour         = date.getHours();
        let { userInfo, roomInfo } = getState()['vcrx'];
        if(participants.length > 1) {
            let connectionStats = getState()["features/base/conference"].conference.connectionQuality.getStats();
            let { bitrate, bandwidth, connectionQuality, packetLoss, jvbRTT, resolution, transport } = connectionStats;
            if(bitrate != undefined) {
                let data = {
                    userName: `${userInfo.firstname} ${userInfo.lastname}`,
                    userId  : userInfo.id,
                    roomId  : roomInfo.idRoom,
                    system  : MOBILE_SYSTEM,
                    bitrate,
                    bandwidth,
                    connectionQuality,
                    packetLoss,
                    jvbRTT,
                    resolution,
                    transport,
                    role,
                    hour
                }
                dispatch(saveLogInfo(data, CONNECTION_QUALITY));
            }
        }
    }
}

export function checkUpdateApp(uri){
    return function (dispatch, getState) {
        let {languages} = getState()['vcrx'];
        let systemName = DeviceInfo.getSystemName();
        let currentVersion = DeviceInfo.getVersion();
        let url = systemName == "Android" ? LINK_PLAYSTORE_VCRX: LINK_APPSTORE_VCRX;
        checkUpdateAppAPI(currentVersion, systemName, SYSTEM).then((response)=>{
            if(response.hasOwnProperty('result') && response.result){
                Alert.alert(
                    languages.topica.lms.login.title,
                    languages.topica.lms.login.notify + languages.topica.lms.login.please,
                    [
                        {text: languages.topica.lms.login.confirm_update, onPress: () => {Linking.canOpenURL(url)
                        .then((supported) => {
                        if (!supported) {
                            console.log("Can't handle url: " + url);
                        } else {
                            return Linking.openURL(url);
                        }
                        })
                        .catch((err) => console.error('An error occurred', err));},}
                    ],
                    { cancelable: false }
                );
            }
            if (uri.indexOf("://mobileportal/") != -1 && !response.result){
                dispatch(joinRoomByLink(uri, true));
            } else {
                dispatch(appNavigate(toURLString(uri)));
            }
        }).catch( e => {
            dispatch(appNavigate(toURLString(uri)));
        })
    }
}
