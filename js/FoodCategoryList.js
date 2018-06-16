import React from "react";
import {View, FlatList, StyleSheet} from "react-native";

import FoodCategoryListItem from "./FoodCategoryListItem";
import appColors from "./mainStyle";

class FoodCategoryList extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.style);
        this.listItem = this.listItem.bind(this);
        this.handleClickedChildItem = this.handleClickedChildItem.bind(this);
        
    }

    handleClickedChildItem(item) {
        this.props.clickedRecepie(item);
    }

    listItem(category) {
        return <FoodCategoryListItem key={category.item.idCategory} handleClickedCategory={this.handleClickedChildItem} category={category.item} />
       
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
module.exports = FoodCategoryList;