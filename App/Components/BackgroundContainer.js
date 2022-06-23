import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import RadialGradient from 'react-native-radial-gradient';

const { width, height } = Dimensions.get('screen')
const BackgroundContainer = ({ children }) => {
    return (
        <RadialGradient
            style={styles.containerBG}
            colors={['#152A53', '#000000']}
            stops={[0, 2]}
            center={[width * 0.5, 0]}
            radius={height*0.9}
        >
            <View style={styles.containerContent} >
                {children}
            </View>
        </RadialGradient>
    )
}

export default BackgroundContainer

const styles = StyleSheet.create({
    containerContent: { flex: 1, marginTop: height * 0.25 },
    containerBG: { flex: 1, marginTop: -height * 0.25 }
})