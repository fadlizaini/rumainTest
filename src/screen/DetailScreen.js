import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import style from '../style';
import {BED, FLOOR_PLAN, BATHROOM} from '../images';

export default function DetailScreen(props) {
  const {item} = props.route.params;
  useEffect(() => {
    // console.log(props);
    props.navigation.setOptions({title: item.name});
  }, []);
  return (
    <ScrollView>
      <Image
        source={{uri: item.images[0].src}}
        style={{width: '100%', aspectRatio: 5 / 3}}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 25,
          paddingTop: 38,
          marginTop: -20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
        }}>
        <Text style={style.textTitle}>{item.name}</Text>
        <Text style={[style.text, {fontSize: 17}]}>
          Jl. Sailin, Rempoa, Jakarta Selatan, DKI Jakarta
        </Text>
        <View
          style={{
            width: '100%',
            height: 0.75,
            backgroundColor: 'black',
            marginTop: 32,
            marginBottom: 17,
          }}
        />
        <Text style={[style.textTitle, {fontSize: 22, marginBottom: 4}]}>
          Price
        </Text>
        <Text style={[style.textTitle, {fontSize: 35}]}>IDR 3,149,480,000</Text>
        <View style={{flexDirection: 'row', marginTop: 9}}>
          <Image source={FLOOR_PLAN} />
          <Text style={[style.textFacilities]}>92m2</Text>
          <Image source={BED} />
          <Text style={[style.textFacilities]}>3</Text>
          <Image source={BATHROOM} />
          <Text style={[style.textFacilities]}>3</Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 0.75,
            backgroundColor: 'black',
            marginTop: 32,
            marginBottom: 17,
          }}
        />
        <Text style={[style.textTitle, {fontSize: 22, marginBottom: 22}]}>
          Details
        </Text>
        <Text
          style={[
            style.textTitle,
            {fontSize: 20, marginBottom: 5, fontWeight: '500'},
          ]}>
          Type
        </Text>
        <Text
          style={[
            style.textTitle,
            {fontSize: 18, marginBottom: 18, fontWeight: '400'},
          ]}>
          Buy
        </Text>
        <Text
          style={[
            style.textTitle,
            {fontSize: 20, marginBottom: 5, fontWeight: '500'},
          ]}>
          Luas Bangunan
        </Text>
        <Text
          style={[
            style.textTitle,
            {fontSize: 18, marginBottom: 18, fontWeight: '400'},
          ]}>
          125 m2
        </Text>
        <Text
          style={[
            style.textTitle,
            {fontSize: 20, marginBottom: 5, fontWeight: '500'},
          ]}>
          Luas Tanah
        </Text>
        <Text
          style={[
            style.textTitle,
            {fontSize: 18, marginBottom: 18, fontWeight: '400'},
          ]}>
          72 m2
        </Text>
       
      </View>
    </ScrollView>
  );
}
