import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import posed from "react-native-pose";


const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 2;
const SpotLight = posed.View({
    route0: { x: tabWidth / 6},
    route1: { x: tabWidth + tabWidth / 6},
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
        borderRadius: 40,
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
        fontSize: 22,
        color: 'white',
        paddingLeft: 5,
    },
    animationButton: {
        justifyContent: 'center',
    },
    spotLight: {
        width: 0.34333 * windowWidth,
        height: 52,
        backgroundColor: "#E9895D",
        padding: 10,
        borderRadius: 26,
        borderColor: '#BEBEBE',
        borderWidth: 1,
    }
});

export default TabBar
