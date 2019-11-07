import React, {Component}                       from "react";
import { connect }                              from "react-redux";
import { translate }                            from "./../../../../features/base/i18n";
import { View, TouchableOpacity, Text }         from "react-native";
import FontAwesome                              from "react-native-vector-icons/FontAwesome";
import styles                                   from "./styles";
import {changeTabsChat, handleReadMessage, toggleChatVisible} from "../../../actions";
import { CHAT_ID_PUBLIC, CHAT_TABS_PUBLIC }     from "../../../constants";

class ChatIcon extends Component {
    constructor(props) {
        super(props);
    }

    _showChatWindow = () => {
        if (this.props._chatInfo.chatVisible) {
            this.props.dispatch(toggleChatVisible(false));
            this.props.dispatch(changeTabsChat("",0));
        } else {
            this.props.dispatch(handleReadMessage(CHAT_ID_PUBLIC, CHAT_TABS_PUBLIC));
            this.props.dispatch(changeTabsChat(CHAT_TABS_PUBLIC, CHAT_ID_PUBLIC));
            this.props.dispatch(toggleChatVisible(true));
        }
    }

    render() {
        let total = this.props._chatInfo.notifies.private.reduce((t, n) => {
            return t += n.count;
        }, this.props._chatInfo.notifies.public);
        return (
            <TouchableOpacity onPress={this._showChatWindow}>
                <View style={this.props._chatInfo.chatVisible ? styles.styleMenuEnable: styles.styleMenuDisable}>
                    <FontAwesome name="wechat" style={styles.fontAwesomeWarning} />
                    {
                        total != 0 &&
                        <View style={styles.boxNumbernoti}>
                            <Text style={styles.sidebarNumbernoti}>{total}</Text>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

function _mapStateToProps(state) {
    return {
        _chatInfo : state["vcrx"].chatInfo,
    };
}

export default translate(connect(_mapStateToProps)(ChatIcon));