import React                                    from "react";
import { connect }                              from "react-redux";
import { LoadingIndicator }                     from "../../../../features/base/react";
import { View ,Dimensions, Alert, Linking }     from "react-native";
import Pdf                                      from "react-native-pdf";
import Canvas                                   from "react-native-canvas";
import styles                                   from "./styles";
import { AbstractSlide ,_mapStateToProps }      from "./AbstractSlide";
import { API_SET_LOG_IN_OUT }                   from "../../../config";
import {
    handleAddLogSlide,
    saveLogAction,
    saveLogError
}                                               from "../../../actions";
import {
    ACTION_LOG_LOAD_SLIDE,
    LOG_ERROR_SLIDE,
    MOBILE_SYSTEM, SYSTEM
} from "../../../constants";

var instateThis;

/**
 * Render slide trong lớp học
 * @author Tungns4
 */
class Slide extends AbstractSlide {
    constructor(props) {
        super(props);

        instateThis = this;

        this.pdf = null;

        // Nhận sự kiện server hỏi thông tin người vừa kết nối
        instateThis.props.socket.on("whoConnected", function (data){
            let datasend = {
                roomId : instateThis.props._roomId,
                userName : instateThis.props._userInfo.firstname + " " + instateThis.props._userInfo.lastname,
                userId : instateThis.props._userInfo.id,
                mobile : 1,
                path : API_SET_LOG_IN_OUT,
                roomIdvcrx : instateThis.props._roomVcrx,
                participantId :instateThis.props._userInfo.participantid ,
                token : instateThis.props._token
            };
            let dataJoin = {
                userid      : instateThis.props._userInfo.id,
                roomid      : instateThis.props._roomId,
                role        : instateThis.props._userInfo.role,
                fullname    : instateThis.props._userInfo.username,
                vcrxroomid  : instateThis.props._roomVcrx,
                vcrxuserid  : instateThis.props._userInfo.participantid,
                tokenApi    : instateThis.props._token,
                device      : MOBILE_SYSTEM,
                system      : SYSTEM
            };
            instateThis.props.socket.emit("joinRoomInMobile",datasend);
            instateThis.props.socket.emit("user-join", dataJoin);
        });

        // Nhận sự kiện vẽ
        instateThis.props.socket.on("drawlineAndRectangleWeb", function (data) {
            instateThis.draw(data);
        });

        // Nhận sự kiện vẽ
        instateThis.props.socket.on("drawPencilWeb", function (data) {
            instateThis.draw(data);
        });

        // Nhận sự kiện vẽ
        instateThis.props.socket.on("drawEllipseWeb", function (data) {
            instateThis.draw(data);
        });

        // Nhận sự kiện vẽ
        instateThis.props.socket.on("clearReactWeb", function (data) {
            instateThis.draw(data);
        });

        // Nhận sự kiện next slide
        instateThis.props.socket.on("nextSlide", function (data) {
            instateThis.setState({drawRefresh : true});
            if(data > instateThis.numberOfPages){
                // return;
            }else{
                instateThis.clearRect();
                instateThis.setState({ page: data });
            }
        });

        // Nhận sự kiện prev slide
        instateThis.props.socket.on("backSlide", function (data) {
            instateThis.setState({drawRefresh : true});
            instateThis.clearRect();
            instateThis.setState({ page: data });
        });
        // Nhận sự kiện xóa sạch nét vẽ ở trang hiện tại
        instateThis.props.socket.on("clearCanvas", function (data){
            instateThis.clearRect();
        });

        // Nhận sự kiện viết chữ
        instateThis.props.socket.on("drawText",(data)=>{
            instateThis.draw(data);
        });

        instateThis.props.socket.on("upSlide", (data)=>{
            // this.props.dispatch(setLinkSlide(data));
        });
    }


    onError= (err,loadFromSource,source) => () =>{
        if (!this.state.loadingComplete && err){
            let dataError = {
                userId  : instateThis.props._userInfo.id,
                roomId  : instateThis.props._roomId,
                link    : source,
                msg     : err.message
            };
            this.props.dispatch(saveLogError(dataError, LOG_ERROR_SLIDE));
            this.props.dispatch(handleAddLogSlide(err.message, this.props._linkSlide));
        }
    }

    componentWillMount(){
        this.setState({
            startTime: new Date().getTime()
        });
    }

    componentDidMount() {
        /**
         * Nhận sự kiện vẽ lại toàn bộ nét vẽ hiện tại trên trang hiện tại từ server
         * @author Tungns4
         * Modified at : 2018/06/17.
         * @param {array} data      - tất cả nét vẽ của trang hiện tại
         * @description:
         *       - Xóa hết nét vẽ trên thẻ canvas
         *       - Set trạng thái được phép refresh vẽ
         *       - Nếu trạng thái được phép refresh vẽ thì gọi function drawRefresh
         *       - Set trạng thái không được refresh vẽ
         * @returns
         */

        instateThis.props.socket.on("drawRefresh", function (data) {
            instateThis.clearRect();
            instateThis.setState({ drawRefresh : true});
            if(instateThis.state.drawRefresh == true){
                instateThis.drawRefresh(data);
                instateThis.setState({ page: data.page });
                instateThis.setState({ drawRefresh : false});
            }
        });
    }

