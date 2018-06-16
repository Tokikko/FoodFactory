import React from "react";
import {Text, Image, View, TouchableOpacity, Dimensions, StyleSheet} from "react-native";

import appColors from "./mainStyle";

class MealItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClickedMeal = this.handleClickedMeal.bind(this);
    }

    handleClickedMeal() {
        this.props.handleClickedMeal(this.props.meal);
    }

    render() {
         return (
            <TouchableOpacity style={styles.gridItem}  onPress={this.handleClickedMeal}>
                <View>
                    <Image 
                        style={styles.imageSize}
                        source={{uri: this.props.meal.strMealThumb}}
                    />

                    <Text style={styles.gridItemText}>
                        {this.props.meal.strMeal}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const width = Dimensions.get("screen").width;
const itemPictureHeight = 160;
const styles = StyleSheet.create({
    gridItem: {
        backgroundColor: appColors.primaryColor,
        marginRight: 2,
        width: width / 2,
        height: 200,
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    gridItemImage: {
        textAlign: 'center',
    },
    gridItemText: {
        color: appColors.primaryColorText,
        justifyContent: 'center',
        textAlign: 'center',
    },
    imageSize: {
        width: width / 2,
        height: itemPictureHeight
    }
});

module.exports = MealItem;