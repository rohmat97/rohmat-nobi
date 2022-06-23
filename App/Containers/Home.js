import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackgroundContainer from '../Components/BackgroundContainer'
import BottomNav from '../Components/BottomNav'
import ListScreen from './MenuHome/ListScreen'
import DashboardScreen from './MenuHome/DashboardScreen'

const HomeScreen = (props) => {
    const { navigation }  =props
    const [nav, setnav] = useState(true)
    // console.log('navigation', navigation)
  return (
    <BackgroundContainer>
        {
            nav?
                <ListScreen />
                :
                <DashboardScreen navigation={navigation}/>
        }
        <BottomNav nav={nav} setnav={setnav}/>
    </BackgroundContainer>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})