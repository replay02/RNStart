import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableHighlight, View, StatusBar, Button } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import HereWeather from './HereWeather';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu'
});



export default class Main extends Component {
    static navigationOptions = {
        title: '메인',
    };

    _goCurrentWhetherScene = () => {

        this.props.navigation.navigate('HereWeather', { titleName: '현재 이곳 날씨' });
    }

    _goGridViewScene = () => {

        this.props.navigation.navigate('ImageGrid', { titleName: '이미지 그리드' });
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar>

                <View style={styles.container}>

                    <TouchableHighlight
                        style={{
                            height: 40,
                            borderRadius: 10,
                            backgroundColor: "transparent",
                            marginLeft: 50,
                            marginRight: 50,
                            marginTop: 20
                        }}>
                        <Button style={styles.buttonStyle}
                            onPress={this._goCurrentWhetherScene}
                            title="현재 위치 날씨"
                            color="#418cff"
                            accessibilityLabel="현재 위치 날씨를 알수 있습니다"
                        />
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{
                            height: 40,
                            borderRadius: 10,
                            backgroundColor: "transparent",
                            marginTop: 20
                        }}>
                        <Button style={styles.buttonStyle}
                            onPress={this._goGridViewScene}
                            title="이미지그리드"
                            color="#418cff"
                            accessibilityLabel="이미지 그리드로 갑니다"
                        />
                    </TouchableHighlight>


                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        // justifyContent: 'center',
        // alignItems: 'center',
        height: 50,
        marginTop: 10
    },
});