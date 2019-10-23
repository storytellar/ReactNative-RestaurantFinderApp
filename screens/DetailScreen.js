import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const DetailScreen = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}><Text>(Click me to back)</Text></TouchableOpacity>
            <Text>Details......</Text>
            <Text>Details......</Text>
            <Text>Details......</Text>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

DetailScreen.navigationOptions = {
    header: null,
};

//#region HIDE BOTTOM TAB BAR
// RecommendStack.navigationOptions.tabBarVisible = false;



export default DetailScreen