    setLogLoadSlide(filePath){
        let data = {
            userId      : this.props._userInfo.id,
            roomId      : this.props._roomId,
            timeLoad    : new Date().getTime() - this.state.startTime,
            linkSlide   : filePath
        };
        this.props.dispatch(saveLogAction(data, ACTION_LOG_LOAD_SLIDE));
    }

    /**
     * Sự kiện pdf load thành công
     * @author Tungns4
     * Modified at : 2018/06/17.
     * @param {number} numberOfPages - tổng số trang của slide
     * @param {Object} filePath      - dữ liệu của pdf
     * @description:
     *       - Set tổng số trang và state
     *       - Đợi 100 mini giây rồi mới thực hiện
     *       - Tính toán height, width và căn lề trên, trái cùa pdf sau đó gán cho canvas
     *       - Bắn sự kiện có học viên join vào lớp trên app lên server socket để connect vào room vẽ
     * @returns
     */
    onLoadComplete (numberOfPages, filePath) {
        this.setLogLoadSlide(filePath);
        this.setState({loadingComplete: true});
        this.state.numberOfPages = numberOfPages;
        setTimeout(() => {
            let data = {
                roomId : this.props._roomId,
                userName : this.props._userInfo.firstname + " " + this.props._userInfo.lastname,
                userId : this.props._userInfo.id,
                mobile : 1,
                path : API_SET_LOG_IN_OUT,
                roomIdvcrx : instateThis.props._roomVcrx,
                participantId :instateThis.props._userInfo.participantid ,
                token : instateThis.props._token
            };
            instateThis.props.socket.emit("joinRoomInMobile",data);
        }, 200);
    }

    measureView(event) {
        if(event.nativeEvent.layout.width/1.3338 > event.nativeEvent.layout.height){
            this.setState({
                horizontal:false,
                leftCanvas: (event.nativeEvent.layout.width - event.nativeEvent.layout.height*1.3338)/2,
                topCanvas: 1,
                widthCanvas: event.nativeEvent.layout.height* 1.3338,
                heightCanvas: event.nativeEvent.layout.height
            });
            if( instateThis.name.height !=  event.nativeEvent.layout.height)
                instateThis.name.height  =  event.nativeEvent.layout.height;
            if( instateThis.name.width  !=  event.nativeEvent.layout.height *1.3338)
                instateThis.name.width   =  event.nativeEvent.layout.height *1.3338;
        }else{
            this.setState({
                horizontal:true,
                leftCanvas: 0,
                topCanvas: (event.nativeEvent.layout.height - event.nativeEvent.layout.width/1.3338 )/2,
                widthCanvas: event.nativeEvent.layout.width,
                heightCanvas: event.nativeEvent.layout.width/1.3338
            });
            if( instateThis.name.height !=  event.nativeEvent.layout.width/1.3338)
                instateThis.name.height  =  event.nativeEvent.layout.width/1.3338;
            if( instateThis.name.width  !=  event.nativeEvent.layout.width)
                instateThis.name.width   =  event.nativeEvent.layout.width;
        }
    }

    render() {
        var urlSlide = instateThis.props._linkSlide ? instateThis.props._linkSlide.replace("http://","https://") : instateThis.props._linkSlide;;
        let source = { uri: urlSlide, cache: false };
        return (
            <View style={ styles.sildeLayout }>
                {/**
                 * Render canvas
                 * @author Tungns4
                 * Modified at : 2018/06/17.
                 */}
                <View style={{
                    flex: 1,
                    zIndex          : 10000,
                    backgroundColor : "rgba(0,0,0,0)",
                    width           : this.state.widthCanvas,
                    height          : this.state.heightCanvas,
                    position        : "absolute",
                    top             : this.state.topCanvas,
                    left            : this.state.leftCanvas,
                }}>
                    <Canvas
                        ref={a => this.name = a}
                        style={{flex:1,
                            backgroundColor : "rgba(0,0,0,0)",
                            width           : this.state.widthCanvas,
                            height          : this.state.heightCanvas,
                            position        : "absolute", }}
                    />
                </View>
                {
                    /**
                     * Render màn loading khi chưa load được pdf
                     * @author Tungns4
                     * Modified at : 2018/06/17.
                     */
                    this.state.loadingNetWork == true &&
                    <View style={ styles.sildeLoading }>
                        <LoadingIndicator color={"#fff"} />
                    </View>
                }
                <View style={{ flex: 1 }} pointerEvents="none">
                    {/**
                     * Render pdf
                     * @author Tungns4
                     * Modified at : 2018/06/17.
                     */}
                    <Pdf ref={(pdf) => {
                        this.pdf = pdf;
                    }}
                    source={source}
                    onLayout={(event) => this.measureView(event)}
                    page={this.state.page}
                    scale={this.state.scale}
                    horizontal={this.state.horizontal}
                    onLoadComplete={(numberOfPages, filePath) => instateThis.onLoadComplete(numberOfPages, filePath)}
                    onPageChanged={(page, numberOfPages) => {
                        this.state.page = page;
                    }}
                    onError = {(err,loadFromSource)=>
                        setTimeout(this.onError(err,loadFromSource,source),3000)
                    }
                    message = {{title: this.props._languages.topica.lms.login.title, content: this.props._languages.topica.vcrx.error.slide_error}}
                    style={styles.pdf} 
                    />
                </View>
            </View>
        );
    }
}

export default connect( _mapStateToProps )( Slide );
