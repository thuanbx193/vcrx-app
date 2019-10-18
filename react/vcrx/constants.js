/**
 *
 * @type {string}
 */

export const KEY_ACTION_IN              = "in";
export const KEY_AS_ACCOUNT             = "userAccount_v3";
export const KEY_AS_LANGUAGE            = "LANGUAGE";
export const KEY_AS_TOKEN               = "token_v3";
export const ACTION_VIDEO               = "video-warmup";
export const ACTION_UPDATE_P            = "ACTION_UPDATE_P";
export const ACTION_SEND_ASSESSMENT     = "send-assessment";
export const ACTION_START_ROOM          = "startRoom";
export const ACTION_UPLOAD              = "update-material";
export const ACTION_CAPTURE             = "capture-room";

export const ACTION_LOG_RAISE_HAND  = "RAISE_HAND";

export const NOTIFY_CHAT_STORAGE= "Notify-VCNVN";
export const CHAT_TABS_PUBLIC   = "PUBLIC";
export const CHAT_TABS_OPTION   = "OPTION";
export const CHAT_TABS_PRIVATE  = "PRIVATE";
export const CHAT_TYPE_PRIVATE  = "PRIVATE";
export const CHAT_TYPE_PUBLIC   = "PUBLIC";
export const CHAT_ID_PUBLIC     = 0;

export const P_KEY = {
    raiseHand   : "raiseHand",
    userInfo    : "userInfo",
    audit       : "audit"
}

export const KEY_M_PDF          = "pdf";
export const KEY_M_VIDEO        = "video";
export const ID_LOG_ACTION      = 3;

export const VIDEO_WARMUP = {
    SHOW: "showVideo",
    PAUSE: "pauseVideo",
    CLOSE: "closeVideo",
    PLAY: "playVideo"
}

export const ICON = {
    IC_AUDIT: "headphones",
    IC_TEACHER: "graduation-cap",
    IC_ASSISTANT: "user-plus",
    IC_PO: "user-plus",
    IC_STUDENT: "user",
    IC_MOBILE: "mobile-phone",
    IC_ALL_USER: "warning",
    IC_MIC_ENABLE: 'microphone',
    IC_MIC_DISABLE: 'microphone-slash',
    IC_RAISE_HAND: 'hand-paper-o',
    IC_CLOSE: 'close',
    IC_WEBCAM: 'camera'
}

export const ACTION_TOGGLE_MICRO = "toggleMicro";
export const CONNECTTION_FAILD  = "interrupted";

export const KEY_ROLE_MOBILE    = "MB";
export const KEY_ROLE_TEACHER   = "GV";
export const KEY_ROLE_ASSISTANT = "TG";
export const KEY_ROLE_PO        = "PO";
export const KEY_ROLE_STUDENT   = "HV";
export const KEY_ROLE_AUDIT     = "DT";

export const TOKEN_LOG = 'b7c5c240948d0deb1f34e3dae4606538'
export const SYSTEM             = "NVN";
export const SYSTEM_LOG         = "VCRXCONNECT";

export const PORTAL_LINKING = {
    OPEN    : 'appportal://mobile/vcrx',
    KICK    : '201',
    NETWORK : '202',
    CALL    : '203',
    LOGOUT  : 'appportal://mobile/vcrx/204',
    PARAM   : 'appportal://mobile/vcrx/102',
    KEY_CHECK : '://mobileportal/'
}

export const ACTION_KICK        = "kick";
export const DUPLICATE_USER     = 'kickDuplicateUser';
export const KEY_ACTION_OUT     = "out";
export const CALL_INCOMING      = "Incoming";
export const PERMISSION         = {
    disablePulicChat: ['AUDIT'],
    disableUserListChat: ['AUDIT']
}

export const SOCKET = {
    warning: 'error_in_room'
}
export const SET_CONFIG         = 'SET_CONFIG';
export const ROLE = {
    audit       : 'AUDIT',
    auditMobile : 'AUDIT-MOBILE',
    mobile      : 'MOBILE',
    student     : 'STUDENT'
}
export const APP_VERSION        = ' 4.2.10';

export const LOGOUT_BY_PRESS_LOGOUT_BUTTON  = 1;
export const LOGOUT_BY_KICKOUT              = 2;
export const LOGOUT_BY_DUPLICATE            = 3;
export const LOGOUT_BY_PRESS_HOME_BUTTON    = 4;
export const LOGOUT_BY_PRESS_MULTITASKING   = 5;
export const LOGOUT_BY_INCOMING_CALL        = 6;
export const LOGOUT_BY_PRESS_BACK_BUTTON    = 7;
export const LOGOUT_BY_DISCONNECT           = 8;

export const MOBILE_SYSTEM      = "MOBILE";
export const CONNECTION_QUALITY = "CONNECTION_QUALITY";
export const ACTION_LOG_OUT             = "LEAVE_ROOM";
export const ACTION_LINKING_PORTAL_CONNECT = 'LINKING_PORTAL_CONNECT';
export const TYPE_SYSTEM = 'VCRXCONNECT';
export const LOG_ERROR_SLIDE = 'ERROR_SLIDE';

export const LOG_INFO_DEVICE    = 'INFO_DEVICE';
export const TYPE_SYSTEM_LOG    = 'MOBILE';
export const ACTION_LOG_LOAD_SLIDE = 'LOAD_SLIDE';
export const ACTION_LOG_MIC = 'TURN_ON_OFF_MICRO';
export const LOG_CALL = {
    API_LOGIN           : 'API_LOGIN',
    API_GETTIMESERVER   : 'API_GETTIMESERVER',
    API_ROOM_INFO       : 'API_ROOM_INFO',
    API_LOGACTION       : 'API_LOGACTION',
    API_LOGINOUT_ADD    : 'API_LOGINOUT_ADD',
    API_LOGCHAT_ADD     : 'API_LOGCHAT_ADD',
    API_LOGCHATS        : 'API_LOGCHATS',
    API_LOGACTION_ADD   : 'API_LOGACTION_ADD',
    API_LOGERROR_ADD    : 'API_LOGERROR_ADD'
};
export const LEAVE_KICK_PO          = 'LEAVE_KICK_PO';
export const LEAVE_PROACTIVE        = 'LEAVE_PROACTIVE';
export const LEAVE_KICK_DUPLICATE   = 'LEAVE_KICK_DUPLICATE';
export const LEAVE_KICK_LOSTCONNECT = 'LEAVE_KICK_LOSTCONNECT';
export const LEAVE_KICK_CALL        = 'LEAVE_KICK_CALL';
export const LEAVE_KICK_ETC         = 'LEAVE_KICK_ETC';

export const ACCESS_MICRO           = 'ACCESS_MICRO';