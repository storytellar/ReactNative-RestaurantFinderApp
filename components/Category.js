import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import IconBeer from '../assets/svg/beer.svg'

const Category = (props) => {
    const { name } = props;
    return (
        <View>
            <View style={styles.categoryItem}>
                <View style={styles.circle}>
                    <IconBeer width={23} height={27} fill={'#3C3D47'} />
                </View>
                <Text style={styles.text}>{name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryItem: {
        height: 85,
        width: 56,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    circle: {
        height: 56,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#D6D6D6',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        color: '#3C3D47'
    }
})


export default Category
