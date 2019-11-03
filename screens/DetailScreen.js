import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native'

import IconHeart from '../assets/svg/heart.svg'
import IconLeft from '../assets/svg/left.svg'
import IconCheckin from '../assets/svg/checkin.svg'
import IconOffer from '../assets/svg/offer.svg'

import Item from '../components/Item'
import { ScrollView } from 'react-native-gesture-handler'

const windowWidth = Dimensions.get("window").width;

const DetailScreen = (props) => {
    return (
        <View style={styles.container}>
            {/* ImageBox */}
            <View style={styles.ImageBox}>
                <Image style={styles.bigPhoto} source={require('../assets/images/DemoImage1.jpg')} />
            </View>

            {/* InfoBox */}
            <View style={styles.InfoBox}>
                <View style={styles.shopMainInfo}>
                    <Text style={styles.ShopName}>Otoké Chicken</Text>
                    <View style={styles.shopInfo}>
                        <View style={styles.rowDirection}>
                            <IconCheckin width={26} height={26} fill={'#D8B05E'} />
                            <Text style={styles.miniText}>Quận 5, TP. Hồ Chí Minh</Text>
                        </View>
                        <View style={styles.rowDirection}>
                            <IconOffer width={26} height={26} fill={'#D8B05E'} />
                            <Text style={styles.miniText}>Hoàn tiền 10% từ MOMO</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.shopAdditionalInfo}>
                    <ScrollView contentContainerStyle={styles.centerAll} showsVerticalScrollIndicator={false}>
                        <Text style={styles.description}>
                            Otoké trong tiếng Hàn Quốc nghĩa là «Wow» hay «Làm sao đây?»
                            Và đó cũng chính là cảm giác mà chúng tôi muốn mang đến cho người yêu ẩm thực khi thưởng thức món gà rán trứ danh.
                        </Text>
                        <View>
                            <Item title="Đùi gà siêu giòn" vote={4.9} shop="Otoké Chicken" isLove={true} price={30} image={require('../assets/images/DemoImage1.jpg')} />
                            <Item title="Cơm cánh gà rán" vote={4.9} shop="Otoké Chicken" isLove={false} price={45} image={require('../assets/images/DemoImage1.jpg')} />
                        </View>
                    </ScrollView>
                </View>
            </View>

            {/* FavoriteBox */}
            <View style={styles.FavoriteBox}>
                <IconHeart width={36} height={36} fill={props.isLove ? '#F66767' : '#545454'} />
            </View>

            {/* GoBackBox */}
            <View style={styles.GoBackBox}>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}>
                    <View style={styles.GoBackButton}>
                        <IconLeft width={26} height={26} fill={'#545454'} />
                    </View>
                </TouchableOpacity>
            </View>

            {/* OrderButtonBox */}
            <View style={styles.OrderButtonBox}>
                <TouchableOpacity onPress={() => alert('Call 19001009')}>
                    <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
                        Table now !
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImageBox: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '55%',
    },
    bigPhoto: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    InfoBox: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '55%',
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderWidth: 1,
        borderColor: '#979797',
    },
    shopMainInfo: {
        flex: 0.3,
        paddingTop: 50,
        paddingLeft: 50,
        justifyContent: 'space-between',
    },
    shopAdditionalInfo: {
        flex: 0.55,
        paddingTop: 20,
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#3C3D46',
        paddingHorizontal: 50,
        paddingBottom: 10,
    },
    shopInfo: {
        flexGrow: 0.7,
        justifyContent: 'flex-end'
    },
    rowDirection: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    ShopName: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#3C3D46'
    },
    miniText: {
        color: '#D6AC56',
        fontSize: 16,
        fontWeight: '400',
        paddingLeft: 5,
    },
    FavoriteBox: {
        position: 'relative',
        top: -45,
        left: -120,
        width: 73,
        height: 73,
        borderRadius: 36.5,
        borderWidth: 1,
        borderColor: '#979797',
        backgroundColor: 'white',

        alignItems: 'center',
        justifyContent: 'center',
    },
    GoBackBox: {
        position: 'absolute',
        top: 50,
        left: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#545454',
        backgroundColor: 'white',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
    },
    GoBackButton: {
        width: 45,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    OrderButtonBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '8%',
        backgroundColor: '#E9895D',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        // borderBottomRightRadius: 40,
        // borderBottmLeftRadius: 40,
        // borderRadius: 40,

        alignItems: 'center',
        justifyContent: 'center',
    },
    centerAll: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

DetailScreen.navigationOptions = {
    header: null,
};

export default DetailScreen
