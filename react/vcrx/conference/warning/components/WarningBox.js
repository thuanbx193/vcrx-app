/**
 * WarningBox component
 * Desciption of file
 *
 * Author     : Hainn3
 * Modified   : Hainn3
 * Created at : 2019/07/01
 * Modified at: 2019/07/01
 *
 *
 * Copyright (c)-2017 TOPICA EDTECH GROUP (www.topica.asia)
 * ********************************************************
 */

import {  View,TextInput,
    TouchableHighlight, Text, Keyboard
}                                       from "react-native";
import React, { Component }             from "react";
import { connect }                      from "react-redux";
import styles                           from "./styles";
import { 
    handleWarning, 
    handleSendWarning 
}                                       from "../../../actions";

class WarningBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            title:""
        };
    }

    componentWillUnmount(){
        this.closePopup();
    }

    render() {
        let title = "";
        if (this.props._errorBoxKey == 1){
            title = this.props._languages.topica.vcrx.error.video;
        } else if (this.props._errorBoxKey == 2){
            title = this.props._languages.topica.vcrx.error.mic;
        } else if (this.props._errorBoxKey == 3){
            title = this.props._languages.topica.vcrx.error.slide;
        }
        if(this.props._errorBoxKey != 0){
            return(
                <View style={styles.mainBox}>
                    <View style = {styles.errorBox}>
                        { this.props._errorBoxKey != 4 &&
                            <Text style={styles.title}>{title}</Text>
                        }
                        { this.props._errorBoxKey == 4 &&
                            <TextInput style = {styles.inputTitleError}
                                placeholder = {this.props._languages.topica.vcrx.error.enter_title}
                                multiline = {false}
                                onChangeText={this._onTitleChange}
                                underlineColorAndroid={"transparent"}
                                value={this.state.title}
                            />
                        }
                        <Text style={styles.advise}>{this.props._languages.topica.vcrx.error.advise}</Text>
                        <TextInput style = {styles.inputError}
                            placeholder = {this.props._languages.topica.vcrx.error.enter}
                            multiline = {true}
                            numberOfLines = {4}
                            onChangeText={this._onMessageChange}
                            underlineColorAndroid={"transparent"}
                            value={this.state.message}
                        />
                        {
                            this.state.showNotify == true &&
                            <Text style={styles.inputErrorText}>{this.props._languages.topica.vcrx.error.no_input}</Text>
                        }
                        <View style = {styles.boxSubmit}>
                            <TouchableHighlight
                                accessibilityLabel={"Tap to Send."}
                                onPress={this._onNotifyOtherWarning}
                                style={styles.sendBtn}
                                underlayColor="transparent">
                                <Text style={styles.sendBtnSub}>{this.props._languages.topica.vcrx.error.send}</Text>
                            </TouchableHighlight>
                        </View>
                        <TouchableHighlight
                            accessibilityLabel={"Close popup"}
                            onPress={this.closePopup}
                            style={styles.closeBtn}
                            underlayColor="transparent">
                            <Text style={styles.closeBtnText}>X</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        } else {
            return(<View />);
        }
    }

    _onNotifyOtherWarning  = () => {
        let title = this.state.title;
        if (this.props._errorBoxKey == 1){
            title = this.props._languages.topica.vcrx.error.video;
        } else if (this.props._errorBoxKey == 2){
            title = this.props._languages.topica.vcrx.error.mic;
        } else if (this.props._errorBoxKey == 3){
            title = this.props._languages.topica.vcrx.error.slide;
        }
        if (title.replace(/^\s+/, "").replace(/\s+$/, "") != ""){
            this.props.dispatch(handleSendWarning(title, this.state.message, this.props.socket));
            this.setState({message:"", title:""});
            this.setState({showNotify:false}); 
        } else {
            this.setState({showNotify:true});
        }
    }

    closePopup  = () => {
        Keyboard.dismiss();
        this.props.dispatch(handleWarning(0));
        this.setState({showNotify:false, title:"", message:""});
    }


    _onMessageChange = value => { 
        this.setState({ message: value });
    }

    _onTitleChange  = value => { 
        this.setState({ title: value, showNotify: value.length == 0 });
    }
}


export function _mapStateToProps(state: Object) {
    return {
        _languages   : state["vcrx"].languages,
        _errorBoxKey : state["vcrx"].roomInfo.errorKey,
    };
}

export default connect( _mapStateToProps )( WarningBox );
