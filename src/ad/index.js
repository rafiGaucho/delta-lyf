import React, {PropTypes} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const screeHeight = Dimensions.get('window').height
const screeWidth = Dimensions.get('window').width

export const  Ad = ({data}) => {
  return (
    <ScrollView contentContainerStyle ={{ width:'100%',backgroundColor:'white'}}>

      <LinearGradient colors={[ '#ddd7d7','white','#ddd7d7','#ede7b6', 'white','#f9f4f4']}  style = {{ alignItems:'center'}}>
        <Image  style ={{ height: 50, width: 50,margin:'5%', marginRight: 'auto'}}  source={{uri: data.logo}}/>

        <Image  style ={{ height: screeHeight/2, width: '94%'}} resizeMode = "contain" source={{uri: data.titleImage}}/>


        <Text style = {{fontSize: 30, color: 'black', paddingLeft: '5%', fontWeight: 'bold'}}>{data.title}</Text>

        <Text style = {{textAlign: 'center', fontSize: 16, padding:10, paddingBottom:20, color:'#211d1d'}}>{data.description}</Text>

        <Text style = {{fontSize: 28, color: '#00090f', fontWeight:'bold', marginRight:'auto', paddingLeft: '5%', paddingTop: 20, paddingBottom: 10}}>OFFERS:</Text>

      <View style={{width:'100%'}}>
        <ScrollView horizontal={true} contentContainerStyle = {{ }}>
          {
            data.offers.map((item, index) => {
              return <Image key = {index} style ={{ height: screeHeight/4, width: 300, borderRadius: 5, marginBottom: 15, marginHorizontal:10}} resizeMode = "stretch" source={{uri: item}}/>
            })
          }
        </ScrollView>
      </View>

      </LinearGradient>
    </ScrollView>
  );
}
