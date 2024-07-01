import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

const AppLoader = () => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../assets/loading.gif')}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#10002B',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default AppLoader