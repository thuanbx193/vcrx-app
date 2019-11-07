import React            from "react";
import { connect }      from "react-redux";
import {
    Text, View,
    TouchableHighlight
}                       from "react-native";
import styles           from "./styles";
import { 
    changeTabsChat,
    handleReadMessage
}                       from "../../../actions";
import {
    CHAT_TABS_PRIVATE
}                       from "./../../../constants";

class UserChatTitle extends React.Component{
    constructor(props){
        super(props);
    }

    _changeTabsChat = (tabs, toId, toFullname) => {
        this.props.dispatch(changeTabsChat(tabs, toId, toFullname));
        this.props.dispatch(handleReadMessage(toId, CHAT_TABS_PRIVATE));
    }

    render(){
        if(!this.props.isShow){
            return(<View/>);
        }
        return(
            <TouchableHighlight 
                onPress = {()=>this._changeTabsChat( CHAT_TABS_PRIVATE, this.props.toUserId, null )}
                style ={[styles.chatHeadTitle,this.props.bgTabs]}>
                <View style={styles.chatHeadTitleView}>
                    <Text numberOfLines={1} style={styles.chatHeadTitleViewText}>{this.props.toFullname}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

function _mapStateToProps(state){
    let bgTabs = {};
    if(state["vcrx"].chatInfo.tabs == CHAT_TABS_PRIVATE){
        bgTabs = {backgroundColor:"#dbac69"};
    }
    return {
        toFullname  : state["vcrx"].chatInfo.toFullname,
        toUserId    : state["vcrx"].chatInfo.toUserId,
        bgTabs, 
        isShow      : (state["vcrx"].chatInfo.toFullname != "")
    };
}

export default connect(_mapStateToProps)(UserChatTitle);
