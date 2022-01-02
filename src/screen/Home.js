import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
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
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
    setRefreshing(true);
    getHome(page)
      .then(response => {
        setRefreshing(false);

        const filteredResponse = response.filter(
          x => x.categories[0].id === 118,
        );

        setPage(page + 1);
        if (page === 1) {
          setData(filteredResponse);
        } else {
          const mergeData = data.concat(filteredResponse);
          setData(mergeData);
        }
      })

      .catch(e => {
        setRefreshing(false);

        console.log('error getHome', e);
        Alert.alert('Error', 'failed to load data');
      });
  }

  return (
    <View style={style.screenContainer}>
      <View style={style.headerInputWrapper}>
        <Image source={ICON_SEARCH} />
        <TextInput placeholder="Location" style={{flex: 1, marginLeft: 8}} />
        <View style={style.filterIconWrapper}>
          <Image source={ICON_FILTER} />
        </View>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setPage(1) && onLoad();
            }}
          />
        }
        contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}
        data={data}
        ListEmptyComponent={<Text>Tidak ada data</Text>}
        onEndReached={() => onLoad()}
        onEndReachedThreshold={0.1}
        style={{width: '100%', flex: 1}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={style.renderItemWrapper}
            onPress={() => props.navigation.navigate('detail', {item})}>
            <Image
              source={{uri: item?.images[0]?.src ?? null}}
              resizeMode="cover"
              style={style.imageItem}
            />
            <View style={style.renderItemContentWrapper}>
              <Text style={style.textTitle}>{item.name}</Text>
              <Text style={[style.text, {fontSize: 17}]}>
                Jl. Sailin, Rempoa, Jakarta Selatan, DKI Jakarta
              </Text>
              <View style={{flexDirection: 'row', marginTop: 9}}>
                <Image source={FLOOR_PLAN} />
                <Text style={[style.textFacilities]}>92m2</Text>
                <Image source={BED} />
                <Text style={[style.textFacilities]}>3</Text>
                <Image source={BATHROOM} />
                <Text style={[style.textFacilities]}>3</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
