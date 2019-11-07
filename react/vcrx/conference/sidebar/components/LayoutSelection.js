/*
    LayoutSelection Component
    Author: DaoNC
    TimeCreated: 05/06/2019
    TimeModified: 05/06/2019
*/
import React, { Component }                 from "react";
import { connect }                          from "react-redux";
import { TouchableOpacity, Text, View }     from "react-native";
import ModalDropdown                        from "react-native-modal-dropdown";
import FontAwesome                          from "react-native-vector-icons/FontAwesome";
import styles                               from "./styles";
import { handleLayout }                     from "../../../actions";

class LayoutSelection extends Component {
    constructor(props) {
        super(props);
    }

    _dropdownLayoutWillShow() {
        this.setState({
            styleMenuLayout: [styles.styleMenuEnable, (this.props.styleMenuBtn || {})]
        });
    }

    _dropdownLayoutWillHide() {
        this.setState({
            styleMenuLayout: [styles.styleMenuDisable, (this.props.styleMenuBtn || {})]
        });
    }

    onSelectLayout = (index, name) => {
        let layout = Number(index);
        this.props.dispatch(handleLayout(layout));
    }

    layoutValue = datas => {
        const result = datas.map((item, key) => (
            <Text style={(this.props._indexLayout === key) ? styles.activeLayout : null}>{item}</Text>
        ));
        return result;
    }

    render() {
        let { layout } = this.props._languages.topica.vcrx;
        let layoutValue = [ layout.defaultlayout, layout.layout2, layout.layout3, layout.layout4 ];
        return (
            <TouchableOpacity>
                <ModalDropdown
                    dropdownStyle={styles.sidebarLayout}
                    dropdownTextStyle={styles.sidebarLayoutText}
                    animated={false}
                    options={this.layoutValue(layoutValue)}
                    onSelect={(index, data) => this.onSelectLayout(index)}
                    onDropdownWillShow={() => this._dropdownLayoutWillShow()}
                    onDropdownWillHide={() => this._dropdownLayoutWillHide()}
                >
                    <View style={styles.styleMenuDisable}>
                        <FontAwesome name="th-large" style={styles.fontAwesomeWarning} />
                    </View>
                </ModalDropdown>
            </TouchableOpacity>
        );
    }
}

function _mapStateToProps(state) {
    return {
        _languages:   state["vcrx"].languages,
        _indexLayout: state["vcrx"].roomInfo.indexLayout
    };
}

export default connect(_mapStateToProps)(LayoutSelection);
