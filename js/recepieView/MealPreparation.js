import React from "react";
import {ScrollView, View, Text, Dimensions, StyleSheet, WebView} from "react-native";

import appColors from "../mainStyle";

class MealPreparation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasLoaded: false,
            description: this.props.meal.strInstructions,
            youtubeLink: "",
        }
        this.prepareYoutubeLink = this.prepareYoutubeLink.bind(this);
    }

    componentDidMount() {
        this.prepareYoutubeLink();
    }

    // replace watch tag with embed so it can be display inside the app
    // after that mark the state as loading has been finished 
    prepareYoutubeLink() {
        let yt = this.props.meal.strYoutube;yt.replace()
        let replacedyt = yt.replace("watch?=", 'embed/');
        //console.log(replacedyt);
        this.setState({
            hasLoaded: true,
            youtubeLink: replacedyt,
        });
    }
    
    
    render() {
        if (this.state.hasLoaded) {
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            {"How to prepare"}
                        </Text>
                    </View>
                    <ScrollView style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>
                            {this.state.description}
                        </Text>
                    </ScrollView>

                    <View style={styles.youtubeContainer}>
                        <WebView
                            //style={ styles.WebViewContainer }
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            source={{uri: this.state.youtubeLink}}
                        />
                    </View>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Text>
                        {"Loading..."}
                    </Text>
                </View>
            );
           
        }
       
    }
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.primaryColor
    },
    descriptionContainer: {
        width : width,
        height: height / 1.6
    },
    youtubeContainer: {
        width : width,
        height: height / 3
    },
    descriptionText: {
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: appColors.primaryColorText,
    },
    titleText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: appColors.primaryColorText,
        fontSize: 30
    },
    titleContainer: {
         width : width,
         height: height / 10
    }

})

module.exports = MealPreparation;