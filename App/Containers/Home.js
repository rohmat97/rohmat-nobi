import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackgroundContainer from '../Components/BackgroundContainer'
import BottomNav from '../Components/BottomNav'

const HomeScreen = (props) => {
    const { navigation } = props
    const [nav, setnav] = useState(true)
  return (
    <BackgroundContainer>
        <BottomNav nav={nav} setnav={setnav}/>
    </BackgroundContainer>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})