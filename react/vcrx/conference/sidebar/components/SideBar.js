/*
    Room Component
    Author: AnhLH2
    Modified: DaoNC
    TimeCreated: 27/05/2019
    TimeModified: 05/06/2019
*/
import React            from "react";
import styles           from "./styles";
import { View }         from "react-native";
import RaiseHand        from "./RaiseHand";
import ChatIcon         from "../../chat/components/ChatIcon";
import LogOut           from "./LogOut";
import LayoutSelection  from "./LayoutSelection";
import WarningBtn       from "../../warning/components/WarningBtn";

function SideBar({ styleLayout, styleMenuBtn, socket }) {
    return(
        <View style={[styles.sidebar,(styleLayout||{})]}>
            <ChatIcon />
            <RaiseHand />
            <WarningBtn styleMenuBtn={styleMenuBtn} />
            <LayoutSelection styleMenuBtn={styleMenuBtn} />
            <LogOut socket={socket} />
        </View>
    );
}

export default SideBar;
