import {
    createStyleSheet
}                       from "./../../../../features/base/styles";
export default createStyleSheet({
    videoBoxVisible: {
        zIndex:1111,
        position: "absolute",
        top: "0%",
        left: "0%",
        right: "0%",
        bottom: "0%",
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    chatBoxHidden: {
        display:"none"
    },
    wrapperVideo: {
        position: "absolute",
        left: "5%",
        right: "5%",
        top: "5%",
        bottom: "5%",
        backgroundColor:"green",
        zIndex:1110000
    },
    btCloseVideo: {
        zIndex:11111111,
        height: 30,
        width: 30,
        position: "absolute",
        right:18,
        top: 10,justifyContent:"center",
        alignItems:"center",
        backgroundColor: "red",
        borderRadius: 15
    },
    videoClose:{
        fontSize: 15,
        color: "#fff"
    }
});
