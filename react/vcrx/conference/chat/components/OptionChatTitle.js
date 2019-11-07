import React            from "react";
import { connect }      from "react-redux";
import styles           from "./styles";
import {
    Text, View,
    TouchableHighlight
}                       from "react-native";
import { 
    changeTabsChat
}                       from "../../../actions";
import {
    CHAT_TABS_OPTION
}                       from "./../../../constants";

class OptionChatTitle extends React.Component{
    constructor(props){
        super(props);
    }

    _changeTabsChat = (tabs, toId, toFullname) => {
        this.props.dispatch(changeTabsChat(tabs, toId, toFullname));
    }

    render(){
        return(
            <TouchableHighlight 
                onPress = {()=>this._changeTabsChat( CHAT_TABS_OPTION, null, null )}
                style ={[styles.chatHeadTitle,this.props.bgTabs]}>
                <View style={styles.chatHeadTitleView}>
                    <Text style={styles.chatHeadTitleViewText}>{this.props.titleTabs}</Text>    
                    {
                        this.props.totalNotify != 0 && 
                        <Text style={styles.textNotify}>{this.props.totalNotify}</Text>
                    }
                </View>
            </TouchableHighlight>
        );
    }
}

function _mapStateToProps(state){
    let bgTabs = {borderLeftWidth: 0.4};
    if(state["vcrx"].chatInfo.tabs == CHAT_TABS_OPTION){
        bgTabs.backgroundColor = "#dbac69";
    }
    let totalNotify = state["vcrx"].chatInfo.notifies.private.reduce((t, n) => {
        return t += n.count;
    }, 0);
    return {
        totalNotify,
        titleTabs : state["vcrx"].languages.topica.vcrx.chat.options,
        bgTabs
    };
}

export default connect(_mapStateToProps)(OptionChatTitle);
