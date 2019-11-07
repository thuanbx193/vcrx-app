import { Dimensions, StyleSheet } from "react-native";
import {isIphoneX} from "../../utils";

export default StyleSheet.create({
    backgroundImg: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        position: "absolute",
        top: 0,
        left: 0
    },
    main: {
        flex:1,
        flexDirection:"column",
        marginTop: "60%",
    },
    linkContainer: {
        flex: 2,
        width: "94%",
        flexDirection: "row",
        marginTop: "20%",
        marginStart: "3%",
        marginBottom: "10%"
    },
    linkBox: {
        height: "60%",
        flex: 8,
        borderColor: "gray",
        borderWidth: 1,
        marginLeft: "2%",
        backgroundColor: "#ffffff",
        padding: "2%"
    },
    buttonJoin: {
        flex:2,
        height: "60%",
        marginRight:"1%",
        marginLeft:"4%",
        alignItems:"center",
        justifyContent:"center",
        borderColor: "#AAAAAA",
        borderWidth: 1,
        backgroundColor: "#0c0e23"
    },
    txtBtnJoin: {
        color: "#fff"
    },
    buttonPortal :{
        width: "50%",
        height:"13%",
        backgroundColor:"#dbac69",
        justifyContent:"center",
        marginLeft: "25%",
        alignItems: "center",
        borderRadius: 3
    },
    longpressWrapper: {
        justifyContent: "center",
        alignItems: "center",
        flex: 4,
        flexDirection: "row",
        marginHorizontal: "10%",
        alignItems: "flex-end"
    },
    longpressButton: {
        flex: 1,
        height: 35,
        borderColor: "#fff",
        borderWidth: 1,
        justifyContent:"center",
        alignItems: "center",
        textAlign: "center",
        color: "#fff"
    },
    longpressSelected: {
        backgroundColor: "#ccc"
    },
    inforAppVerText: {
        color:"#fff",
        position:"absolute",
        top: isIphoneX() ? 30 : 0,
        zIndex:111111,
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.2)",
        textAlign: "center",
        padding: "2%"
    }
});
