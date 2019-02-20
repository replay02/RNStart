import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import PropTypes from "prop-types";

export default WeatherListRow;

WeatherListRow.propTypes = {
    data: PropTypes.array.isRequired,
}

// data Array : 
// pm10Value : 0
// pm25Value : 1
// pm10Grade : 2
// pm25Grade : 3
// dataTime : 4
// stationName : 5
function WeatherListRow({ data }) {
    return (
        <View style={styles.container}>

            <View style={styles.firstRow}>
                <Text style={styles.stationName}>
                    {data[5]}
                </Text>
                <Text style={styles.date}>
                    {data[4]}
                </Text>

            </View>

            <View style={styles.secondRow}>

                <View style={styles.secondRow2}>
                    <Text style={styles.valueTitle}>미세먼지(PM10) 수치</Text>
                    <Text style={styles.valueTitle}>
                        {data[0] + "㎍/㎥"}
                    </Text>
                    <Text style={styles.valueTitle2}>미세먼지(PM10) 등급</Text>
                    <Text style={styles.valueTitle3}>
                        {this._getGradeString(data[2])}
                    </Text>
                </View>

                <View style={styles.secondRow2}>
                    <Text style={styles.valueTitle}>미세먼지(PM2.5) 수치</Text>
                    <Text style={styles.valueTitle}>
                        {data[1] + "㎍/㎥"}
                    </Text>

                    <Text style={styles.valueTitle2}>미세먼지(PM2.5) 등급</Text>
                    <Text style={styles.valueTitle3}>
                        {this._getGradeString(data[3])}
                    </Text>
                </View>
            </View>


            
        </View>
    );
}




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


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    rowListView: {
        fontSize: 15,
        flexWrap: 'wrap',
        alignSelf: 'center',
        padding: 20,
        color: '#f00',
        backgroundColor: '#fff',
    },

    firstRow: {
        flexDirection: 'row',
        padding: 15,
        flex: 1
    },

    stationName: {
        fontSize: 15,
        color: '#000'
    },

    date: {
        fontSize: 15,
        paddingLeft: 15,
        color: '#888'
    },

    secondRow: {
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1
    },

    secondRow2: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },


    thirdRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems : 'center',
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1
    },

    valueTitle: {
        fontSize: 12,
        color: '#888',
        alignSelf: 'center'
    },

    valueTitle2: {
        fontSize: 12,
        color: '#888',
        alignSelf: 'center',
        paddingTop: 10
    },

    valueTitle3: {
        fontSize: 12,
        color: '#888',
        alignSelf: 'center',
        paddingBottom: 10
    },

    pm25ValueTitle: {
        fontSize: 12,
        color: '#888',
        alignSelf: 'center'
    },


    thirdRow: {
        flexDirection: 'row',
        padding: 20,
        flex: 1
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