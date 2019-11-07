import { Component }                    from "react";
import { getLocalParticipant }          from "../../../../features/base/participants";

/**
 * Base (abstract) lưu trữ các function file slide.native.js sử dụng.
 *
 * @abstract
 */
export class AbstractSlide extends Component<*, *> {

    constructor(props: Props) {
        super(props);

        this.state = {
            color: "#000",
            page: 1,
            scale: 1,
            numberOfPages: 0,
            horizontal: false,
            drawRefresh : true,
            animate : true,
            loadingNetWork : true,
            loadingComplete: false
        };

        this.draw = this.draw.bind(this);
        this.drawLine = this.drawLine.bind(this);
        this.drawRectangle = this.drawRectangle.bind(this);
        this.drawTriangle = this.drawTriangle.bind(this);
        this.drawPencil = this.drawPencil.bind(this);
        this.drawEllipse = this.drawEllipse.bind(this);
        this.drawClearReact = this.drawClearReact.bind(this);
        this.drawRefresh = this.drawRefresh.bind(this);
        this.clearRect = this.clearRect.bind(this);
        this.onLoadComplete = this.onLoadComplete.bind(this);
    }

    /**
     * @author Tungns4
     * Modified at : 2018/06/17.
     * @param {Object} data - path của nét vẽ.
     * @description:
     *       - Tính tỉ lệ height và width phù hợp với màn hình local.
     *       - Kiểm tra nếu tổn tại thẻ <canvas> thì khởi tạo màn vẽ.
     *       - Kiểm tra loại nét vẽ và gọi đến function tương ứng.
     * @returns
     */
    draw (data){
        let w = this.state.widthCanvas/data.width;
        let h = this.state.heightCanvas/data.height;
        if(this.name){
            const context = this.name.getContext("2d");

            if(data.item.tool == "line"){
                this.drawLine(data,w,h,context);
            }
            if(data.item.tool == "rectangle"){
                this.drawRectangle(data,w,h,context);
            }
            if(data.item.tool == "triangle"){
                this.drawTriangle(data,w,h,context);
            }
            if(data.item.tool == "pencil"){
                this.drawPencil(data,w,h,context);
            }
            if(data.item.tool == "ellipse"){
                this.drawEllipse(data,w,h,context);
            }
            if(data.item.tool == "clearreact"){
                this.drawClearReact(data,w,h,context);
            }
            if(data.item.tool == "text"){
                context.font=data.item.size*this.state.widthCanvas/data.widthCanvas+"px " +data.item.font;
                context.fillStyle=data.item.color;
                context.fillText(data.item.text,data.item.width*this.state.widthCanvas/data.widthCanvas
                    ,data.item.height*this.state.heightCanvas/data.heightCanvas);
            }
        }

    }

    /**
     * Vẽ đường thẳng
     * @author Tungns4
     * Modified at : 2018/06/17.
     * @param {Object} data      - path của nét vẽ.
     * @param {float} w          - tỉ lệ độ rộng của canvas.
     * @param {float} h          - tỉ lệ chiều cao của canvas.
     * @param {Object} context   - tỉ lệ chiều cao của canvas.
     * @description:
     *       - Tính toán vùng nét vẽ chiếm.
     *       - Vẽ đường thẳng
     * @returns
     */
    drawLine(data,w,h,context){
        let endx = data.item.end.x*w;
        let endy = data.item.end.y*h;
        let startx = data.item.start.x*w;
        let starty = data.item.start.y*h;

        context.save();
        context.lineJoin = "round";
        context.lineCap = "round";
        context.beginPath();
        context.lineWidth = data.item.size;
        context.strokeStyle = data.item.color;
        context.globalCompositeOperation = "source-over";
        context.moveTo(startx,starty);
        context.lineTo(endx,endy);
        context.closePath();
        context.stroke();
        context.restore();
    }

