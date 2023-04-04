import {StyleSheet} from 'react-native';

const width = StyleSheet.create({
  pa1: {borderWidth: 1},
  pa2: {borderWidth: 2},
  pa3: {borderWidth: 2},

  pt1: {borderTopWidth: 1},
  pt2: {borderTopWidth: 2},
  pt3: {borderTopWidth: 3},

  pr1: {borderRightWidth: 1},
  pr2: {borderRightWidth: 2},
  pr3: {borderRightWidth: 3},

  pb1: {borderBottomWidth: 1},
  pb2: {borderBottomWidth: 2},
  pb3: {borderBottomWidth: 3},

  pl1: {borderLeftWidth: 1},
  pl2: {borderLeftWidth: 2},
  pl3: {borderLeftWidth: 3},
});

const color = StyleSheet.create({
  white_1: {borderColor: '#ffffff'},
  white_2: {borderColor: '#fefefe'},
  dark_1: {borderColor: '#000000'},
  dark_2: {borderColor: '#1e1e1e'},
  dark_3: {borderColor: '#2d2d2d'},
  green_1: {borderColor: '#27AE60'},
  orange_1: {borderColor: '#FF6500'},
  red_1: {borderColor: '#EB5757'},
  yellow_1: {borderColor: '#F6D56E'},
  yellow_2: {borderColor: '#F2C24C'},
});

export default {width, color};
