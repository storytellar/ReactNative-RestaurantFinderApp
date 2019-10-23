import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

const SearchScreen = (props) => {
    const [value, onChangeText] = React.useState('Useless Placeholder');


    return (
        <View style={styles.container}>
            <Text>SearchScreen</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Detail")}>
                <Text>(Click me for details)</Text>
            </TouchableOpacity>
        </View>
    )
}

SearchScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default SearchScreen
