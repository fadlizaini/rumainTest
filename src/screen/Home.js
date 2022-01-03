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
  Modal,
  ToastAndroid,
} from 'react-native';
import {ICON_FILTER, ICON_SEARCH, BED, FLOOR_PLAN, BATHROOM} from '../images';
import style from '../style';
import http from '../http';
import {getHome} from '../services/service';

export default function Home(props) {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad(ppage = page) {
    console.log('ppage', ppage);
    setRefreshing(true);
    getHome(ppage)
      .then(response => {
        setRefreshing(false);

        const filteredResponse = response.filter(
          x => x.categories[0].id === 118,
        );

        setPage(ppage + 1);
        if (ppage === 1) {
          setData(
            sortType === null
              ? filteredResponse
              : sortResponse(filteredResponse),
          );
          console.log(filteredResponse);
        } else {
          const mergeData = data.concat(filteredResponse);
          setData(sortType === null ? mergeData : sortResponse(mergeData));
          console.log(mergeData);
        }
      })

      .catch(e => {
        setRefreshing(false);
        console.log('error getHome', e);
        if (ppage === 1) {
          Alert.alert('Error', 'failed to load data');
        } else {
          ToastAndroid.show('cant load more data', ToastAndroid.SHORT);
        }
      });
  }

  function sortResponse(data) {
    switch (sortType) {
      case 'asc':
        data.sort((a, b) => (a.name > b.name ? 1 : -1));
        return data;

      case 'desc':
        data.sort((a, b) => (a.name < b.name ? 1 : -1));
        return data;

      case 'new':
        data.sort(function (a, b) {
          return new Date(b.date_created) - new Date(a.date_created);
        });
        return data;

      case 'old':
        data.sort(function (a, b) {
          return new Date(a.date_created) - new Date(b.date_created);
        });
        return data;

      default:
        return null;
    }
  }

  return (
    <View style={style.screenContainer}>
      <View style={style.headerInputWrapper}>
        <Image source={ICON_SEARCH} />
        <TextInput placeholder="Location" style={{flex: 1, marginLeft: 8}} />
        <TouchableOpacity
          style={style.filterIconWrapper}
          onPress={() => setVisible(true)}>
          <Image source={ICON_FILTER} />
        </TouchableOpacity>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              onLoad(1);
            }}
          />
        }
        contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}
        data={data}
        ListEmptyComponent={<Text>Tidak ada data</Text>}
        onEndReached={() => onLoad(page)}
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
      <Modal visible={visible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderRadius: 16,
              backgroundColor: 'white',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 30,
            }}>
            <Text style={{marginTop: 10}}>Sort</Text>
            <View style={{marginLeft: 10}}>
              <TouchableOpacity
                onPress={() => setSortType(sortType === 'asc' ? null : 'asc')}
                style={[
                  {paddingVertical: 10},
                  sortType === 'asc' && {backgroundColor: 'gray'},
                ]}>
                <Text style={sortType === 'asc' && {color: 'white'}}>
                  name A-Z
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSortType(sortType === 'desc' ? null : 'desc')}
                style={[
                  {paddingVertical: 10},
                  sortType === 'desc' && {backgroundColor: 'gray'},
                ]}>
                <Text style={sortType === 'desc' && {color: 'white'}}>
                  name Z-A
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSortType(sortType === 'new' ? null : 'new')}
                style={[
                  {paddingVertical: 10},
                  sortType === 'new' && {backgroundColor: 'gray'},
                ]}>
                <Text style={sortType === 'new' && {color: 'white'}}>
                  date newest
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSortType(sortType === 'old' ? null : 'old')}
                style={[
                  {paddingVertical: 10},
                  sortType === 'old' && {backgroundColor: 'gray'},
                ]}>
                <Text style={sortType === 'old' && {color: 'white'}}>
                  date oldest
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  onLoad(1);
                }}>
                <Text>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
