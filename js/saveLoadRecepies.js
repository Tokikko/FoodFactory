import {AsyncStorage, Alert} from  "react-native";

const keyName = "myrecepies";

// TO DO -> fix saving the same recepie multiple times
function saveRecepie(recepie) {
    
    // load already saved items 
    loadRecepies().then((value, error) => {
        if (error !== undefined) {
            Alert.alert("Error while saving");
        }
        else {
            let jArray = [];
            if (value !== null)
                jArray = JSON.parse(value);
            jArray.push(recepie);
            AsyncStorage.setItem(keyName,JSON.stringify(jArray)).then((value, error) => {
                if (error !== undefined) {
                    Alert.alert("Error while saving");
                };
            })
        }
    });

}

function loadRecepies() {
    return AsyncStorage.getItem(keyName);
}


const recepiesApi = {
    loadRecepies: loadRecepies,
    saveRecepie: saveRecepie
};

module.exports = recepiesApi;