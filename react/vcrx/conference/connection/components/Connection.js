import React, { Component }             from "react";
import { connect }                      from "react-redux";
import { View }                         from "react-native";
import { saveLogsConnectionQuality }    from "../../../actions";

class Connection extends Component {

    componentDidMount() {
        this.speedTest = setInterval(() => {
            this.props.dispatch(saveLogsConnectionQuality());
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.speedTest);
    }

    render() {
        return (
            <View></View>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Connection);