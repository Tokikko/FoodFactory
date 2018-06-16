import React from "react";
import {View, Image, Text, TouchableOpacity, Dimensions, StyleSheet, Linking} from "react-native";

import appColors from "../mainStyle";

class MealDescription extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image 
                        style={styles.imageTag}
                        source={{uri: this.props.meal.strMealThumb}}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.textTagTitle}>
                        {"Food info:"}
                    </Text>
                    <Text style={styles.textTag}>
                        { "Name:    " + this.props.meal.strMeal}
                    </Text>
                        
                    <Text style={styles.textTag}>
                        { "Category:    " + this.props.meal.strCategory}
                    </Text>
                        
                    <Text style={styles.textTag}>
                        { "Origin:    " + this.props.meal.strArea}
                    </Text>

                    <Text style={styles.textTag} onPress={() => Linking.openURL(this.props.meal.strSource)} >
                        { "Link:   " + "More info"}
                    </Text>
                </View>
            </View>
        );
    }
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: appColors.primaryColor
    },
    imageContainer: {
        width : width,
        height: height / 2
    },
    textContainer: {
        width : width,
        height: height / 2
    },
    imageTag: {
        width : width,
        height: height / 2
    },
    textTag: {
        color: appColors.primaryColorText,
        margin: 10,
        textAlign: 'center',
    },
    textTagTitle: {
        color: appColors.primaryColorText,
        margin: 10,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },


})

module.exports = MealDescription;