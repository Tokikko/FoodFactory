/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Dimensions,
    TextInput
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

import FoodCategoryList from "./FoodCategoryList";
import MealList from "./MealList";
import ListSearchBox from "./ListSearchBox";
import NavigationTrack from "./NavigationTrack";
import recepiesApi from "./saveLoadRecepies";
import appColors from "./mainStyle";

// meal categories
const  url = "https://www.themealdb.com/api/json/v1/1/categories.php";
// meals by name
const urlMeal = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
// list of meals based on category
const urlMealCategory = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            filteredCategories: [],
            meals: [],
            searchIsActive: false,
        };

        this.fetchRecepies = this.fetchMealCategories.bind(this);
        this.parseRecepiesResponse = this.parseRecepiesResponse.bind(this);
        this.filterList = this.filterList.bind(this);
        this.parseMealResponse = this.parseMealResponse.bind(this);
        this.fetchMeal = this.fetchMealsByName.bind(this);
        this.clickedMeal = this.clickedMeal.bind(this);
        this.clickedRecepie = this.clickedRecepie.bind(this);
        this.loadMyRecepies = this.loadMyRecepies.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
        
    }

    componentDidMount(){
        this.fetchMealCategories();
    }


    clickedRecepie(recepie) {
        //console.log(recepie);
        this.fetchMealsByCategory(recepie.strCategory);
    }

    clickedMeal(meal) {
        // this is temp. since if no meals are found this is placed as a "meal" error
        // should be changed later on
        if (meal.strMeal === "Meal not found"){
            return;
        }
        recepiesApi.saveRecepie(meal);
        this.props.navigation.navigate("ScreenSwitch", {mealId: meal.idMeal});

    }

    parseRecepiesResponse(json) {
        let tmp = [];
        for (let i = 0; i < json.categories.length; i++) {
            let currentCategory = json.categories[i];
            tmp.push(currentCategory);
        }
        this.setState({categories: tmp, filteredCategories : tmp});
    }

    parseMealResponse(json) {
        let tmpMeals = [];
        for (let i = 0; i < json.meals.length; i++){
            let currentMeal = json.meals[i];
            tmpMeals.push(currentMeal);
        }

        this.setState({meals: tmpMeals, searchIsActive: true});
    }

    filterList(searchText) {
        if (searchText.length <= 0) {
            this.setState({filteredCategories: this.state.categories, searchIsActive: false});
        }

        else {
            this.fetchMealsByName(searchText);
        }
    }


    fetchMealsByName(mealName) {
        fetch(urlMeal + mealName).then((data) => {
            return data.json();
        }).then((json) => {
            if (json.meals === null) {
                // add "error" message if not meals have been found
                let tempWork = {
                    meals: [
                        {
                            strMealThumb: "Meal not found",
                            strMeal: "Meal not found"
                        }
                    ]
                };
                 
                this.parseMealResponse(tempWork);
            }
            else {
                this.parseMealResponse(json);
            }
        }).catch((error) => {
            Alert.alert("Errror while looking for recepies");
            
            this.setState({searchIsActive: false});
        });
    }

    fetchMealCategories() {
        fetch(url).then((data) => {
            return data.json();
        }).then((json) => {
            this.parseRecepiesResponse(json);
        }).catch((error) => {
            Alert.alert("Error while retriving data");
            //console.log(error);
        });
    }

    fetchMealsByCategory(categoryName) {
        fetch(urlMealCategory + categoryName).then((data) => {
            return data.json();
        }).then((json) => {
            this.parseMealResponse(json);
        }).catch((error) => {
            Alert.alert("error");
        });
    }

    loadMyRecepies() {
        recepiesApi.loadRecepies().then((value, error) => {
            if (error !== undefined){
                Alert.alert("An error has occured");
            }
            else {
                let savedRecepies = JSON.parse(value);
                this.setState({searchIsActive: true, meals: savedRecepies});
                //Alert.alert(me);
            }
        }).catch((error) => {
            Alert.alert(error);
        });
        
    }

    loadCategories() {
        this.setState({searchIsActive: false, filteredCategories: this.state.categories });
    }
 

    render() {
        if (!this.state.searchIsActive){
            return (
                <View style={styles.container}>
                    <ListSearchBox changedText={this.filterList} style={styles.searchTextInputContainer} />
                    <FoodCategoryList style={styles.list} categories={this.state.filteredCategories} clickedRecepie={this.clickedRecepie}/>
                    <NavigationTrack style={styles.navigationBar} loadCategories={this.loadCategories} loadMyRecepies={this.loadMyRecepies}/>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <ListSearchBox changedText={this.filterList} style={styles.searchTextInputContainer} />
                    <MealList style={styles.list} categories={this.state.meals} clickedMeal={this.clickedMeal}/>
                    <NavigationTrack style={styles.navigationBar} loadCategories={this.loadCategories} loadMyRecepies={this.loadMyRecepies}/>
                </View>
            );
            
        }
    
        
    }
}

const width = Dimensions.get("screen").width;
const searchTextHeight = 50;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: "column"
    },
    searchTextInputContainer: {
        //flex: 1,
        width: width,
        alignItems: 'center',
        height: searchTextHeight,
        backgroundColor: appColors.secondaryColor,
        color: appColors.secondaryColorText,

    },
    navigationBar: {
        height: 290,

        borderColor: "blue"
    },
    list: {
        flex: 0.1,
    }
});

module.exports = Main;

