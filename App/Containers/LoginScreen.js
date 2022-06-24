import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundContainer from '../Components/BackgroundContainer';
import images from '../Themes/Images';
import FormLogin from '../Components/FormLogin';
import Api from '../Services/Api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthRedux from '../Redux/AuthRedux'
import colors from '../Themes/Colors';
const api = Api.create()

const LoginScreen = (props) => {
  const { authSuccess, auth, navigation } = props
  const { replace } = navigation
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (auth) {
      replace('HomeScreen')
      setTimeout(() => {
        setLoading(false)
      }, 500);
    }
    console.log('auth', auth)
  }, [auth])

  const onSubmitLogin = () => {
    // console.log('payload', payload)
    setLoading(true)
    const paylaod = {
      "email": email,
      "password": password
    }
    api.onLogin(paylaod)
      .then(success => {
        if (success?.status === 200) {
          console.log('success', success.data)
          authSuccess(success.data)
        } else {
          setTimeout(() => {
            setLoading(false)
          }, 500);
          Alert.alert('Failed', JSON.stringify(success))
        }
      })
      .catch(err => {
        console.log('err', err)
        setTimeout(() => {
          setLoading(false)
        }, 500);
        Alert.alert('Failed', JSON.stringify(err))
      })
  }
  const HandleLoadingAction = () => (
    <View style={styles.LoadingIndicator}>
      <ActivityIndicator color={colors.bgInput} size={40} />
    </View>
  )
  return (
    <BackgroundContainer>
      <Image source={images.logo} style={styles.logo} resizeMode='cover' />
      <ScrollView>
        <FormLogin
          email={email}
          setemail={setemail}
          password={password}
          setpassword={setpassword}
        />
      </ScrollView>
      <TouchableOpacity onPress={onSubmitLogin}>
        <Image source={images.LoginButton} style={styles.ButtonLogin} resizeMode='contain' />
      </TouchableOpacity>
      {loading && <HandleLoadingAction />}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
  logo: {
    marginTop: 22,
    alignSelf: 'center',
    width: 59,
    height: 15
  },
  ButtonLogin: {
    height: 40,
    alignSelf: 'center',
    marginBottom: 49
  },
  LoadingIndicator: { flex: 1, justifyContent: "center", alignItems: 'center', flexDirection: "column", position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.5)' }
})