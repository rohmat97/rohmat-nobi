import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackgroundContainer from '../Components/BackgroundContainer'
import BottomNav from '../Components/BottomNav'
import ListScreen from './MenuHome/ListScreen'
import DashboardScreen from './MenuHome/DashboardScreen'
import colors from '../Themes/Colors'

const HomeScreen = (props) => {
    const { navigation }  =props
    const [nav, setnav] = useState(true)
    const [loading, setLoading] = useState(false)
    // console.log('navigation', navigation)
    const HandleLoadingAction = () => (
      <View style={styles.LoadingIndicator}>
        <ActivityIndicator color={colors.bgInput} size={40} />
      </View>
    )
  return (
    <BackgroundContainer>
        {
            nav?
                <ListScreen setLoading={setLoading}/>
                :
                <DashboardScreen navigation={navigation} setLoading={setLoading}/>
        }
        <BottomNav nav={nav} setnav={setnav}/>
        {loading && <HandleLoadingAction />}
    </BackgroundContainer>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  LoadingIndicator: { flex: 1, justifyContent: "center", alignItems: 'center', flexDirection: "column", position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.5)' }
})