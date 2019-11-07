import React, { Component }     from "react";
import { connect }              from "react-redux";
import {View, AppState}         from "react-native";
import { Header }               from "../../header";
import { AssessmentStudents }   from "../../assessment-students";
import  WarningBox              from "../../warning/components/WarningBox";
import {
    LayoutDefault,
    LayoutSecond,
    LayoutThird,
    LayoutFourth
}                               from "./Layout";
import {
    kickUser,
    startRoom,
    exitClass,
    changeRoomInfo,
    setSocket,
    saveLogInfo
}                               from "../../../actions";
import io                       from "socket.io-client/dist/socket.io.js";
import NetInfo                  from "@react-native-community/netinfo";
import CallDetectorManager      from "react-native-call-detection";
import VideoWarmUp              from "../../video-warmup/components/VideoWarmUp";
import {
    PORTAL_LINKING,
    CALL_INCOMING,
    LOGOUT_BY_PRESS_HOME_BUTTON,
    ACCESS_MICRO, MOBILE_SYSTEM
}                               from "../../../constants";
import { Connection }           from "../../connection";
import Permissions              from "react-native-permissions";

class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            netType: ""
        };
        if(this.props.listdomain){
            let domains = this.props.listdomain.split(",");
            this.socket = io(domains[3], { jsonp: false });
        }
        
    }

    startListenerTapped = () => {
        let callDetector = new CallDetectorManager((event, number) => {
            if(event === CALL_INCOMING){
                callDetector.dispose();
            }
        },
        false,
        ()=>{},
        {
            title: "Phone State Permission",
            message: "This app needs access to your phone state in order to react and/or to adapt to incoming calls."
        });
    }

    componentWillMount(){
        this.props.dispatch(startRoom());
        NetInfo.addEventListener(state => {
            if (!state.isConnected || (this.state.netType != "" && this.state.netType != state.type)){
                if (state.type == "cellular" || state.type == "wifi"){
                    this.setState({netType : state.type});
                }
                this.props.dispatch(kickUser("local", PORTAL_LINKING.NETWORK));
            } else {
                if (state.type == "cellular" || state.type == "wifi"){
                    this.setState({netType : state.type});
                }
            }
        });
        this.startListenerTapped();
    }

    componentDidMount() {
        AppState.addEventListener("change", this._handleAppStateChange);
        this.props.dispatch(setSocket(this.socket));
        Permissions.check("microphone").then(response => {
            let data = {
                userId  : this.props._userId,
                roomId  : this.props._roomId,
                system  : MOBILE_SYSTEM,
                status  : response === "authorized" ? true : false
            };
            this.props.dispatch(saveLogInfo(data, ACCESS_MICRO));
        });
    }
    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if(nextAppState == "active"){
            this.props.dispatch(changeRoomInfo({playVideo: true}));
        }
        if(nextAppState == "inactive"){
            this.props.dispatch(changeRoomInfo({playVideo: false}));
        }
        if(nextAppState == "background"){
            this.props.dispatch(exitClass(LOGOUT_BY_PRESS_HOME_BUTTON));
        }
    }

    renderLayout = () => {
        switch(this.props.indexLayout) {
            case 1:
                return <LayoutSecond socket={this.socket} chatVisible={this.props._chatVisible} />;
            case 2:
                return <LayoutThird socket={this.socket} chatVisible={this.props._chatVisible} />;
            case 3:
                return <LayoutFourth socket={this.socket} chatVisible={this.props._chatVisible} />;
        }
        return <LayoutDefault socket={this.socket} chatVisible={this.props._chatVisible} />;

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <VideoWarmUp />
                    <Header />
                    <AssessmentStudents />
                    {this.renderLayout()}
                    <Connection/>
                    <WarningBox socket={this.socket} />
                </View>
            </View>
        );
    }
}

function _mapStateToProps(state) {
    return {
        indexLayout        : state["vcrx"].roomInfo.indexLayout,
        _chatVisible       : state["vcrx"].chatInfo.chatVisible,
        _userId            : state["vcrx"].userInfo.id,
        _roomId            : state["vcrx"].roomInfo.idRoom,
        listdomain         : state["vcrx"].listdomain  
    };
}

export default connect(_mapStateToProps)(Room);
