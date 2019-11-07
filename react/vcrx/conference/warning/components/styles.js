import {
    createStyleSheet
}                               from "./../../../../features/base/styles";
import { Dimensions }           from "react-native";
import {
    responsiveHeight,
    responsiveWidth
}                               from "react-native-responsive-dimensions";

export default createStyleSheet({
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
    },
    fontAwesomeWarning:{
        textAlignVertical: "center",
        color: "#fff",
        fontSize: 16,
    },
    sidebarErrorText:{
        backgroundColor: "#777",
        textAlign: "center",
        color: "#fff"
    },
    sidebarError:{
        width: 130,
        height: 120,
        borderColor: "cornflowerblue", 
        borderWidth: 1,
        borderRadius: 5, 
        padding: 3
    },
    mainBox: {
        justifyContent:"center",
        width: Dimensions.get("window").width > Dimensions.get("window").height ? Dimensions.get("window").width : Dimensions.get("window").height,
        height: Dimensions.get("window").height < Dimensions.get("window").width ? Dimensions.get("window").height : Dimensions.get("window").width,
        position: "absolute",
        zIndex: 99999999999,
        alignItems: "center"
    },
    errorBox:{
	    backgroundColor:"#fff",
        borderRadius:3,
        width: responsiveWidth(60) > responsiveHeight(60) ? responsiveWidth(60) : responsiveHeight(60),
        height: responsiveHeight(50) < responsiveWidth(50) ? responsiveHeight(50) : responsiveWidth(50),
        borderColor: "#dbac69",
        borderWidth: 1
    },
    inputError:{
	    borderColor:"#cecece",
	    borderWidth:1,
	    margin:15,
        paddingLeft:5,
        borderRadius:3,
        marginTop:6,
        marginBottom: 6,
        textAlignVertical:"top",
        fontSize: 13
    },
    inputTitleError:{
	    backgroundColor: "#dbac69",
	    textAlign: "center",
        color: "#000",
	    fontSize: 16,
	    paddingTop: 5,
	    paddingBottom: 5
    },
    title:{
        backgroundColor: "#dbac69",
	    textAlign: "center",
        color: "#000",
	    fontSize: 16,
	    paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth:1,
        borderBottomColor: "#cecece",
        fontWeight: "300",
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },
    advise:{
        paddingLeft: 15,
        paddingRight: 15,
        color:"#000",
        fontSize: 13,
        paddingTop:3,
        fontStyle: "italic"
    },
    boxSubmit:{
        alignItems:"center"
    },
    sendBtn:{
        height: 30, 
        width: 70,
        margin:"auto",
	    backgroundColor:"#fff",
	    justifyContent:"center",
        alignItems:"center",
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        backgroundColor:"#fff"
    },
    closeBtn:{
	    justifyContent:"center",
	    alignItems:"center",
	    position:"absolute",
	    right:4,
	    top:4
    },
    sendBtnSub:{
        margin:"auto",
        backgroundColor:"#dbac69",
        textAlign: "center",
        height: 20,
        marginBottom: 5,
        width: 70,
        borderRadius: 10,
        lineHeight: 20,
    },
    closeBtnText: {
        color:"#000",
        fontSize:14
    },
    inputErrorText:{
        color:"red",
        fontSize:10,
        marginLeft:15
    }
});
