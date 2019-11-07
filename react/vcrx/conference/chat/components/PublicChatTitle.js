import React            from "react";
import { connect }      from "react-redux";
import styles           from "./styles";
import {
    Text, View,
    TouchableHighlight
}                       from "react-native";
import {
    changeTabsChat,
    handleReadMessage
}                       from "../../../actions";
import {
    CHAT_TABS_PUBLIC,
    CHAT_ID_PUBLIC
}                       from "./../../../constants";

class PublicChatTitle extends React.Component{
    constructor(props){
        super(props);
    }

    _changeTabsChat = (tabs, toId, toFullname) => {
        this.props.dispatch(changeTabsChat(tabs, toId, toFullname));
        this.props.dispatch(handleReadMessage(CHAT_ID_PUBLIC, CHAT_TABS_PUBLIC));
    }

    render(){
        return(
            <TouchableHighlight
                onPress = {()=>this._changeTabsChat( CHAT_TABS_PUBLIC, CHAT_ID_PUBLIC, null )}
                style ={[styles.chatHeadTitle,this.props.bgTabs]}
            >
                <View style={styles.chatHeadTitleView}>
                    <Text style={styles.chatHeadTitleViewText}>{this.props._languages.topica.vcrx.chat.public}</Text>
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
    let bgTabs = {borderRightWidth: 0.4};
    if(state["vcrx"].chatInfo.tabs == CHAT_TABS_PUBLIC){
        bgTabs.backgroundColor = "#dbac69";
    }
    return {
        _languages      : state["vcrx"].languages,
        totalNotify     : state["vcrx"].chatInfo.notifies.public,
        bgTabs
    };
}

export default connect(_mapStateToProps)(PublicChatTitle);
