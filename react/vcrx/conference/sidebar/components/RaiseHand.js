/*
    Room Component
    Author: AnhLH2
    TimeCreated: 27/05/2019
    TimeModified: 27/05/2019
*/
import React                                from "react";
import { connect }                          from "react-redux";
import { translate }                        from "./../../../../features/base/i18n";
import styles                               from "./styles";
import {
    TouchableHighlight
}                                           from "react-native";
import FontAwesome                          from "react-native-vector-icons/FontAwesome";
import {
    getLocalParticipant
}                                           from "../../../../features/base/participants";
import { raiseHand }                        from "../../../actions";

class RaiseHand extends React.Component{

    _raiseHand = () => {
        this.props.dispatch(raiseHand());
    } 

    render(){
        return(
            <TouchableHighlight
                onPress={this._raiseHand}
                style={this.props.participantLocal.raiseHand ? styles.styleMenuEnable: styles.styleMenuDisable}
            >
                <FontAwesome name="hand-paper-o" style={styles.fontAwesomeWarning} />
            </TouchableHighlight>
        );
    }
}

function _mapStateToProps(state) {
    return {
        participantLocal    : getLocalParticipant(state)
    };
}

export default translate(connect(_mapStateToProps)(RaiseHand));