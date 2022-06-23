import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import images from '../Themes/Images'

const BottomNav = (props) => {
    const { setnav, nav } = props
    let dashboard = nav?images.dashboardInactive:images.dashboardActive
    let list = nav?images.listActive:images.listInactive
  return (
    <View style={styles.containerTab}>
        <TouchableOpacity onPress={()=> setnav(true)}>
            <Image source={list} resizeMode='cover' />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> setnav(false)}>
            <Image source={dashboard} resizeMode='cover' />
        </TouchableOpacity>
    </View>
  )
}

export default BottomNav

const styles = StyleSheet.create({
    containerTab:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'#000000',
        height:72,
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:"center",
        paddingHorizontal:'12.5%'
    }
})