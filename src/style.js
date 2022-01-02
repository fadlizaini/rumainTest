import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');
const style = StyleSheet.create({
  screenContainer: {
    width,
    height,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headerInputWrapper: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 40,
    backgroundColor: 'white',
    borderRadius: 40,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  filterIconWrapper: {
    paddingVertical: 8,
    paddingLeft: 10,
    paddingRight: 20,
    borderLeftWidth: 1,
    borderColor: '#DADADA',
  },
  renderItemWrapper: {
    borderRadius: 10,
    width: width - 40,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageItem: {
    width: '100%',
  },
  text: {color: 'black'},
  textTitle: {color: 'black', fontSize: 30, fontWeight: '700'},
  renderItemContentWrapper: {
    width: '100%',
    marginTop: -10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
});

export default style;
