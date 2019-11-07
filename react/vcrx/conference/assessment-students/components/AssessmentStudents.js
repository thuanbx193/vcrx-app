import React, {Component}                   from "react";
import { connect }                          from "react-redux";
import styles                               from "./styles";
import {
    View, TouchableOpacity
}                                           from "react-native";
import FontAwesome                          from "react-native-vector-icons/FontAwesome";
import { Table }                            from "react-native-table-component";
import { Row, Rows }                        from "./Table";
import { changeAssessment }                 from "../../../actions";

class AssessmentStudents extends Component{
    constructor(props){
        super(props);
    }

    componentWillUnmount(){
        this.closeDialog();
    }

    renderListAssessment = () => {
        return(
            <Table style = {styles.assetTable}>
                <View>
                    <Row 
                        data={[
                            this.props._languages.topica.vcrx.assessmentStudent.students,
                            this.props._languages.topica.vcrx.assessmentStudent.pronunciation,
                            this.props._languages.topica.vcrx.assessmentStudent.vocabulary,
                            this.props._languages.topica.vcrx.assessmentStudent.grammar
                        ]}
                        style={styles.headTableAssessment}
                        textStyle={styles.textTableAssessment}
                    />
                    <Rows data={this.props.assessmentStudent.data} style={styles.rowTableAssessment} textStyle={[styles.textTableAssessment,styles.assetmentContent]}/>
                </View>
            </Table>
        );
    }

    closeDialog = () => {
        this.props.dispatch(changeAssessment({ show: false }));
    }

    render() {
        if(!this.props.assessmentStudent.show){
            return(<View/>);
        }
        return(
            <View style={styles.assessmentBoxVisible}>
                <View style={styles.wrappAssissment}>
                    {this.renderListAssessment()}
                    <TouchableOpacity style={styles.btCloseAss} onPress={this.closeDialog}>
                        <FontAwesome name="close" size={15} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export function _mapStateToProps(state) {
    return {
        _languages           : state["vcrx"].languages,
        assessmentStudent    : state["vcrx"].assessmentStudent
    };
}

export default connect(_mapStateToProps)( AssessmentStudents );
