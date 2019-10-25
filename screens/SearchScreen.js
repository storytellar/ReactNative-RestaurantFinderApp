import React from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Dimensions } from 'react-native'

const windowWidth = Dimensions.get("window").width;

const SearchScreen = (props) => {
    const [value, onChangeText] = React.useState('');


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Everythings that you need!
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder = "The coffee house..." 
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
            </View>
        </SafeAreaView>
    )
}

SearchScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        marginTop: 30,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#E9895D',
        width: 256,
        letterSpacing: 2.69,
    },
    input: {
        marginTop: 20,
        width: 340,
        height: 60,
        borderColor: 'gray',
        borderRadius: 18,
        backgroundColor: 'white',
        paddingLeft: 15,

        fontSize: 18,
        fontWeight: '400',
        color: '#3C3D47',

        shadowColor: "#D8BCA8",
        shadowOffset: {
            width: -2,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 10,

        elevation: 7,
    }
})

export default SearchScreen
