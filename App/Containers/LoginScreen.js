import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundContainer from '../Components/BackgroundContainer';
import images from '../Themes/Images';
import FormLogin from '../Components/FormLogin';
import Api from '../Services/Api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthRedux from '../Redux/AuthRedux'
const api = Api.create()

const LoginScreen = (props) => {
  const { authSuccess,auth,navigation }  =props
  const {replace} = navigation
  const [email, setemail] = useState()
  const [password, setpassword] = useState()

  useEffect(() => {
    if(auth){
      replace('HomeScreen')
    }
    console.log('auth', auth)
  }, [auth])
  
  const onSubmitLogin =() =>{
    // console.log('payload', payload)
    const paylaod = {
      "email":email,
      "password":password
    }
    api.onLogin(paylaod)
      .then(success =>{
        if(success?.status ===200){
          console.log('success', success.data)
          authSuccess(success.data)
        }else{
          Alert.alert('Failed',success.data.message)
        }
      })
      .catch(err =>{
        console.log('err', err)
      })
  }
  return (
    <BackgroundContainer>
      <Image source={images.logo} style={styles.logo} resizeMode='cover' />
      <FormLogin 
        email={email}
        setemail={setemail}
        password={password}
        setpassword={setpassword}
        />
      <TouchableOpacity onPress={onSubmitLogin}>
        <Image source={images.LoginButton} style={styles.ButtonLogin} resizeMode='contain' />
      </TouchableOpacity>
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

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
  logo: { marginTop: 22, alignSelf: 'center', width: 59, height: 15 },
  ButtonLogin:{
    height:40,
    alignSelf:'center',
    marginBottom:49
  }
})