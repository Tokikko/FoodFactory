import React from "react";
import {View, Text, Dimensions, StyleSheet, ScrollView} from "react-native";

import appColors from "../mainStyle";
class MealIngridients extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ingridientsText: ""
        };
        this.parseIngridientsToText = this.parseIngridientsToText.bind(this);
    }

    componentDidMount() {
        this.parseIngridientsToText();
    }

    parseIngridientsToText() {
        let ingridientsFullText = "";
        let ingridientPropName = "strIngredient";
        let ingridientMeasurePropName = "strMeasure";
        // according to api, this is the max number of ingridients
        const maxIngridients = 20;
        for (let i = 1; i < maxIngridients; i++) {
            // if current ingridient proprety is an empty string, it means there are no more ingridients
            if (this.props.meal[ingridientPropName + i] ==="") {
                break;
            }
            
            let ingridient = this.props.meal[ingridientPropName + i];
            let ingridientMeasure = " - " + this.props.meal[ingridientMeasurePropName + i] + "\n";
            ingridientsFullText += ingridient + ingridientMeasure;
            
        }

        this.setState({ingridientsText: ingridientsFullText});
    }

    render() {
        return (
            <ScrollView  style={styles.container}>
                <View>
                    <View style={styles.textTitleContainer}>
                        <Text style={styles.textTitle}>
                            {"<<<Ingridients>>>"}
                        </Text>
                    </View>

                    <View style={styles.textIngridientsContainer}>
                        <Text style={styles.textIngridients}>
                            {this.state.ingridientsText}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.primaryColor
    },
    textTitleContainer: {

    },
    textIngridientsContainer: {

    },
    textTitle: {
        margin: 10,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: appColors.primaryColorText
    },
    textIngridients: {
        marginTop: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: appColors.primaryColorText,
        lineHeight: 30
    }
})

module.exports = MealIngridients;