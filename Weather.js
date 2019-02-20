import React, { Component } from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default Weather;

const weatherDatas = {
    Rain: {
        title: "Rain",
        subtitles: "It's Rainning!",
        icon: "weather-pouring",
        colors: ["#00C6Fb", "#005BEA"]
    },
    Clear: {
        title: "Clear",
        subtitles: "It's Clear!",
        icon: "weather-sunny",
        colors: ["#fef253", "#ff7300"]
    },
    Thunderstorm: {
        title: "Thunderstorm",
        subtitles: "It's thunderstorm!",
        icon: "weather-lightning",
        colors: ["#00ecbc", "#007adf "]
    },
    Clouds: {
        title: "Clouds",
        subtitles: "It's Clouds!",
        icon: "weather-cloudy",
        colors: ["#d7d2cc", "#304352"]
    },

    Snow: {
        title: "Snow",
        subtitles: "It's Snow!",
        icon: "weather-snowy",
        colors: ["#7de2fc", "#b9b625"]
    },

    Drizzle: {
        title: "Drizzle",
        subtitles: "It's Drizzle!",
        icon: "weather-rainy",
        colors: ["#89f7fe", "#66a6ff"]
    },
    Haze: {
        title: "Haze",
        subtitles: "It's Haze!",
        icon: "weather-fog",
        colors: ["#89f7fe", "#66a6ff"]
    },
    Mist: {
        title: "Mist",
        subtitles: "It's Mist!",
        icon: "weather-fog",
        colors: ["#89f7fe", "#66a6ff"]
    },
}
function Weather({ temp, nowWeather }) {
    return (
        <LinearGradient
            colors={weatherDatas[nowWeather].colors}
            style={styles.container}>

            <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar>
            <View style={styles.topIconView}>
                {/* https://expo.github.io/vector-icons/ */}
                <MaterialCommunityIcons color="white" size={144} name={weatherDatas[nowWeather].icon}></MaterialCommunityIcons>
                <Text style={styles.temper}>{temp}도</Text>
            </View>
            <View style={styles.bottomTextView}>
                <Text style={styles.bottomText}>{weatherDatas[nowWeather].subtitles}</Text>
            </View>
        </LinearGradient>
    );
}

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    nowWeather: PropTypes.string.isRequired
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    temper: {
        fontSize: 38,
        flexWrap: 'wrap',
        color: '#eeeeee'
    },
    topIconView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    bottomTextView: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    bottomText: {
        fontSize: 38,
        flexWrap: 'wrap',
        paddingBottom: 100,
        paddingRight: 20,
        marginLeft: 20,
        color: '#fff'
    }
});