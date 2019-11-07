/**
 * Homepage.js
 * Render ra màn hình Homepage
 *
 * Created : 2018/06/20
 * Modified: 2018/06/21
 * Author  : HaiNN3
 * Edited  : HaiNN3
 *
 * Copyright (c)-2017 TOPICA EDTECH GROUP (www.topica.asia)
 ******************************************************************************/
/* @flow */

import React, { Component }     from "react";
import {
    View, Text,TouchableHighlight,
    TextInput, Image, TouchableOpacity,
    StatusBar, AppState
}                               from "react-native";
import NetInfo                  from "@react-native-community/netinfo";
import { connect }              from "react-redux";
import styles                   from "./styles";
import {
    joinRoomByLink,
    handleOpenPortal,
    setConfig,
    setCustomConfig,
    setTimeExitApp,
    checkUpdateApp
}                               from "../../actions";
import {
    APP_VERSION, SET_CONFIG, NVNP, SELECTED_NVNP
}                               from "../../constants";
import Orientation              from "react-native-orientation";
import Dialog                   from "react-native-dialog";
import {getAsyncStorage}        from "../../apis";
import {
    setEnableLog, TIME_EXIT_APP, DOMAIN_API, DEFAULT_SERVER_URL, DOMAIN_SOCKET, DOMAIN_LOGS, setDomainLog, setDefultServerURL, setDomainAPI
}                               from "../../config";

class HomePage extends Component<*> {

    constructor(props) {
        super(props);
        this.state = {
            text        : "",
            toggle      : false,
            selected    : 3,    
            dataCustom: {   
            },
            appState: AppState.currentState
        };
    }

    _openURL = () => {
        this.props.dispatch(joinRoomByLink(this.state.text, false));
    }

    _openPortal = () => {
        this.props.dispatch(handleOpenPortal());
    }

