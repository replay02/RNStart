import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { parseString } from 'react-native-xml2js';
import Spinner from 'react-native-loading-spinner-overlay';

var API_KEY = 'ipIQQAASbqJVNrR%2BryI5oa0a%2B1G0W3JNcaku6UP3ODNFlHHr95tN%2F7%2BlQ8Jr44%2BdtffXOXPJDvkBC7cWGZkvUg%3D%3D';

export default class MapScene extends Component {
    _mapView;
    _callOut;
    constructor(props) {
        super(props);
        // console.log(this.props); 
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('titleName', "지도")
        };
    };

    state = {
        callOutHeight : 0,
        data: [],
        isLoading: true,
        region: {
            // latitude: 37.335887,
            // longitude: 127.094063,
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        { this.state.isLoading ? null : this._mapView.animateToRegion(this.state.region, 1000) }
    }

    componentDidMount() {

        console.log(this.props.navigation.state.params.ListViewClickItemHolder);
        this.setState({
            data: this.props.navigation.state.params.ListViewClickItemHolder
        });


    }

    _onRegionChange = (region) => {
        this.setState({ region });
    }

    // _getInitialRegion = () => {
    //     var initialRegion = {
    //         latitude: 37.335887,
    //         longitude: 127.094063,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.0421,
    //     };

    //     return initialRegion;
    // }


    _getGradeString = (data) => {
        let tmp;
        switch (data) {
            case '1': tmp = '좋음'
                break;
            case '2': tmp = '보통'
                break;
            case '3': tmp = '나쁨'
                break;
            case '4': tmp = '매우나쁨'
                break;
            default: tmp = '알수없음'
                break;
        }
        return tmp;
    }


    _getLocationList = (name) => {

        console.log("yhkim _getLocationList");

        var base_url = 'http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getMsrstnList';
        var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + API_KEY; /*Service Key*/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('40'); /*한 페이지 결과 수*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지 번호*/
        /*시도 이름 (서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종)*/
        queryParams += '&' + encodeURIComponent('addr') + '=' + encodeURIComponent('서울');
        queryParams += '&' + encodeURIComponent('stationName') + '=' + encodeURIComponent(name); // 측정소 이름


        var totalUrl = base_url + queryParams;


        fetch(totalUrl)
            .then(response => response.text())
            .then((response) => {
                console.log('fetch response : ', response);
                parseString(response, (err, result) => {
                    var data = result.response.body[0].items[0].item;
                    var lat = data[0].dmX[0];
                    var lng = data[0].dmY[0];
                    this.setState({
                        region: { latitude: parseFloat(lat), longitude: parseFloat(lng), latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
                        isLoading: false
                    })
                });
            }).catch((err) => {
                console.log('fetch', err)
            });
    }

    _moveCenter = () => {

    }


    _animateToMarker = () => {
        this._mapView.animateToRegion(this.state.region, 1000)
    }

    render() {
        const { data, isLoading, region } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar>

                <MapView style={styles.map}
                    showsScale={true}
                    showsUserLocation={true}

                    ref={(mapView) => {
                        this._mapView = mapView;
                    }}

                    onMapReady={() =>

                        this._getLocationList(data[5])

                    }>

                    {isLoading ?
                        null
                        :
                        <Marker

                            // onPress={() => this._moveCenter}
                            coordinate={{
                                latitude: region.latitude, longitude: region.longitude
                            }}
                            title={data[5]}
                            description={data[4]}>
                            <Callout
                                ref={(callout) => {
                                    this._callOut = callout;
                                }}
                                onLayout={(event) => {
                                    var height = event.nativeEvent.layout.height;
                                    this.setState({
                                        callOutHeight : height
                                    })
                                }}
                                tooltip={true}
                                style={{ alignItems: 'center' }}>
                                <View style={styles.calloutBack} >

                                    <Text style={styles.calloutTitle}
                                        ellipsizeMode={'tail'}>
                                        {data[5]}
                                    </Text>

                                    <Text style={styles.calloutText}
                                        ellipsizeMode={'tail'}>
                                        측정 일시:{data[4]}
                                    </Text>

                                    <Text style={styles.calloutText}
                                        ellipsizeMode={'tail'}>
                                        pm10수치:{data[0]}㎍/㎥
                                    </Text>
                                    <Text style={styles.calloutText}
                                        // numberOfLines={1}
                                        ellipsizeMode={'tail'}>
                                        pm10등급:{this._getGradeString(data[2])}
                                    </Text>

                                    <Text style={styles.calloutText2}

                                        ellipsizeMode={'tail'}>
                                        pm25수치:{data[1]}㎍/㎥
                                    </Text>
                                    <Text style={styles.calloutText3}

                                        ellipsizeMode={'tail'}>
                                        pm25등급:{this._getGradeString(data[3])}
                                    </Text>

                                </View>
                            </Callout>

                        </Marker>
                    }
                </MapView>


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

    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
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

    calloutBack: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#eee'
    },
    calloutText: {
        paddingBottom: 5,
        color: '#888',
        textAlign: 'center',
    },

    calloutText2: {
        paddingTop: 5,
        paddingBottom: 5,
        color: '#888',
        textAlign: 'center',
    },
    calloutTitle: {

        paddingBottom: 5,
        color: '#000',
        textAlign: 'center',
    },

    calloutText3: {
        color: '#888',
        textAlign: 'center',
    }
});