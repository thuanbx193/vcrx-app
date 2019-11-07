import React, { Component } from "react";
import { View, ViewPropTypes, Text, StyleSheet, ScrollView } from "react-native";
import { sum } from "../../../utils";

export class Row extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        textStyle: Text.propTypes.style
    };

    render() {
        const { data, style, widthArr, height, flexArr, textStyle, ...props } = this.props;
        let width = widthArr ? sum(widthArr) : 0;

        return data ? (
            <View style={[height && { height }, width && { width }, styles.row, style]}>
                {data.map((item, i) => {
                    const flex = flexArr && flexArr[i];
                    const wth = widthArr && widthArr[i];
                    return <Cell key={i} data={item} width={wth} height={height} flex={flex} textStyle={textStyle} {...props} />;
                })}
            </View>
        ) : null;
    }
}

export class Rows extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        textStyle: Text.propTypes.style
    };

    render() {
        const { data, style, widthArr, heightArr, flexArr, textStyle, ...props } = this.props;
        const flex = flexArr ? sum(flexArr) : 0;
        const width = widthArr ? sum(widthArr) : 0;

        return data ? (
            <View style={[flex && { flex }, width && { width }]}>
                {data.map((item, i) => {
                    const height = heightArr && heightArr[i];
                    return (
                        <Row
                            key={i}
                            data={item}
                            widthArr={widthArr}
                            height={height}
                            flexArr={flexArr}
                            style={style}
                            textStyle={textStyle}
                            {...props}
                        />
                    );
                })}
            </View>
        ) : null;
    }
}

export class Cell extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        textStyle: Text.propTypes.style,
        borderStyle: ViewPropTypes.style
    };

    render() {
        const { data, width, height, flex, style, textStyle, borderStyle, ...props } = this.props;
        const textDom = React.isValidElement(data) ? (
            data
        ) : (
            <Text style={[textStyle, styles.text]} {...props}>
                {data}
            </Text>
        );
        const borderTopWidth = (borderStyle && borderStyle.borderWidth) || 1;
        const borderRightWidth = borderTopWidth;
        const borderColor = (borderStyle && borderStyle.borderColor) || "#000";

        return (
            <View
                style={[
                    {
                        borderTopWidth,
                        borderRightWidth,
                        borderColor
                    },
                    styles.cell,
                    width && { width },
                    height && { height },
                    flex && { flex },
                    !width && !flex && !height && !style && { flex: 1 },
                    style
                ]}
            >
                <ScrollView>
                    {textDom}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        overflow: "hidden"
    },
    cell: { justifyContent: "center" },
    text: { backgroundColor: "transparent" }
});