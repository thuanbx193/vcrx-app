
export var   DOMAIN_API                     = "https://vcrxapi.topica.vn";
export var   DOMAIN_API_TESTER              = "https://vcrxapitester.topica.vn";
export var   DEFAULT_SERVER_URL             = "https://vcrxnvn.topica.vn";
export const DOMAIN_SOCKET                  = "https://html5lms.topicanative.edu.vn/";
export var   DOMAIN_LOGS                    = "https://vcrxlogs.topica.vn";

export const API_LOGIN_API                  = "/api/user/login";
export const API_GET_TIME_FROM_SERVER       = "/api/gettimeserver";
export const API_GET_ROOM_INFO              = "/api/room/";
export const API_GET_LOG_ACTION             = "/api/logactions/room/ids";
export const API_SET_LOG_IN_OUT             = "/api/loginout/add";
export const API_SET_LOG_CHAT               = "/api/logchat/add";
export const API_GET_LOG_CHAT               = "/api/logchats/room/ids?roomIds=";
export const API_ADD_LOG_ACTION             = "/api/logaction/add";
export const API_ADD_LOG_ERROR              = "/api/warning/add";
export const API_GET_USER_INFO              = "/api/user/";
export const API_ADD_LOG_VCRX_CONNECT       = getDomainLog() + "/v1/actionlogs";
export const API_ADD_LOG_ERROR_V4           = getDomainLog() + "/v1/errorlogs";

export const API_USERNAME   		        = "ADMIN";
export const API_PASSWORD   				= 123456;
export const CHEAT   					    = false;
export const PERMISSION         = {
    disablePulicChat    : ["AUDIT"],
    disableUserListChat : ["AUDIT"],
    disableMic          : ["AUDIT"],
    disableRaiseHand    : ["AUDIT"],
    disableWarning      : ["AUDIT"]
};

export const LINK_PLAYSTORE_PORTAL              = "https://play.google.com/store/apps/details?id=vn.topica.nativemobileportal";
export const LINK_APPSTORE_PORTAL               = "https://apps.apple.com/us/app/native-mobile-portal/id1439563361";
export const LINK_CONFIG                        = "https://vcrxapi.topica.vn/api/config/getconfig?key=";

export const LINK_PLAYSTORE_VCRX                = "https://play.google.com/store/apps/details?id=org.topica.vcrx";
export const LINK_APPSTORE_VCRX                 = "https://apps.apple.com/us/app/vcrx-connect/id1456449884";

export var enableLog = false;

export function setEnableLog(value) {
    enableLog = value;
}
export function getEnableLog() {
    return enableLog;
}

export function setDomainLog(value){
    DOMAIN_LOGS = value;
}

export function getDomainLog(){
    return DOMAIN_LOGS;
}

export function setDefultServerURL(value){
    DEFAULT_SERVER_URL = value;
}

export function getDefaultServerURL(){
    return DEFAULT_SERVER_URL;
}

export function setDomainAPI(value){
    DOMAIN_API = value;
}

export function getDomainAPI(){
    return DOMAIN_API;
}

export const TIME_EXIT_APP                  = "TIME_EXIT_APP";