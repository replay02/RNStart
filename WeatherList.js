import React, { Component } from 'react';
import { StyleSheet, View, ListView, TouchableOpacity } from 'react-native';
import { parseString } from 'react-native-xml2js';
import Spinner from 'react-native-loading-spinner-overlay';
import WeatherListRow from "./WeatherListRow";


var API_KEY = 'ipIQQAASbqJVNrR%2BryI5oa0a%2B1G0W3JNcaku6UP3ODNFlHHr95tN%2F7%2BlQ8Jr44%2BdtffXOXPJDvkBC7cWGZkvUg%3D%3D';

var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })

export default class WhatherList extends Component {

    static navigationOptions = {
        title: '미세먼지',
    };

    state = {
        dataSource: ds.cloneWithRows([]),
        isLoading: false,
    };

    _getAirCondition = () => {

        var base_url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
        var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + API_KEY; /*Service Key*/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('40'); /*한 페이지 결과 수*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지 번호*/
        /*시도 이름 (서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종)*/
        queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('서울');
        queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.3'); /*요청 데이터기간 (시간 : HOUR, 하루 : DAILY)*/

        var totalUrl = base_url + queryParams;

        console.log(totalUrl);

        fetch(totalUrl)
            .then(response => response.text())
            .then((response) => {
                console.log('fetch response : ', response);
                parseString(response, (err, result) => {
                    var data = result.response.body[0].items[0].item;
                    var array = [];
                    for (var d of data) {
                        array.push([d.pm10Value[0], d.pm25Value[0], d.pm10Grade1h[0], d.pm25Grade1h[0], d.dataTime[0], d.stationName[0]]);
                    }
                    // console.log(array);

                    this.setState({
                        dataSource: ds.cloneWithRows(array),
                        isLoading: true
                    });
                });
            }).catch((err) => {
                console.log('fetch', err)
            });
    }

    componentDidMount() {
        this._getAirCondition();
    }


    render() {

        const { dataSource, isLoading } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {isLoading ?
                    <ListView style={{ flex: 1 }}
                        dataSource={dataSource}
                        renderRow={this._renderRow}
                        renderSeparator={this._renderSeparator}
                    />
                    :
                    <View style={styles.loadingView}>
                        <Spinner
                            visible={!this.state.isLoading}
                            color={"#000"}
                            // textContent={'미세먼지 데이터를 가져오는 중입니다'}
                            textStyle={styles.spinnerText}
                        />
                    </View>
                }
            </View >
        );
    }

    _OpenMap = (rowData) => {
        this.props.navigation.navigate('Map', { ListViewClickItemHolder: rowData });
    }

    _renderRow = (data) => {
        return (
            <TouchableOpacity onPress={()=>this._OpenMap(data)}>
                <WeatherListRow data={data}>
                </WeatherListRow>
            </TouchableOpacity>
        )
    }

    _renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
});