    /**
     * Vẽ hình chữ nhật
     * @author Tungns4
     * Modified at : 2018/06/17.
     * @param {Object} data      - path của nét vẽ.
     * @param {float} w          - tỉ lệ độ rộng của canvas.
     * @param {float} h          - tỉ lệ chiều cao của canvas.
     * @param {Object} context   - tỉ lệ chiều cao của canvas.
     * @description:
     *       - Tính toán vùng nét vẽ chiếm.
     *       - Kiểm tra nếu giáo viên chỉ chấm 1 điểm trên canvas thì không vẽ theo
     *       - Kiểm tra hình chữ nhật được kéo về bên phải hay trái
     *       - Vẽ hình chữ nhật
     * @returns
     */
    drawRectangle(data,w,h,context){
        let endx = data.item.end.x*w;
        let endy = data.item.end.y*h;
        let startx = data.item.start.x*w;
        let starty = data.item.start.y*h;
        if(endx != startx){
            const startX = endx < startx ? endx : startx;
            const startY = endy < starty ? endy : starty;
            const widthX = Math.abs(startx - endx);
            const widthY = Math.abs(starty - endy);
            context.beginPath();
            context.lineWidth = data.item.size;
            context.strokeStyle = data.item.color;
            context.rect(startX, startY, widthX, widthY);
            context.stroke();
        }

    }

    /**
     * Vẽ hình tam giác
     * @author Tungns4
     * Modified at : 2018/06/17.
     * @param {Object} data      - path của nét vẽ.
     * @param {float} w          - tỉ lệ độ rộng của canvas.
     * @param {float} h          - tỉ lệ chiều cao của canvas.
     * @param {Object} context   - tỉ lệ chiều cao của canvas.
     * @description:
     *       - Tính toán vùng nét vẽ chiếm.
     *       - Kiểm tra nếu giáo viên chỉ chấm 1 điểm trên canvas thì không vẽ theo
     *       - Vẽ hình tam giác
     * @returns
     */
    drawTriangle(data,w,h,context){
        let endx = data.item.end.x*w;
        let endy = data.item.end.y*h;
        let startx = data.item.start.x*w;
        let starty = data.item.start.y*h;
        if(endx != startx){
            context.beginPath();
            context.lineWidth = data.item.size;
            context.strokeStyle = data.item.color;
            context.lineTo(startx, starty);
            context.lineTo(startx-(endx - startx), endy);
            context.lineTo(endx, endy);
            context.lineTo(startx, starty);
            context.stroke();
        }

    }

    /**
     * Vẽ nét loằng ngoằng
     * @author Tungns4
     * Modified at : 2018/06/17.
     * @param {Object} data      - path của nét vẽ.
     * @param {float} w          - tỉ lệ độ rộng của canvas.
     * @param {float} h          - tỉ lệ chiều cao của canvas.
     * @param {Object} context   - tỉ lệ chiều cao của canvas.
     * @description:
     *       - Tính toán vùng nét vẽ chiếm.
     *       - Kiểm tra nếu giáo viên chỉ chấm 1 điểm trên canvas thì không vẽ theo
     *       - Vẽ nét bút chì
     * @returns
     */
    drawPencil(data,w,h,context){
        let i = 0;
        let j = data.item.points.length;
        startx = data.item.points[0].x*w;
        starty = data.item.points[0].y*h;

        context.lineJoin = "round";
        context.lineCap = "round";
        context.beginPath();
        context.lineWidth = data.item.size;
        context.strokeStyle = data.item.color;
        context.globalCompositeOperation = "source-over";
        context.moveTo(startx, starty);
        for (i, j; i < j; i++) {
            x = data.item.points[i].x*w;
            y = data.item.points[i].y*h;
            context.lineTo(x, y);
        }
        context.stroke();
        context.restore();
    }

