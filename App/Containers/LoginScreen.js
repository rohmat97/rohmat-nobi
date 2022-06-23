import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundContainer from '../Components/BackgroundContainer';
import images from '../Themes/Images';
import FormLogin from '../Components/FormLogin';
import Api from '../Services/Api';
const api = Api.create()

const LoginScreen = () => {
  const [email, setemail] = useState()
  const [password, setpassword] = useState()


  const onSubmitLogin =(payload) =>{
    // console.log('payload', payload)
    const paylaod = {
      "email":"test@usenobi.com",
      "password":"Test123"
    }
    api.onLogin(paylaod)
      .then(success =>{
        if(success?.status ===200){
          console.log('success', success.data)
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

export default LoginScreen

const styles = StyleSheet.create({
  logo: { marginTop: 22, alignSelf: 'center', width: 59, height: 15 },
  ButtonLogin:{
    height:40,
    alignSelf:'center',
    marginBottom:49
  }
})