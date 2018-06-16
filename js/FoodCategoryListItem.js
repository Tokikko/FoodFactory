import React from "react";
import {TouchableOpacity, View, Image, Text, StyleSheet, Dimensions} from "react-native";

import appColors from "./mainStyle";

class FoodCategoryListItem extends React.PureComponent {

    constructor(props) {
        super(props);
        //console.log(this.props.category);
        this.clickedListItem = this.clickedListItem.bind(this);
    }

    clickedListItem() {
        console.log("list item clieck");
        this.props.handleClickedCategory(this.props.category);
    }

    render() {
        return (
            <TouchableOpacity style={styles.gridItem}  onPress={this.clickedListItem}>
                <View>
                    <Image 
                        style={styles.imageSize}
                        source={{uri: this.props.category.strCategoryThumb}}
                    />

                    <Text style={styles.gridItemText}>
                        {this.props.category.strCategory}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const width = Dimensions.get("screen").width;
const itemPictureHeight = 130;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gridItem: {
        backgroundColor: appColors.primaryColor,
        margin:2,
        width: width / 2,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        
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
        width: width / 2 - 40,
        height: itemPictureHeight
    }
});

module.exports = FoodCategoryListItem;

/* <Text>
                        {this.props.category.strCategory}
                    </Text>*/