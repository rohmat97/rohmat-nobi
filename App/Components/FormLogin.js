import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../Themes/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5';

const FormLogin = ({email, setemail, password, setpassword,}) => {
    const [isEmailValid, setIsEmailValid] = useState()
    const [isPasswordValid, setIsPasswordValid] = useState()
    const [visiblePassword, setVisiblePassword] = useState(true)
    const onChangeEmail = (payload) => {
        setemail(payload)
        const user = 'test@usenobi.com'
        if(payload?.length>0){
            setIsEmailValid(user === payload?true:false)
        }else{
            setIsEmailValid()
        }
        
    }
    const onChangePassword= (payload) =>{
        const pass = 'Test123'
        setpassword(payload)
        if(payload?.length>0){
            setIsPasswordValid(pass === payload?true:false)
        }else{
            setIsPasswordValid()
        }
        
    }
  return (
    <View style={styles.container}>
      <Text style={[styles.text,{marginTop:24}]}>E-mail Address</Text>
      <TextInput
       style={styles.input}
       onChangeText={onChangeEmail}
       value={email}
       placeholder="Enter E-mail Address"
       keyboardType='email-address'
       placeholderTextColor={'#9D9FA0'}
      />
      {isEmailValid ===false &&<Text style={[styles.Errortext]}>Invalid E-mail Address</Text>}
      <Text style={[styles.text,{marginTop:13}]}>Password</Text>
      <View style={{flexDirection:'row'}}>
        <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Enter Password"
        placeholderTextColor={'#9D9FA0'}
        secureTextEntry={visiblePassword}
        keyboardType="default"
        />
        <Icon name={visiblePassword?"eye":"eye-slash"} size={20} style={styles.eye} color="gray" onPress={()=>setVisiblePassword(!visiblePassword)} />
      </View>
      {isPasswordValid === false &&<Text style={[styles.Errortext]}>Invalid Password</Text>}
    </View>
  )
}

export default FormLogin

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:24
    },
    text: { 
        color:colors.text
    },
    Errortext: {
        color:colors.warning,
        marginTop:8
    },
    input: {
        backgroundColor:colors.bgInput,
        marginTop:13,
        color:colors.text,
        textAlign:'center',
        borderRadius:4,
        width:'100%'
    },
    eye:{
        position:'absolute',
        paddingHorizontal:8,
        right:10,
        top:25
    }
})