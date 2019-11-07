import {
    createStyleSheet
}                               from "./../../../../features/base/styles";
import {
    responsiveHeight,
    responsiveWidth
}                               from "react-native-responsive-dimensions";

let height = responsiveHeight(2) > responsiveWidth(2) ? responsiveWidth(2) : responsiveHeight(2);
export default createStyleSheet({
    sidebar: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,1)",
        marginTop: height,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        zIndex:14
    },
    styleMenuDisable: {
        zIndex: 100,
        backgroundColor: "#777",
        width: 35,
        height: 25,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:15,
        marginTop:5,
        marginBottom:5,
        borderRadius: 3
	  },
    fontAwesomeWarning:{
        textAlignVertical: "center",
        color: "#fff",
        fontSize: 16,
    },
    boxNumbernoti:{
        zIndex:111111111,
        backgroundColor:"red",
        padding:0,
        position:"absolute",
        top:0,
        right:-1,
        width:16,
        height:12,
        borderRadius:6,
        justifyContent:"center",
        alignItems:"center"
    },
    sidebarNumbernoti:{
        color:"#fff",
        fontSize:8
    },
    sidebarLayout:{
        width: 120,
        height: 120,
        borderColor: "cornflowerblue",
        borderWidth: 1,
        borderRadius: 5,
        padding: 3,
    },
    sidebarLayoutText:{
        backgroundColor: "#777",
        textAlign: "center",
        color: "#fff",
        fontSize: 13,
    },
    activeLayout:{
        color:"#00CCFF",
        width:"100%",
        fontWeight:"bold"
    },
  	styleMenuEnable: {
        zIndex: 100,
        backgroundColor: "#0084ff",
        width: 35,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15,
        marginTop:5,
        marginBottom:5,
        borderRadius: 3
    }
});
