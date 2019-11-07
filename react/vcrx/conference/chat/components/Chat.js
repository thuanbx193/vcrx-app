import React                from "react";
import { View }             from "react-native";
import UserListChat         from "./UserListChat";
import OptionChatTitle      from "./OptionChatTitle";
import UserChatTitle        from "./UserChatTitle";
import PublicChatTitle      from "./PublicChatTitle";
import ChatContent          from "./ChatContent";
import styles               from "./styles";

function Chat(){
    return(
        <React.Fragment>
            <View style={styles.chatWrapper}>
                <PublicChatTitle />
                <OptionChatTitle />
                <UserChatTitle />
            </View>
            <ChatContent />
            <UserListChat />
        </React.Fragment>
    );
}

export default Chat;
