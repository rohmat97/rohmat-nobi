import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from '../../Services/Api'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AuthRedux from '../../Redux/AuthRedux'

const DashboardScreen = (props) => {
  const { authSuccess,auth,navigation }  =props
  const [dashboard, setdashboard] = useState()
  useEffect(() => {
    const payload ={
      token: auth.token
    }
    Api.create().onDashboard(payload)
        .then(success => {
            console.log('success.data', success.data)
            setdashboard(success.data)
        })
        .catch(err => {
            console.log('err', err)
        })
}, [])
  return (
    <View>
      <Text>DashboardScreen</Text>
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

export default connect(mapStateToProps,mapDispatchToProps)(DashboardScreen)

const styles = StyleSheet.create({})