import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {
  ICON_FILTER,
  ICON_SEARCH,
  SAMPLE_IMAGE,
  BED,
  FLOOR_PLAN,
  BATHROOM,
} from '../images';
import style from '../style';
import http from '../http';
import {getHome} from '../services/service';

export default function Home(props) {
  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getHome()
      .then(response => {
        console.log('response getHome', response);
      })
      .catch(e => {
        console.log('error getHome', e);
      });
  };

  return (
    <View style={style.screenContainer}>
      <View style={style.headerInputWrapper}>
        <Image source={ICON_SEARCH} />
        <TextInput placeholder="Location" style={{flex: 1, marginLeft: 8}} />
        <View style={style.filterIconWrapper}>
          <Image source={ICON_FILTER} />
        </View>
      </View>
      <View style={style.renderItemWrapper}>
        <Image
          source={SAMPLE_IMAGE}
          resizeMode="contain"
          style={style.imageItem}
        />
        <View style={style.renderItemContentWrapper}>
          <Text style={style.textTitle}>Rumah Rempoa</Text>
          <Text style={[style.text, {fontSize: 17}]}>
            Jl. Sailin, Rempoa, Jakarta Selatan, DKI Jakarta
          </Text>
          <View style={{flexDirection: 'row', marginTop: 9}}>
            <Image source={FLOOR_PLAN} />
            <Text
              style={[
                style.text,
                {
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: '500',
                  marginRight: 23,
                },
              ]}>
              92m2
            </Text>
            <Image source={BED} />
            <Text
              style={[
                style.text,
                {
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: '500',
                  marginRight: 23,
                },
              ]}>
              3
            </Text>
            <Image source={BATHROOM} />
            <Text
              style={[
                style.text,
                {
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: '500',
                  marginRight: 23,
                },
              ]}>
              3
            </Text>
          </View>
        </View>
      </View>
      {/* <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('detail')}>
        <Text>Detail Screen</Text>
      </TouchableOpacity> */}
    </View>
  );
}
