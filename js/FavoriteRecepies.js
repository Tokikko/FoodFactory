import React from "react";
import {View, Text, Button} from "react-native";

//import { createStackNavigator } from 'react-navigation';


class FavoriteRecepies extends React.Component {

    render() {
        return (
            <View>
                <Text>
                    {"Navigation test"}
                </Text>
                <Button
                    title="Go to Main"
                    //onPress={() => this.props.navigation.navigate('Main')}
                />
            </View>
        );
    }
}

module.exports = FavoriteRecepies;