    componentWillMount(){
        getAsyncStorage(TIME_EXIT_APP).then(res => {
            let timeExit = JSON.parse(res);
            this.props.dispatch(setTimeExitApp(timeExit));
        });
        getAsyncStorage(SET_CONFIG).then(respon => {
            let res = JSON.parse(respon);
            this.setState({
                selected: res.select ? res.select : 3
            });
        });
        Orientation.lockToPortrait();
        NetInfo.addEventListener(state => {
            if (!state.isConnected && this.state.selected === 3){
                let params = {
                    DOMAIN_LOGS: DOMAIN_LOGS,
                    DOMAIN_API: DOMAIN_API,
                    DEFAULT_SERVER_URL: DEFAULT_SERVER_URL,
                    DOMAIN_SOCKET: DOMAIN_SOCKET,
                };
                this.setState({dataCustom : params });
            } else if (state.isConnected && this.state.selected === 3 && Object.keys(this.state.dataCustom).length === 0){
                this.props.dispatch(setConfig(NVNP, SELECTED_NVNP));
            }
        });
        AppState.addEventListener("change", this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
    }

    componentWillReceiveProps(nextProps){
        let domains = nextProps.listdomain.split(",");
        const params = {
            DOMAIN_LOGS: domains[4],
            DOMAIN_API: domains[1],
            DEFAULT_SERVER_URL: domains[2],
            DOMAIN_SOCKET: domains[3],
        };
        setDomainLog(domains[4]);
        setDefultServerURL(domains[2]);
        setDomainAPI(domains[1]);
        this.setState({dataCustom : params });
    }

    _handleAppStateChange = nextAppState => {
        if(nextAppState == "active"){
            this.props.dispatch(checkUpdateApp());
        }
    }

    _openEnv = () => {
        this.setState({
            dialogPass: true
        });
    }

    _setConfig = (select, env) => {
        if (select === 4){
            this.setState({
                selected: 4,
                dialogCustom: true
            });
        } else {
            this.setState({
                selected: select
            }, () => {
                this.props.dispatch(setConfig(env, select));
            });
        }
    }

    changeValuePass = (text) => {
        this.setState({
            passSecrect: text
        });
    }

    handleCancel = () => {
        this.setState({
            dialogPass   : false,
            passSecrect     : ""
        });
    }

    handleSuccess = () => {
        if (this.state.passSecrect === "1")
            this.setState({
                toggle      : true,
                dialogPass  : false,
                passSecrect : ""
            });
    }

    changeValueCustom = (text, key) => {
        let data = this.state.dataCustom;
        data = {...data, [key]: text};
        this.setState({
            dataCustom: data
        });
    }

    _onHandleSuccessCustom = () => {
        let data = this.state.dataCustom;
        if(data.DOMAIN_LOGS && data.DOMAIN_API && data.DEFAULT_SERVER_URL && data.DOMAIN_SOCKET){
            let _data = [data.DOMAIN_LOGS, data.DOMAIN_API, data.DEFAULT_SERVER_URL, data.DOMAIN_SOCKET];
            setCustomConfig(_data);
            this.setState({
                dialogCustom    : false
            });
        } else {
            alert("Data không hợp lệ!");
        }
    }

    _onHandleCancelCustom = () => {
        let data = {
            DOMAIN_LOGS        : "",
            DOMAIN_API          : "",
            DEFAULT_SERVER_URL  : "",
            DOMAIN_SOCKET       : ""
        };
        this.setState({
            selected        : 3,
            dialogCustom    : false,
            dataCustom      : data
        }, () => {
            this.props.dispatch(setConfig("NTLP"));
        });
    }

    render() {
        const { dialogPass, passSecrect, selected, dialogCustom, dataCustom } = this.state;
        const { DOMAIN_LOGS, DOMAIN_API, DEFAULT_SERVER_URL, DOMAIN_SOCKET } = dataCustom;
        return (
            <React.Fragment>
                <StatusBar hidden={true} />
                <Text style={styles.inforAppVerText}>{APP_VERSION}</Text>
                <Image style={styles.backgroundImg} source={require("../../images/brg_login.jpg")} />
                <View style={styles.main}>
                    <View style={styles.linkContainer}>
                        <TextInput
                            style={styles.linkBox}
                            onChangeText={(text) => this.setState({text})}
                            placeholder = {"Enter URL"}/>
                        <TouchableHighlight
                            style = {styles.buttonJoin}
                            onPress = {this._openURL}>
                            <Text style = {styles.txtBtnJoin}>{this.props._languages.topica.homepage.joinroom}</Text>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight
                        style = {styles.buttonPortal}
                        onPress =  {this._openPortal}>
                        <Text>{this.props._languages.topica.homepage.open_portal}</Text>
                    </TouchableHighlight>
                    <TouchableOpacity
                        activeOpacity={1}
                        style = {styles.longpressWrapper}
                        onLongPress={() => this._openEnv()}
                        delayLongPress={2000} style={styles.longpressWrapper}>
                        {this.state.toggle === true &&
                        <React.Fragment>
                            <TouchableOpacity
                                style = {[styles.longpressButton, selected === 1 && styles.longpressSelected]}
                                onPress={() => this._setConfig(1, "NVNT")}>
                                <Text style={selected === 1 && {color: "#f6c108"}}>Test</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style = {[styles.longpressButton, selected === 2 && styles.longpressSelected]}
                                onPress={() => this._setConfig(2, "NVNS")}>
                                <Text style={selected === 2 && {color: "#f6c108"}}>Staging</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style = {[styles.longpressButton, selected === 3 && styles.longpressSelected]}
                                onPress={() => this._setConfig(SELECTED_NVNP, NVNP)}>
                                <Text style={selected === 3 && {color: "#f6c108"}}>Production</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style = {[styles.longpressButton, selected === 4 && styles.longpressSelected]}
                                onPress={() => this._setConfig(4, "CUSTOM")}>
                                <Text style={selected === 4 && {color: "#f6c108"}}>Custom</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                        }
                    </TouchableOpacity>
                    <Dialog.Container visible={dialogPass}>
                        <Dialog.Title>Password:</Dialog.Title>
                        <Dialog.Input value={passSecrect}
                            onChangeText={this.changeValuePass}
                            wrapperStyle={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}/>
                        <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                        <Dialog.Button label="Ok" onPress={this.handleSuccess} />
                    </Dialog.Container>
                    <Dialog.Container visible={dialogCustom}>
                        <Dialog.Title>Custom:</Dialog.Title>
                        <Dialog.Input value={DOMAIN_API}
                            onChangeText={(value)=>this.changeValueCustom(value, "DOMAIN_API")}
                            wrapperStyle={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}
                            placeholder={"DOMAIN_API"}/>
                        <Dialog.Input value={DEFAULT_SERVER_URL}
                            onChangeText={(value)=>this.changeValueCustom(value, "DEFAULT_SERVER_URL")}
                            wrapperStyle={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}
                            placeholder={"DEFAULT_SERVER_URL"}/>
                        <Dialog.Input value={DOMAIN_SOCKET}
                            onChangeText={(value)=>this.changeValueCustom(value, "DOMAIN_SOCKET")}
                            wrapperStyle={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}
                            placeholder={"DOMAIN_SOCKET"}/>
                        <Dialog.Input 
                            value={ DOMAIN_LOGS }
                            onChangeText = { (value)=>this.changeValueCustom(value, "DOMAIN_LOGS") }
                            wrapperStyle = { {backgroundColor: "rgba(0, 0, 0, 0.1)"} }
                            placeholder = { "DOMAIN_LOGS" } />
                        <Dialog.Button 
                            label = { "Cancel" } 
                            onPress = { this._onHandleCancelCustom } />
                        <Dialog.Button 
                            label = { "Ok" } 
                            onPress = { this._onHandleSuccessCustom } />
                    </Dialog.Container>
                </View>
            </React.Fragment>
        );
    }
}

export function _mapStateToProps(state: Object) {
    if (state["features/base/config"].enableLog !== undefined){
        if (state["features/base/config"].enableLog){
            setEnableLog(true);
        } else {
            setEnableLog(false);
        }
    }
    return {
        _languages   : state["vcrx"].languages,
        listdomain   : state["vcrx"].listdomain
    };
}

export default connect(_mapStateToProps )(HomePage);
