import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function Home(props) {
  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('detail')}>
        <Text>Detail Screen</Text>
      </TouchableOpacity>
    </View>
  );
}
