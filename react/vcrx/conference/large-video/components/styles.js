import {
    createStyleSheet,
} from "./../../../../features/base/styles";

export default createStyleSheet({
    // The style of the avatar of the participant displayed in largeVideo. It"s
    // an addition to the default style of Avatar.
    avatar: {
        width:40, 
        justifyContent: "center", 
	    alignItems: "center",
    },
    // Large video container style.
    largeVideo: {
        flex:1,
        justifyContent: "center",
        alignItems: "stretch",
        position: "absolute",
        backgroundColor: "rgba(255,255,255,1)",
        bottom: 0,     
        left: 0,
        right:0,
        top: 0,
        justifyContent: "center",
        borderRadius: 5,
        padding: 2
    }
});
