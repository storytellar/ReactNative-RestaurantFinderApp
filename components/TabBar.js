import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import posed from "react-native-pose";


const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 2;
const SpotLight = posed.View({
    route0: { x: tabWidth/20},
    route1: { x: tabWidth /2 + (tabWidth * 10 + 800) / 60 },
    route2: { x: tabWidth + tabWidth /3 + tabWidth/15 },
});


const TabBar = (props) => {
    const {
        renderIcon,
        getLabelText,
        activeTintColor,
        inactiveTintColor,
        onTabPress,
        onTabLongPress,
        getAccessibilityLabel,
        navigation
    } = props;

    const { routes, index: activeRouteIndex } = navigation.state;

    return (
        <View style={S.container}>
            <View style={[StyleSheet.absoluteFillObject, S.animationButton]}>
                <SpotLight style={S.spotLight} pose={`route${activeRouteIndex}`} />
            </View>
            {routes.map((route, routeIndex) => {
                const isRouteActive = routeIndex === activeRouteIndex;
                const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

                return (
                    <TouchableOpacity
                        key={routeIndex}
                        style={S.tabButton}
                        onPress={() => {
                            onTabPress({ route });
                        }}
                        onLongPress={() => {
                            onTabLongPress({ route });
                        }}
                        accessibilityLabel={getAccessibilityLabel({ route })}
                    >
                        {/* <View style={isRouteActive ? S.selectedTab : { flexDirection: 'row' }} pose={`route${activeRouteIndex}`}>
                        </View> */}
                        <View style={S.selectedTab} pose={`route${activeRouteIndex}`}>
                            {renderIcon({ route, focused: isRouteActive, tintColor })}
                            <TabText name={getLabelText({ route })} status={isRouteActive} />
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const TabText = (props) => {
    const { name, status } = props;
    if (status)
        return (
            <View>
                <Text style={S.buttonText}>{name}</Text>
            </View>
        )
    return <View />
}

const S = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 80,
        elevation: 2,
        // borderRadius: 40,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        backgroundColor: 'white'
    },
    tabButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedTab: {
        width: 143,
        height: 52,
        flexDirection: 'row',
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        paddingLeft: 5,
    },
    animationButton: {
        justifyContent: 'center',
    },
    spotLight: {
        width: 0.28 * windowWidth,
        height: 52,
        backgroundColor: "#E9895D",
        // paddingVertical: 10,
        borderRadius: 18,
        borderColor: '#BEBEBE',
        borderWidth: 1,
    }
});

export default TabBar
