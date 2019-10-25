import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Item from '../components/Item'

const RecommendScreen = (props) => {
    const goDetail = () => {
        props.navigation.navigate("Detail")
    }

    // Quick VIEW for develop Front-end
    // goDetail()

    return (
        <View style={styles.container}>
            <Item title="Ice Cream Cupcake" vote={4.9} shop="Kem Baskin Robbins" isLove={true} price={30} image={require('../assets/images/DemoImage1.jpg')} onPressItem={() => goDetail()} />
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
