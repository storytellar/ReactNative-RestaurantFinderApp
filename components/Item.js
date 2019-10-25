import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'

import IconShop from '../assets/svg/shop.svg'
import IconHeart from '../assets/svg/heart.svg'
import IconStar from '../assets/svg/star.svg'

const Item = (props) => {
    const { title, vote, shop, isLove, price, image, onPressItem } = props;
    return (
        <View style={styles.border}>
            <TouchableOpacity onPress={onPressItem}>
                <View style={styles.container}>
                    <View style={styles.mainInfo}>
                        <View style={styles.itemPhoto}>
                            <Image style={styles.image} source={image} />
                        </View>
                        <View style={styles.midInfo}>
                            <View><Text style={styles.itemTitle}>{title}</Text></View>
                            <View style={styles.itemVote}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View><IconStar width={14} height={14} /></View>
                                    <View style={{ paddingLeft: 3 }}><IconStar width={14} height={14} /></View>
                                    <View style={{ paddingLeft: 3 }}><IconStar width={14} height={14} /></View>
                                    <View style={{ paddingLeft: 3 }}><IconStar width={14} height={14} /></View>
                                    <View style={{ paddingLeft: 3 }}><IconStar width={14} height={14} /></View>
                                    <Text style={{ paddingLeft: 5 }}>{vote}</Text>
                                </View>
                            </View>
                            <View style={styles.itemShop}>
                                <IconShop width={25} height={22} fill={'#8B8B8B'} />
                                <Text style={styles.shopName}>{shop}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rightInfo}>
                        <View><IconHeart width={25} height={22} fill={isLove ? '#F66767' : '#B9B9B9'} /></View>
                        <View><Text style={styles.price}>{price}k</Text></View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

function roundHalf(num) {
    return Math.round(num * 2) / 2;
}

const styles = StyleSheet.create({
    border: {
        marginVertical: 10,

        width: 340,
        height: 100,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        elevation: 8,

        backgroundColor: 'white'
    },
    container: {
        // backgroundColor: 'red',
        width: 320,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    midInfo: {
        paddingLeft: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3C3D47'
    },
    itemVote: {
        paddingVertical: 4,
    },
    itemShop: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    shopName: {
        paddingLeft: 3,
        fontSize: 14,
        color: '#8B8B8B'
    },
    itemPhoto: {
        width: 80,
        height: 80,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8,
    },
    rightInfo: {
        height: 70,
        justifyContent: 'space-between'
    },
    price: {
        fontSize: 14,
        color: '#CF9331'
    }
})


export default Item
