import React from "react";
import {View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions, Animated} from "react-native";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import appColors from "../mainStyle";
import MealDescription from "./MealDescription";
import MealIngridients from "./MealIngridients";
import MealPreparation from "./MealPreparation";

const allScreens = {
    mealDescription: 1,
    mealIngridients: 2,
    mealPreparation: 3
};

let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
let mealId;
const errorMessage = "Error while fetching data";
let mealData;

// Tab screens
const descriptionTab = function display1() {
    return  <MealDescription meal={mealData}/>;
}

const descriptionTab1 = function display2() {
    return  <MealIngridients meal={mealData}/>;
}

const descriptionTab2 = function display3() {
    return  <MealPreparation meal={mealData}/>;
}


class ScreenSwitch extends React.Component {

    constructor(props) {
        super(props);
        mealId = this.props.navigation.getParam('mealId', '0');
        this.state = {
            mealInfo: {},
            index: 0,
            routes: [
                { key: 'first', title: 'Info' },
                { key: 'second', title: 'Ingridients' },
                { key: 'third', title: 'Prepare' },
            ]
        };
        this.fetchMealDetails = this.fetchMealDetails.bind(this);
    }

    componentDidMount() {
        if (mealId == "0"){
            Alert.alert();
        }
        else {
            this.fetchMealDetails();
        }
    }

    fetchMealDetails() {
        fetch(url + mealId).then((data) => {
            return data.json();
        }).then((json) => {
            mealData = json.meals[0];
            this.setState({mealInfo: json.meals[0]});
        }).catch((error) => {
            Alert.alert(error);
            //console.log(error);
        });
    }

    render() {
        if (this.state.mealInfo.strMeal === undefined){
            return (
                <View style={styles.container}>
                    <Text>
                        {"Loading ..."}
                    </Text>
                </View>
            )
        }
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: descriptionTab,
                    second: descriptionTab1,
                    third: descriptionTab2,
                })}
                onIndexChange={index => this.setState({ index })}
                style={styles.tabStyle}
                renderTabBar={props => <TabBar  {...props} indicatorStyle={styles.tabIndicator} 
                    style={styles.tabStyle}/>}>
            </TabView>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: appColors.primaryColor
    },
    tabStyle: {
         width: Dimensions.get('window').width,
         height: 40,
         backgroundColor: appColors.secondaryColor
    },
    tabIndicator: {
        backgroundColor: appColors.activeColor
    }
})
module.exports = ScreenSwitch;