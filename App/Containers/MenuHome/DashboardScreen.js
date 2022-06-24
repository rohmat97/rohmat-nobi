import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from '../../Services/Api'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AuthRedux from '../../Redux/AuthRedux'
import images from '../../Themes/Images'

const DashboardScreen = (props) => {
  const { authSuccess, auth, navigation,setLoading } = props
  const [dashboard, setdashboard] = useState()
  const [downloadDeposit, setdownloadDeposit] = useState(false)
  useEffect(() => {
    setLoading(true)
    const payload = {
      token: auth.token
    }
    Api.create().onDashboard(payload)
      .then(success => {
        // console.log('success.data', success.data)
        setdashboard(success.data)
        setLoading(setLoading)
        setTimeout(() => {
          setLoading(false)
        }, 500);
      })
      .catch(err => {
        console.log('err', err)
        Alert.alert("error", err.toString())
        setTimeout(() => {
          setLoading(false)
        }, 500);
      })
  }, [])

  const onLogout = () => {
    setLoading(true)
    authSuccess()
    navigation.replace('LoginScreen')
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }
  return (
    <View style={{ flex: 1 }}>
      <Image source={images.Adds} resizeMode='contain' style={styles.Adds} />
      <View style={{ alignItems: 'center', marginTop: 28, marginBottom: 36 }}>
        <Text style={{ fontSize: 14, color: '#9D9FA0' }}> 24H Changes
          {dashboard && <Text style={{ color: '#05BE90', fontSize: 14 }}> + {dashboard["24hourchange"]}%</Text>}
        </Text>
        <Text style={{ fontSize: 44, color: '#EAEAEA' }}>{dashboard && dashboard.total_asset}</Text>
      </View>
      {
        !downloadDeposit ?
          <TouchableOpacity onPress={() => {
            setdownloadDeposit(true)
            setTimeout(() => {
              setdownloadDeposit(false)
            }, 5000);
          }}
          >
            <Image
              source={images.DepositButton}
              resizeMode='contain'
              style={[{ alignSelf: 'center' }]} />
          </TouchableOpacity>
          :
          <View style={styles.onDownloading}>
            <ActivityIndicator color={'#EAEAEA'} />
          </View>
      }
        <TouchableOpacity onPress={() => onLogout()} style={styles.logout}>
            <Text style={styles.textLogout}>Logout</Text>
        </TouchableOpacity>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)

const styles = StyleSheet.create({
  Adds: {
    alignSelf: 'center',
    marginTop: 16,
  },
  logout: {
    width: 279,
    height: 40,
    backgroundColor: 'red',
    alignSelf: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100
  },
  textLogout: {
    color: '#EAEAEA',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  onDownloading: {
    width: '74%',
    height: 40,
    backgroundColor: 'gray',
    alignSelf: 'center',
    borderRadius: 12,
    justifyContent: 'center'
  }
})