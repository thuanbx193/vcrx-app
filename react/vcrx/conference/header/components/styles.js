import { ColorPalette }             from "../../../../features/base/styles";
import { StyleSheet }               from "react-native";

let audioButtonStylesIcon = {
    alignSelf: "center",
    fontSize: 13
};
export default StyleSheet.create({
    header: {
        height: 30,
        backgroundColor: "#fff",
        flexDirection: "row"
    },
    headerGradient: {
        flex: 1,
        height: 30,
        backgroundColor: "#fff",
        justifyContent: "center",
        elevation: 10
    },
    headerLogo: {
        height: 30,
        width: 240,
        position: "absolute",
        left: 0,
        resizeMode: "contain",
        marginLeft: 0
    },
    roomIdHeader: {
        position: "absolute",
        right: "1%",
        width: 180,
        height: 18,
        borderRadius: 50,
        backgroundColor: "#bfc4c8",
        marginTop: 5,
        color: "#000",
        lineHeight: 17,
        textAlign: "center"
    },
    audioButtonStyles: {
        flex: 1,
        justifyContent: "center",
        borderWidth: 0,
        flexDirection: "row",
        borderRadius: 15
    },
    borderIconMicOff: {
        position: "absolute",
        left: "50%",
        width: 25,
        height: 25,
        borderRadius: 15,
        backgroundColor: "#fff",
        borderColor: ColorPalette.darkGrey,
        borderWidth: 1
    },
    borderIconMicOn: {
        position: "absolute",
        left: "50%",
        width: 25,
        height: 25,
        borderRadius: 15,
        backgroundColor: "#f5515f"
    },
    audioButtonStylesIconMuted: {
        ...audioButtonStylesIcon,
        color: ColorPalette.darkGrey,
    },
    audioButtonStylesIconNotMuted: {
        ...audioButtonStylesIcon,
        color: "#fff"
    }
});
