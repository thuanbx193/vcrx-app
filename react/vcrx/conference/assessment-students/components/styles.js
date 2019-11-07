import { createStyleSheet } from "./../../../../features/base/styles";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
let heightTitle = responsiveHeight(10) < responsiveWidth(10) ? responsiveHeight(10) : responsiveWidth(10);
let height = responsiveHeight(12) < responsiveWidth(12) ? responsiveHeight(12) : responsiveWidth(12);
let width = responsiveWidth(96) > responsiveHeight(96) ? responsiveWidth(96) : responsiveHeight(96);

export default createStyleSheet({
    headTableAssessment: {
        height: heightTitle,
        backgroundColor: "#dbac69",
        alignItems: "center",
        justifyContent: "center"
    },
    textTableAssessment: {
        marginLeft: 5,
        backgroundColor:"#fff",
        textAlign:"center",
    },
    assetmentContent:{
        textAlign:"left"
    },
    rowTableAssessment: {
        height: height,
        backgroundColor:"#fff",
    },
    assessmentBoxVisible: {
        position: "absolute",
        top: "0%",
        left: "0%",
        right: "0%",
        bottom: "0%",
        backgroundColor: "rgba(0,0,0,0.2)",
        zIndex: 1111111111,
        padding:"5%",
        paddingLeft:"2%",
        paddingRight:"2%",
        alignItems:"center"
    },
    wrappAssissment: {

    },
    btCloseAss: {
        height: 30,
        width: 30,
        position: "absolute",
        right: -8,
        top: -8,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "red",
        borderRadius: 15
    },
    assetTable:{
        width:width,
    }
});
