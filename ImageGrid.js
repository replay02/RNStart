import React, { Component } from 'react';
import { StyleSheet, FlatList, View, ListView, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


const urls = ["https://cdn.pixabay.com/photo/2018/11/29/19/29/autumn-3846345__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/05/16/57/buzzard-2287699__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/25/21/45/crystal-ball-photography-3894871__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/15/02/53/flower-3876195__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/23/14/19/forest-3833973__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/29/21/19/hamburg-3846525__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/04/20/21/harley-davidson-3794909__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/11/16/51/ibis-3809147__480.jpg",
    "https://cdn.pixabay.com/photo/2018/07/16/13/17/kiss-3541905__480.jpg",
    "https://cdn.pixabay.com/photo/2018/10/28/16/11/landscape-3779159__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/09/14/44/leaf-3865014__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/24/02/05/lichterkette-3834926__480.jpg",
    "https://cdn.pixabay.com/photo/2019/01/05/17/05/man-3915438__480.jpg",
    "https://cdn.pixabay.com/photo/2018/08/06/16/30/mushroom-3587888__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/16/18/12/open-fire-3879031__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/29/23/49/rays-3902368__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/04/22/38/road-3856796__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/17/22/15/tree-3822149__480.jpg",
    "https://cdn.pixabay.com/photo/2018/10/21/21/28/autumn-3763897__480.jpg",
    "https://cdn.pixabay.com/photo/2018/10/14/13/01/background-3746423__480.jpg",
    "https://cdn.pixabay.com/photo/2018/10/18/23/53/cactus-3757657__480.jpg",
    "https://cdn.pixabay.com/photo/2018/10/13/17/31/fall-leaves-3744649__480.jpg",
    "https://cdn.pixabay.com/photo/2018/10/07/11/49/fallow-deer-3729821__480.jpg",
    "https://cdn.pixabay.com/photo/2018/10/12/22/08/flamingo-3743094__480.jpg",
    "https://cdn.pixabay.com/photo/2018/10/22/11/58/grass-3765172__480.jpg",
    "https://cdn.pixabay.com/photo/2018/10/11/23/08/hahn-3741129__480.jpg",
    "https://cdn.pixabay.com/photo/2018/09/06/23/37/hydrangea-3659614__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/28/01/34/rum-3898745__480.jpg"];
    

// var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })

export default class ImageGrid extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('titleName', "알수 없음"),
        };
    };

    state = {
        dataSource: {},
        isLoading: false,
    };

    componentDidMount() {

        this.setState({
            dataSource: urls,
            isLoading: true,
        });
    }

    _getRandomHeight = () => {
        var height = 100;

        height = Math.random() * (300 - 100) + 100;

        return height;
    }

    render() {

        const { isLoading, dataSource } = this.state;

        return (

            <View style={{ flex: 1 }}>
                {isLoading ?
                    <FlatList
                        data={dataSource}
                        renderItem={({ item, index }) => (
                            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                                <Image style={styles.imageThumbnail} source={{ uri: item }} />
                            </View>
                        )}
                        // renderItem={this._renderItem(dataSource)}
                        numColumns={3}
                        keyExtractor={(item, index) => index}

                    />
                    :
                    <View style={styles.loadingView}>
                        <Spinner
                            visible={!this.state.isLoading}
                            color={"#f7a49e"}
                            // textContent={'미세먼지 데이터를 가져오는 중입니다'}
                            textStyle={styles.spinnerText}
                        />
                    </View>
                }
            </View >
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
    imageThumbnail: {
        resizeMode: 'contain',
        alignSelf: 'stretch',
        aspectRatio: 1
    },
});
