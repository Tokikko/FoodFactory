import React from "react";
import {View, FlatList, StyleSheet} from "react-native";

import MealItem from "./MealItem";
import appColors from "./mainStyle";

class MealList extends React.Component {

    constructor(props) {
        super(props);
        this.listItem = this.listItem.bind(this);
        this.handleClickedChildItem = this.handleClickedChildItem.bind(this);
        
    }

    handleClickedChildItem(item) {
        this.props.clickedMeal(item);
    }

    listItem(category) {
        return <MealItem key={category.item.idCategory} handleClickedMeal={this.handleClickedChildItem} meal={category.item}/>
    }

    render() {
        return (
            <View style={styles.grid}>
                <FlatList
                    data={this.props.categories}
                    renderItem={(category) => this.listItem(category)}
                    numColumns={2}
                    style={styles.list}
                />
            </View>
            );
    }
}

const styles = StyleSheet.create({
    grid: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    list: {
        backgroundColor: appColors.secondaryColor
    }
});
module.exports = MealList;