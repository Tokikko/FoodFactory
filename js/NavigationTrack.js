import React from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, StyleSheet} from "react-native";

import appColors from "./mainStyle";
import recepiesApi from "./saveLoadRecepies";
class NavigationTrack extends React.PureComponent {

    constructor(props) {
        super(props);
        this.loadMyRecepies = this.loadMyRecepies.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
    }

    loadMyRecepies() {
        this.props.loadMyRecepies();
    }

    loadCategories() {
        this.props.loadCategories();
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.buttonAll} onPress={this.loadCategories}>
                    <Text style={styles.buttonText}>
                        {"Recepies"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMy} onPress={this.loadMyRecepies}>
                    <Text style={styles.buttonText}>
                        {"My Recepies"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const width = Dimensions.get("screen").width;
const height = 50;


let styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: appColors.activeColor,
        flexDirection: "row",
    },
    buttonAll: {
        backgroundColor: appColors.activeColor,
        flex: 1,
        height: 40,
        justifyContent: 'center', 
        alignItems: 'center',
        borderColor: "blue"
    },
    buttonMy: {
        backgroundColor: appColors.activeColor,
        flex: 1,
        height: 40,
        justifyContent: 'center', 
        alignItems: 'center',

        borderColor: "blue"
    },
    buttonText: {
        color: appColors.activeColorText,
    }
})

module.exports = NavigationTrack;