/*
    LayoutSelection Component
    Author: DaoNC
    TimeCreated: 05/06/2019
    TimeModified: 05/06/2019
*/
import React, {Component}                       from "react";
import { connect }                              from "react-redux";
import { TouchableHighlight, Alert }            from "react-native";
import FontAwesome                              from "react-native-vector-icons/FontAwesome";
import styles                                   from "./styles";
import { exitClass, handleLayout }              from "../../../actions";
import {ACTION_LOG_OUT}                         from "../../../constants";

class LogOut extends Component {
    constructor(props) {
        super(props);
    }

    _logOut = () => {
        Alert.alert(
            this.props._languages.topica.vcrx.error.notification,
            this.props._languages.topica.vcrx.layout.get_out,
            [{text: this.props._languages.topica.vcrx.layout.logout, onPress: () => {
                this.props.dispatch(handleLayout(0));
                this.props.dispatch(exitClass(ACTION_LOG_OUT));
            }},
            {text: this.props._languages.topica.vcrx.layout.cancel, style: "cancel"}],
            { cancelable: false }
        );
    }
    render() {
        return (
            <TouchableHighlight
                onPress = {this._logOut}
                style={styles.styleMenuDisable}>
                <FontAwesome name="sign-out" style={styles.fontAwesomeWarning} />
            </TouchableHighlight>
        );
    }
}

function _mapStateToProps(state) {
    return {
        _languages: state["vcrx"].languages,
    };
}

export default connect(_mapStateToProps)(LogOut);
