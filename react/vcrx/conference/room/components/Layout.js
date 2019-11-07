import React        from "react";
import styles       from "./styles";
import {
    View
}                   from "react-native";
import { Timer }    from "../../timer";
import { UserList } from "../../user-list";
import { Slide }    from "../../slide";
import { SideBar }  from "../../sidebar";
import { Chat }     from "../../chat";
import { LargeVideo } from "../../large-video";

const LayoutDefault = ( props ) => {
    return(
        <View style={styles.contentLayout}>
            <View style={styles.leftApp} >
                <UserList />
                <Timer />
                <View style={styles.largeVideo} >
                    <LargeVideo />
                </View>
            </View>
            <View style={styles.rightApp}>
                <View style={ styles.drawLayout }>
                    <Slide socket={props.socket}/>
                    {props.chatVisible &&
                        <View style={styles.chatBoxVisible}>
                            <Chat/>
                        </View>
                    }
                </View>
                <SideBar socket={props.socket} />
            </View>
        </View>
    );
};

const LayoutSecond = ( props ) => {
    return(
        <View style={styles.contentLayout}>
            <View style={styles.leftApp} >
                <View style={styles.CountDown2}>
                    <Timer />
                </View>
                <View style={{ flex: 5}}>
                    <UserList />
                </View>
            </View>
            <View style={styles.rightApp}>
                <View style={ styles.drawLayout }>
                    <Slide 
                        socket={props.socket} 
                        style={{ position: "absolute", zIndex: 1 }} 
                    />
                    {props.chatVisible &&
                        <View style={styles.chatBoxVisible}>
                            <Chat />
                        </View>
                    }
                </View>
                <SideBar socket={props.socket} />
            </View>
        </View>
    );
};

const LayoutThird = ( props ) => {
    return(
        <View style={styles.contentLayout}>
            <View style={styles.rightApp3}>
                <View style={ styles.drawLayout }>
                    <Slide
                        socket={props.socket}
                        style={{ position: "absolute", zIndex: 1 }}
                    />
                    {props.chatVisible &&
                        <View style={styles.chatBoxVisible}>
                            <Chat />
                        </View>
                    }
                </View>
                <SideBar
                    socket={props.socket}
                    styleLayout = {styles.sideBar3}
                    styleMenuBtn = {{marginLeft: 0}}
                />
            </View>
        </View>
    );
};
  
const LayoutFourth = ( props ) => {
    return(
        <View style={styles.contentLayout}>
            <View style={styles.rightApp3}>
                <View style={styles.largeVideoLayout4} >
                    <LargeVideo />
                    {props.chatVisible &&
                        <View style={styles.chatBoxVisible}>
                            <Chat />
                        </View>
                    }
                </View>
                <SideBar
                    socket       = {props.socket}
                    styleLayout  = {styles.sideBar3}
                    styleMenuBtn = {{marginLeft: 0}}
                />
            </View>
        </View>
    );
};
  
export {
    LayoutDefault,
    LayoutSecond,
    LayoutThird,
    LayoutFourth
};