import AsyncStorage from "@react-native-community/async-storage";
import {
    DOMAIN_API,
    DOMAIN_API_TESTER,
    API_LOGIN_API,
    API_USERNAME,
    API_PASSWORD,
    API_GET_TIME_FROM_SERVER,
    API_GET_ROOM_INFO,
    API_GET_LOG_ACTION,
    API_SET_LOG_IN_OUT,
    API_SET_LOG_CHAT,
    API_GET_LOG_CHAT,
    DOMAIN_LOGS,
    API_ADD_LOG_ACTION,
    API_ADD_LOG_ERROR,
    LINK_CONFIG,
    API_GET_USER_INFO,
    getEnableLog,
    getDomainLog,
    getDomainAPI
} from "./config";
import {TOKEN_LOG, SET_CONFIG, SYSTEM_LOG, LOG_CALL} from "./constants";
import DeviceInfo from "react-native-device-info";

//Base api get
function get(url, param = {}, type = "", token=""){
    let timeStart       = (new Date()).getTime();
    return new Promise(function(resolve,reject){
        getAsyncStorage(SET_CONFIG)
            .then(respon => {
                let res = JSON.parse(respon);
                let host = getDomainAPI();
                if(res !== null && res !== undefined && res !== "") {
                    host = res.DOMAIN_API;
                }
                fetch( host+url , {
                    method: "GET",
                    headers: {
                        "Access-Control-Allow-Origin":"*",
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization" : "Bearer "+token
                    },
                    mode: "cors"
                }).then(function(response) {
                    if(response.status == 200){
                        return response.json();
                    }else{
                        resolve({success: false});
                    }
                }).then(function(response){
                    resolve(response);
                    let timeEnd  = (new Date()).getTime();
                    if (type){
                        saveLogCallApi(param, type, url, response, timeEnd - timeStart);
                    }
                }).catch(err=>{
                    reject({success: false});
                    let timeEnd = (new Date()).getTime();
                    if (type){
                        saveLogCallApi(param, type, url, response, timeEnd - timeStart);
                    }

                });
            })
            .catch(err => console.log(err));
    });
}

//Base api post
function post(url, param, type="", token=""){
    let timeStart       = (new Date()).getTime();
    return new Promise(function(resolve,reject){
        getAsyncStorage(SET_CONFIG)
            .then(respon => {
                let res = JSON.parse(respon);
                let host = getDomainAPI();
                if(res !== null && res !== undefined && res !== "") {
                    host = res.DOMAIN_API;
                }
                fetch( host+url , {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization" : "Bearer "+token
                    },
                    body: JSON.stringify( param )
                }).then(function(response) {
                    if(response.status == 200){
                        return response.json();
                    }else{
                        return {};
                    }
                }).then(function(response){
                    resolve(response);
                    let timeEnd  = (new Date()).getTime();
                    if (type){
                        saveLogCallApi(param, type, url, response, timeEnd - timeStart);
                    }
                }).catch(err=>{
                    reject({});
                    let timeEnd  = (new Date()).getTime();
                    if (type){
                        saveLogCallApi(param, type, url, response, timeEnd - timeStart);
                    }
                });
            })
            .catch(err => console.log(err));}
    );
}

export function getAsyncStorage(key){
    return new Promise(function(resolve,reject){
        AsyncStorage.getItem(key)
            .then((rs)=> {
                resolve(rs);
            })
            .catch(err=>{
                reject({});
            });
    });
}

export function loginAPICore(){
    let param = {
        username: API_USERNAME,
        password: API_PASSWORD
    };
    return post(API_LOGIN_API, param, LOG_CALL.API_LOGIN);
}

export function setAsyncStorage(key, data){
    return new Promise(function(resolve, reject){
        AsyncStorage.setItem(key, data);
    });
}

export function getTimeFromServer(token){
    return get(API_GET_TIME_FROM_SERVER, {}, LOG_CALL.API_GETTIMESERVER, token);
}

export function getRoomInfo(idRoomVcrx, token){
    let param = {
        idRoomVcrx: idRoomVcrx
    };
    return get(API_GET_ROOM_INFO+idRoomVcrx, param, LOG_CALL.API_ROOM_INFO, token);
}

export function getLogAction(token, roomids, logTypeId){
    let param = {
        idRoomVcrx: roomids,
        logTypeId: logTypeId
    };
    return get(API_GET_LOG_ACTION+"?roomIds="+roomids+"&logTypeId="+logTypeId, param, LOG_CALL.API_LOGACTION, token);
}

export function setLogInOut(roomId, action, participantId, token, role){
    let param = {
        "roomId"                      : roomId,
        "participantId"               : participantId,
        "action"                      : action,
        "data"                        : `{"role":"${role}"}`
    };
    return post(API_SET_LOG_IN_OUT, param, LOG_CALL.API_LOGINOUT_ADD, token);
}

