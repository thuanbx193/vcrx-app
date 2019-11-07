import React            from "react";
import { connect }      from "react-redux";
import { GiftedChat, InputToolbar }   from "react-native-gifted-chat";
import {
    View
}                       from "react-native";
import {
    CHAT_TABS_OPTION,
    CHAT_TYPE_PRIVATE,
    CHAT_TABS_PUBLIC
}                       from "./../../../constants";
import {
    PERMISSION
}                       from "./../../../config";
import { sendChat }     from "../../../actions";
import MessageText      from "./MessageText";

class ChatContent extends React.Component{
    constructor(props){
        super(props);
    }

    _sendMessage = (messages) => {
        if ( messages[0].text.trim().length > 0 ){
            this.props.dispatch(sendChat(messages));
        }
    }
    renderInputToolbar = props => {
        if(this.props.role){
            return(
                <InputToolbar {...props} />
            );
        }
    }
    renderMessageText = props => {
        return <MessageText {...props}/>;
    }
    render(){
        if(this.props._chatInfo.tabs === CHAT_TABS_OPTION){
            return(<View/>);
        }
        return(
            <GiftedChat
                messages    = {this.props.chats.reverse()}
                onSend      = {(messages)=> this._sendMessage(messages)}
                placeholder = {this.props._languages.topica.vcrx.chat.inputText}
                renderInputToolbar={(props) => this.renderInputToolbar(props)}
                renderMessageText={(props) => this.renderMessageText(props)}
                user        = {
                    {
                        _id: parseInt(this.props._userInfo.id),
                        name: this.props._userInfo.firstname + " " + this.props._userInfo.lastname,
                    }
                }
            />
        );
    }
}

function _mapStateToProps(state){
    let chats;
    let role = true;
    let userInfo = state["vcrx"].userInfo;
    if(state["vcrx"].chatInfo.tabs == CHAT_TABS_PUBLIC){
        if ( PERMISSION.disablePulicChat.indexOf(userInfo.role) >= 0){
            role = false;
        }
        chats = state["vcrx"].chatInfo.chats.filter(m => m.chatType != CHAT_TYPE_PRIVATE );
    }else{
        chats = state["vcrx"].chatInfo.chats.filter(m=> ( (m.chatFrom == state["vcrx"].chatInfo.toId && m.chatTo == state["vcrx"].userInfo.id) || (m.chatFrom == state["vcrx"].userInfo.id && m.chatTo == state["vcrx"].chatInfo.toId ) ));
    }
    return {
        _languages      : state["vcrx"].languages,
        _userInfo       : userInfo,
        _chatInfo       : state["vcrx"].chatInfo,
        chats,
        role
    };
}

export default connect(_mapStateToProps)(ChatContent);