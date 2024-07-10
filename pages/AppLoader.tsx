import React from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'

const AppLoader = () => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../assets/ariLoading.gif')}
        style={styles.imageStyle}
        resizeMode="contain"
      />
    </View>
  )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#10002B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 0.8,
    height: height * 0.4,
  },
})

export default AppLoader
