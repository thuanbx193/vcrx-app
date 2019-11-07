import React                                from "react";
import { connect }                          from "react-redux";
import styles                               from "./styles";
import {
    View, Platform,
    TouchableOpacity
}                                           from "react-native";
import {ICON}                               from "./../../../constants";
import IconFontAwesome                      from "react-native-vector-icons/FontAwesome";
import VideoPlayer                          from "react-native-video-controls";
import { changeRoomInfo }                   from "../../../actions";

class VideoWarmUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0
        };
    }

    closeVideo = () => {
        this.props.dispatch(changeRoomInfo({playVideo: false, showVideo: false}));
    }

    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
    };

    render(){
        if(!this.props.showVideo){
            return(<View />);
        }
        return(
            <View style={styles.videoBoxVisible}>
                <TouchableOpacity
                    onPress={this.closeVideo}
                    style={styles.btCloseVideo} >
                    <IconFontAwesome name = {ICON.IC_CLOSE} style = {styles.videoClose} />
                </TouchableOpacity>
                <View style={styles.wrapperVideo}>
                    <VideoPlayer
                        disablePlayPause = {true}
                        disableSeekbar   = {true}
                        disableTimer     = {true}
                        disableBack      = {true}
                        disableFullscreen= {true}
                        volume           = {1}
                        currentTime = {Platform.OS === "android" ? this.state.currentTime : 0}
                        onProgress={this.onProgress}
                        paused = {!this.props.playVideo}
                        source={{ uri: this.props.video.replace("http://","https://") }}
                    />
                </View>
            </View>
        );
    }
}

function _mapStateToProps(state) {
    return {
        video               : state["vcrx"].roomInfo.video,
        showVideo           : state["vcrx"].roomInfo.showVideo,
        playVideo           : state["vcrx"].roomInfo.playVideo
    };
}

export default connect(_mapStateToProps)(VideoWarmUp);
