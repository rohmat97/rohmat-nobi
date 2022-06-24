import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from '../../Services/Api'
import images from '../../Themes/Images';
import colors from '../../Themes/Colors';

const ListScreen = (props) => {
    const {setLoading}=props
    const [List, setList] = useState([])
    const [search, setsearch] = useState()
    useEffect(() => {
        setLoading(true)
        Api.create().getList()
            .then(success => {
                // console.log('success.data', success.data)
                setList(success.data.data)
                setTimeout(() => {
                    setLoading(false)
                  }, 500);
            })
            .catch(err => {
                console.log('err', err)
                setTimeout(() => {
                    setLoading(false)
                  }, 500);
            })
    }, [])
    const renderItem = ({ item }) => {
        if(search){
            if(item.ticker.toLowerCase().search(search.toLowerCase()) !==-1){
                return(
                    <View style={styles.containerItems}>
                        <Image
                            source={{ uri: item.image }}
                            resizeMode='contain'
                            style={styles.icon}
                            PlaceholderContent={<ActivityIndicator color={'white'} />}
                        />
                        <Text style={styles.text}>{item.ticker}</Text>
                        <Text style={[styles.text, { textAlign: 'right' }]}>{parseFloat(item?.amount).toFixed(8)}</Text>
                    </View>
                )
            }
            return null 
        }
        return(
            <View style={styles.containerItems}>
                <Image
                    source={{ uri: item.image }}
                    resizeMode='contain'
                    style={styles.icon}
                />
                <Text style={styles.text}>{item.ticker}</Text>
                <Text style={[styles.text, { textAlign: 'right' }]}>{parseFloat(item?.amount).toFixed(8)}</Text>
            </View>
        )
        };
    return (
        <View style={{ flex: 1,marginBottom:72 }}>
            <View style={styles.header}>
                <Image source={images.back} resizeMode='cover' style={styles.back}/>
                <View style={{flex:1}}>
                    <Image source={images.search} resizeMode='cover' style={styles.iconSearch}/>
                    <TextInput  
                        style={styles.input}  
                        placeholder="Search"
                        placeholderTextColor={'#9D9FA0'}
                        onChangeText={text => setsearch(text)}
                    />
                </View>
            </View>
            <FlatList
                data={List}
                renderItem={renderItem}
                contentContainerStyle={{paddingTop:60}}
            />
        </View>
    )
}

export default ListScreen

const styles = StyleSheet.create({
    containerItems: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.25,
        borderBottomColor: '#FFFFFF',
        marginHorizontal: 24,
        paddingVertical: 18
    },
    text: {
        flex: 1,
        color: 'white',
        fontSize: 17
    },
    icon: {
        width: 16,
        height: 16,
        marginRight: 8,
        borderWidth:1,
        marginTop:2
    },
    header:{
        flex:1,
        position:'absolute',
        top:0,
        flexDirection:'row',
    },
    input: {
        backgroundColor:'#223965',
        color:colors.text,
        textAlign:'left',
        borderRadius:10,
        width:'90%',
        marginTop: 24,
        paddingLeft:32,
        height:36,
        zIndex:11,
        fontSize:15
    },
    back: {
        width:24,
        height:32,
        alignSelf:'center', 
        marginLeft:16, 
        marginVertical:24, 
        marginRight:8
    },
    iconSearch:{
        width:12,
        height:12,
        position:'absolute', 
        marginTop:36, 
        marginLeft:12,
        zIndex:12,
    }
})