import { ReducerRegistry }          from '../features/base/redux';
import {
    CHANGE_USER_INFO,
    CHANGE_ROOM_INFO,
    CHANGE_TABS_CHAT,
    CHANGE_CHAT_INFO,
    CHANGE_ASSESSMENT,
    SET_TIME_NOW,
    CHANGE_LANGUAGE,
    SET_SOCKET,
    TIME_JOIN_CLASS,
    DATA_CHANGE_MIC,
    SET_TIME_EXIT,
    GET_LIST_DOMAIN
}                                   from './actionTypes';
var languagesDefault = require('./lang/vi.json');
let d = new Date();
let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
let timeJoin= new Date(utc + (3600000 * 7)).getTime();
let stateDefault = {
    dataMic : {
        timeStart   : null,
        userId      : null,
        isMuted     : null
    },
    languages: languagesDefault,
    userInfo:{
        id: "L",
        idClassSelect: 0,
        technicalStatus: false
    },
    roomInfo: {
        timeAvailable   : 0,
        isJoin          : 0,
        timeStarted     : 0,
        playVideo       : false,
        showVideo       : false,
        indexLayout     : 0,
        idRoom          : 0,
        errorKey        : 0,
        slide           : ''
    },
    chatInfo : {
        chatVisible: false,
        chats:[],
        notifies:{
            public: 0,
            private: []
        },
        tabs: "",
        toId: 0,
        toFullname: "",
        users: [],
        toUserId: 0
    },
    assessmentStudent:{
        show: false,
        data: []
    },
    timeNow: 0,
    config: {
        DOMAIN_LMS40: '',
        API_VCRX: '',
        DOMAIN_VCR: '',
        API_SOCKET: ''
    },
    timeJoin : timeJoin,
    timeExit: 0,
    socket: function(){}
}

ReducerRegistry.register('vcrx', (state = stateDefault, action) => {
    switch(action.type){
        case DATA_CHANGE_MIC:
            return {
                ...state,
                dataMic: action.dataMic
            }
        case CHANGE_ROOM_INFO:
            return {
                ...state,
                roomInfo: {...state.roomInfo,...action.roomInfo}
            };
        case CHANGE_USER_INFO:
            return {
                ...state,
                userInfo: {...state.userInfo,...action.userInfo}
            };
        case CHANGE_LANGUAGE:
            return{
                ...state,
                languages: action.languages
            }
        case CHANGE_TABS_CHAT:
            return {
                ...state,
                chatInfo: {
                    ...state.chatInfo,
                    tabs: action.tabs,
                    toId: action.toId,
                    toFullname: (action.toFullname ? action.toFullname : state.chatInfo.toFullname),
                    toUserId: (action.toFullname ? action.toUserId : state.chatInfo.toUserId),
                }
            }
        case CHANGE_CHAT_INFO:
            return {
                ...state,
                chatInfo: {...state.chatInfo, ...action.chatInfo}
            }
        case CHANGE_ASSESSMENT:
            return{
                ...state,
                assessmentStudent: action.assessmentStudent
            }
        case SET_TIME_NOW:
            return {
                ...state,
                timeNow: action.timeNow
            }
        case SET_SOCKET:
            return {
                ...state,
                socket: action.socket
            }
        case TIME_JOIN_CLASS:
            return {
                ...state,
                timeJoin: action.timeJoin
            };
        case SET_TIME_EXIT:
            return {
                ...state,
                timeExit: action.timeExit
            };
        case GET_LIST_DOMAIN:
            return {
                ...state,
                listdomain: action.listdomain
            };
        default:
            return state;
    }
});
