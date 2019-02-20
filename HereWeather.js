import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, Alert, Button } from 'react-native';
import Weather from "./Weather";
import Spinner from 'react-native-loading-spinner-overlay'
import { getStatusBarHeight } from 'react-native-status-bar-height';


const API_KEY = "056222ceae9bf6dc96aa6c52a14985c6";
const ERROR_LOCATION = "E_LOCATION";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu'
});

export default class HereWeather extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('titleName', "알수 없음"),
        };
    };

    state = {
        isLoading: false,
        error: null,
        temp: null,
        myweather: null,
        spinner: true
    };

    // 날씨 정보 가져오는 API
    _getWeather = (lat, lon) => {
        var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + API_KEY;
        console.log(url);

        this.setState({
            spinner: true
        });

        fetch(url).then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    temp: json.main.temp,
                    myweather: json.weather[0].main,
                    isLoading: true,
                    spinner: false
                })
            });
    };

    componentWillMount() {

    }


    componentDidMount() {
        // this.setState({
        //     spinner: false
        // });

        navigator.geolocation.getCurrentPosition(
            position => {
                this._getWeather(position.coords.latitude, position.coords.longitude);
                // this.setState({
                //   isLoading: true,
                // });
            },
            error => {
                this.setState({
                    error: error
                });
            });
    }

    render() {
        const { isLoading, error, temp, myweather } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar>

                {isLoading ?

                    <View style={{ flex: 1 }}>
                        <Weather temp={Math.floor(temp - 273.15)} nowWeather={myweather}></Weather>
                    </View> :
                    (
                        <View style={styles.loadingView}>
                            <Spinner
                                visible={this.state.spinner}
                                textContent={'날씨정보를 가져오는 중입니다'}
                                textStyle={styles.spinnerText}
                            />
                            {error ?
                                <Text style={styles.errorText}>
                                    {error.code.includes(ERROR_LOCATION) ? '위치정보 설정을 확인해 주세요' + error.code : error.message}
                                </Text> :
                                null}
                        </View>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'center',
        // flexDirection: 'row',
        // flexWrap: "wrap",
        // alignItems: 'center',
    },
    errorText: {
        fontSize: 15,
        flexWrap: 'wrap',
        alignSelf: 'center',
        paddingBottom: 100,
        color: '#f00'
    },

    spinnerText: {
        fontSize: 15,
        flexWrap: 'wrap',

        color: '#000'
    },

    loadingView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
    },

    bottomText: {
        fontSize: 15,
        flexWrap: 'wrap',
        paddingBottom: 100,
        paddingRight: 20,
        marginLeft: 20,
        color: '#c8c8c8'
    }
});
