export const DOMAIN_API                      = "https://vcrxapi.topica.vn";
export const DEFAULT_SERVER_URL              = "https://vcrxnvn.topica.vn";
export const DOMAIN_SOCKET                    = "https://html5lms.topicanative.edu.vn/";
export const DOMAIN_LOGS                    = "https://vcrxlogstester.topica.vn";

export const API_LOGIN_API                  = "/api/user/login";
export const API_GET_TIME_FROM_SERVER       = "/api/gettimeserver";
export const API_GET_ROOM_INFO              = "/api/room/";
export const API_GET_LOG_ACTION             = "/api/logactions/room/ids";
export const API_SET_LOG_IN_OUT             = "/api/loginout/add";
export const API_SET_LOG_CHAT               = "/api/logchat/add";
export const API_GET_LOG_CHAT               = "/api/logchats/room/ids?roomIds=";
export const API_ADD_LOG_ACTION             = "/api/logaction/add";
export const API_ADD_LOG_ERROR              = "/api/warning/add";
export const API_GET_USER_INFO              = '/api/user/';
export const API_ADD_LOG_VCRX_CONNECT       = DOMAIN_LOGS+"/v1/actionlogs";
export const API_ADD_LOG_ERROR_V4           = DOMAIN_LOGS + '/v1/errorlogs';

export const API_USERNAME   					= "ADMIN";
export const API_PASSWORD   					= 123456;
export const CHEAT   					        = false;
export const PERMISSION         = {
    disablePulicChat    : ['AUDIT'],
    disableUserListChat : ['AUDIT'],
    disableMic          : ['AUDIT'],
    disableRaiseHand    : ['AUDIT'],
    disableWarning      : ['AUDIT']
}

export const LINK_PLAYSTORE_XSMART              = 'https://play.google.com/store/apps/details?id=org.topica.xsmart';
export const LINK_APPSTORE_XMART                = 'https://itunes.apple.com/us/app/native-xsmart/id1439294937?ls=1&mt=8';
export const LINK_PLAYSTORE_PORTAL              = 'https://play.google.com/store/apps/details?id=vn.topica.nativemobileportal';
export const LINK_APPSTORE_PORTAL               = '';
export const LINK_CONFIG                        = "https://vcrxapi.topica.vn/api/config/getconfig?key=";

export var enableLog = false;

export function setEnableLog(value) {
    enableLog = value;
}

export function getEnableLog() {
    return enableLog;
}

export const TIME_EXIT_APP                  = 'TIME_EXIT_APP';