import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const RecommendScreen = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Detail")}>
                <Text>[Button] (Click me for details)</Text>
            </TouchableOpacity>
            <Text>RecommendScreen</Text>
        </View>
    )
}

RecommendScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})



export default RecommendScreen
