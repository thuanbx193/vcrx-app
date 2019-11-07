import { createStyleSheet } from "./../../../../features/base/styles";
import { responsiveHeight,responsiveWidth } from "react-native-responsive-dimensions";

let height = responsiveHeight(2) > responsiveWidth(2) ? responsiveWidth(2) : responsiveHeight(2);

export default createStyleSheet({
    countDownView: {
        flex: 1, 
        backgroundColor: "rgba(255,255,255,1)", 
        marginLeft: height, 
        alignItems: "center", 
        flexDirection: "row",
        borderRadius: 5
    },
    countDownContent: {
        flex: 1, 
        textAlign: "center", 
        fontSize: 18, 
        fontWeight: "600",
    },
    countDownIcon: {
        marginRight: 5, 
        position: "absolute", 
        left: 10,
        fontSize:18
    },
});