export function setLogChat(roomId, fromParticipantId,toParticipantId,message,token){
    let param = {
        "roomId"                    : roomId,
        "fromParticipantId"         : fromParticipantId,
        "toParticipantId"           : toParticipantId,
        "data"                      : message
    };
    return post(API_SET_LOG_CHAT, param, LOG_CALL.API_LOGCHAT_ADD, token);
}


export function getLogChat(roomIds, token){
    let param = {
        idRoomVcrx: roomIds
    };
    return get(API_GET_LOG_CHAT + roomIds, param, LOG_CALL.API_LOGCHATS, token);
}

export function setLogsAction(data) {
    return new Promise(function( resolve, reject){
        fetch( getDomainLog() + "/v1/actionlogs", {
            headers: {
                "Content-Type": "application/json",
                "token" : TOKEN_LOG
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then((res) => {
                resolve(res.json());
            })
            .catch((error) => {
                resolve({});
            });
    });
}

export function addLogAction(roomId, participantId, logTypeId, data, token){
    let param = {
        "roomId"                    : roomId,
        "participantId"             : participantId,
        "logTypeId"                 : logTypeId,
        "data"                      : data
    };
    return post(API_ADD_LOG_ACTION, param, LOG_CALL.API_LOGACTION_ADD, token);
}

export function setLogsErrorAction(data) {
    return new Promise(function( resolve, reject){
        fetch( getDomainLog() + "/v1/errorlogs", {
            headers: {
                "Content-Type": "application/json",
                "token" : TOKEN_LOG
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then((res) => {
                resolve(res.json());
            })
            .catch((error) => {
                resolve({});
            });
    });
}

export function addLogError(roomId, participantId, userId, roomIdLMS, title, message, token){
    let param = {
        "roomId"            : roomId,
        "paticipantId"      : participantId,
        "userIdLMS"         : userId,
        "roomIdLMS"         : roomIdLMS,
        "title"             : title,
        "message"           : message,
        "device"            : DeviceInfo.getSystemName(),
        "userRoleLMS"       : "HV"
    };
    return post(API_ADD_LOG_ERROR, param, LOG_CALL.API_LOGERROR_ADD, token);
}

export function getUserInfo(id, token ){
    return get(API_GET_USER_INFO + id, null, null, token);
}

export function configAPI(key){
    return new Promise(function(resolve,reject){
        fetch(LINK_CONFIG+key, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }).then((response) => {
            if(response.status == 200){
                resolve(response.json());
            }else{
                resolve({mess : "no"});
            }
        }).catch(err=>{
            reject(err);
        });
    });
}

export function setLogsInfo(data) {
    return new Promise(function( resolve, reject){
        fetch( getDomainLog() + "/v1/infologs", {
            headers: {
                "Content-Type": "application/json",
                "token" : TOKEN_LOG
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then((res) => {
                resolve(res.json());
            })
            .catch((error) => {
                resolve({});
            });
    });
}

function saveLogCallApi( data, type, uri, result, timeResponse){
    if (getEnableLog()){
        getAsyncStorage("dataInfo").then(res =>{
            let result = JSON.parse(res);
            let dataCallApi = {
                timeCreated: new Date().getTime(),
                system : SYSTEM_LOG,
                data: {
                    type: type,
                    data,
                    uri,
                    userId: type !== "API_LOGIN" ? result.userId : null,
                    roomId: type !== "API_LOGIN" ? result.roomId : null,
                    result,
                    timeResponse
                }
            };
            if ((type !== "API_LOGINOUT_ADD" && data.action === "out") || type!== "API_LOGACTION") {
                dataCallApi.data.data = {...dataCallApi.data.data, idRoom: result.roomId};
            }
            setLogsCallApi(dataCallApi);
        });
    }
}

export function setLogsCallApi(data) {
    return new Promise(function( resolve, reject){
        fetch( getDomainLog() + "/v1/apilogs", {
            headers: {
                "Content-Type": "application/json",
                "token" : TOKEN_LOG
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then((res) => {
                resolve(res.json());
            })
            .catch((error) => {
                resolve({});
            });
    });
}

export function checkUpdateAppAPI(currentVersion, systemName, customer){
    return new Promise((resolve,reject) => {
        fetch(DOMAIN_API_TESTER + "/api/version/check?system="+systemName + "&version=" + currentVersion + "&customer=" + customer , 
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then(response => response.json())
            .then(res => {
                if(res.status == true){
                    resolve (res);
                }else{
                    resolve ({});
                }
            }).catch(err=>{
                reject({});
            });
    });
}