    /**
     * Vẽ hình ellipse
     * @author Tungns4
     * Modified at : 2018/06/17.
     * @param {Object} data      - path của nét vẽ.
     * @param {float} w          - tỉ lệ độ rộng của canvas.
     * @param {float} h          - tỉ lệ chiều cao của canvas.
     * @param {Object} context   - tỉ lệ chiều cao của canvas.
     * @description:
     *       - Tính toán vùng nét vẽ chiếm.
     *       - Kiểm tra nếu giáo viên chỉ chấm 1 điểm trên canvas thì không vẽ theo
     *       - Di chuyển con trỏ đến đỉnh của ellipse
     *       - Vẽ 2 đường cong về 2 bên là 2 nửa cùa hình ellipse
     *       - Kết thúc vẽ ellipse
     * @returns
     */
    drawEllipse(data,w,h,context){
        let endx = data.item.end.x*w;
        let endy = data.item.end.y*h;
        let startx = data.item.start.x*w;
        let starty = data.item.start.y*h;
        if(endx != startx){
            let centerX = (endx -startx)/2 + startx;
            let centerY = (endy -starty)/2 + starty;
            let width = endx -startx;
            let height = endy - starty;

            context.beginPath();

            context.moveTo(centerX, centerY - height/2);
            context.lineWidth = data.item.size;
            context.strokeStyle = data.item.color;
            context.bezierCurveTo(
                centerX + width/2+width*1.9/12, centerY - height/2,
                centerX + width/2+width*1.9/12, centerY + height/2,
                centerX, centerY + height/2
            );

            context.bezierCurveTo(
                centerX - width/2 -width*1.9/12, centerY + height/2,
                centerX - width/2-width*1.9/12, centerY - height/2,
                centerX, centerY - height/2
            );
            context.stroke();
            context.closePath();
            context.restore();
        }

    }

    /**
     * Xóa 1 vùng trên màn hình theo hình chữ nhật
     * @author Tungns4
     * Modified at : 2018/06/17.
     * @param {Object} data      - path của nét vẽ.
     * @param {float} w          - tỉ lệ độ rộng của canvas.
     * @param {float} h          - tỉ lệ chiều cao của canvas.
     * @param {Object} context   - tỉ lệ chiều cao của canvas.
     * @description:
     *       - Tính toán vùng nét vẽ chiếm.
     *       - Xóa các phần vẽ bên trong vùng đã chiếm
     * @returns
     */
    drawClearReact (data,w,h,context){
        let endx = data.item.end.x*w;
        let endy = data.item.end.y*h;
        let startx = data.item.start.x*w;
        let starty = data.item.start.y*h;
        const startX = endx < startx ? endx : startx;
        const startY = endy < starty ? endy : starty;
        const widthX = Math.abs(startx - endx);
        const widthY = Math.abs(starty - endy);
        context.clearRect(startX-1,startY-1,widthX+1,widthY+1);
    }

    /**
     * Sự kiện vẽ lại tất cả các nét vẽ trong trang đó
     * @author Tungns4
     * Modified at : 2018/06/17.
     * @param {Array} data      - tất cả path của các nét vẽ.
     * @description:
     *       - Bỏ hình loading
     *       - for array và gọi hàm draw truyền vào path của nét vẽ
     * @returns
     */
    drawRefresh (data){
        this.setState({ loadingNetWork : false});
        let a = 0;
        let b = data.dataItem.length;
        for (a, b; a < b; a++) {
            this.draw(data.dataItem[a]);
        }
    }

    /**
     * Sự kiện xóa tất cả nét vẽ
     * @author Tungns4
     * Modified at : 2018/06/17.
     * @description:
     *       - Xóa tất cả các nét vẽ trong trang hiện tại
     * @returns
     */
    clearRect(){
        if(this.name){
            const context = this.name.getContext("2d");
            context.clearRect(0,0,5000,5000);
        }

    }
}

export function _mapStateToProps(state: Object) {
    return {
        _linkSlide                  : state["vcrx"].roomInfo.slide,
        _userInfo                   : state["vcrx"].userInfo,
        _roomId                     : state["features/base/conference"].room,
        _indexLayout                : state["vcrx"].roomInfo.indexLayout,
        _roomVcrx                   : state["vcrx"].roomInfo.idRoomVcrx,
        _token                      : state["vcrx"].userInfo.tokenAPI,
        _languages                  : state["vcrx"].languages,
        _idLocalParticipant         : getLocalParticipant(state).id
    };
}
