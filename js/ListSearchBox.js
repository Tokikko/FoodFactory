import React from "react";
import {View, TextInput, Image, StyleSheet} from "react-native";

import appColors from "./mainStyle";
class ListSearchBox extends React.PureComponent {

    constructor(props) {
        super(props);
        this.processSearchInput = this.processSearchInput.bind(this);
    }

    processSearchInput(e) {
        this.props.changedText(e);
    }

    render() {
        console.log("R#NDER");
        return (
            <View>
                <TextInput style={this.props.style}
                    onChangeText={this.processSearchInput}
                    placeholder={"Enter meal name..."}
                    underlineColorAndroid={appColors.activeColor}
                    placeholderTextColor={appColors.activeColorText}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    textInputContainer: {

    }
})

module.exports = ListSearchBox;