import { View, Text, ActivityIndicator, Image } from 'react-native'
import React, { useEffect } from 'react'
import BackgroundContainer from '../Components/BackgroundContainer'
import colors from '../Themes/Colors'
import images from '../Themes/Images'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AuthRedux from '../Redux/AuthRedux'

const SplashScreen = (props) => {
    const {navigation,auth} = props
    const {replace}=navigation
    useEffect(() => {
      setTimeout(() => {
        if(auth){
            replace('HomeScreen')
          }else{
            replace('LoginScreen')
          }
        
      }, 3000);
    }, [])
    
  return (
    <BackgroundContainer>
        <View style={{flex:1,justifyContent:"center", alignItems:'center', flexDirection:"column"}}>
           <Image source={images.logo} style={{width:180,height:45, marginBottom:24}} resizeMode='contain' />
           <ActivityIndicator color={colors.text} size={40}/>
        </View>
    </BackgroundContainer>
  )
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth.payload
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(AuthRedux), dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SplashScreen)