import React, {PropTypes} from 'react';
import {
  View,
  ScrollView,
  PermissionsAndroid,
  BackHandler,
  ActivityIndicator
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { getDistance } from 'geolib';
import firebase from 'react-native-firebase'

import { Ad } from './ad'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentAd : {
        "id": "0",
        "logo": "https://facebook.github.io/react-native/img/tiny_logo.png",
        "titleImage": "https://www.solwininfotech.com/wp-content/uploads/2016/10/Diwali-Offer-Flat-40-discount-at-Product-Store.png",
        "title": " Default title",
        "description": " Default Description  ",
        "offers": [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSn3CRoRqyjupWdE2RL_WRsqBk0D0YiH-WeXc2sK6TEwq1Xw2Yk",
          "https://assets.mspimages.in/wp-content/uploads/2018/10/Screen-Shot-2018-10-20-at-10.03.00-AM-696x354.png",
          "https://www.couponraja.in/theroyale/wp-content/uploads/2016/10/Diwali-Sale-by-Amazon-Flipkart-and-Snapdeal-631x480.jpg"
        ]
      },
      currentLocation : {
        latitude: 0,
        longitude:0
      },
      clientData: [],
      adData: []
    }
  }

  componentDidMount(){
    this.setState({loading: true})
    this.requestCameraPermission()
    firebase.database().ref('clientData').once('value', (data) => {
      this.setState({clientData: data.val()})
      this.setState({loading: false})
    })

    firebase.database().ref('adData').once('value', (data) => {
      this.setState({adData: data.val()})
      this.getCurrentLocation()
    })

  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'location access permission',
          message:
            'This app need permission to use location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        BackHandler.exitApp()
      }
    } catch (err) {
      console.warn(err);
    }
  }

  getCurrentLocation = () => {
    this.locationWatcher = Geolocation.watchPosition( (pos) => this.updateLocation(pos), (e) => console.log(e), { enableHighAccuracy: true, distanceFilter: 1, interval: 500, fastestInterval: 500, })
  }

  updateLocation = (position) => {
    currentLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    this.setState({ currentLocation })
    this.updateAd()
  }

  updateAd = () => {
    let start = this.state.currentLocation
    let currentAd_id = 0
    let clientData = this.state.clientData

    clientData.map(location => {
      let end = {
        latitude: location.latitude,
        longitude: location.longitude
      }
      let distance = getDistance(start, end, 0.1)
      if (distance < location.radius) {
        currentAd_id = location.ad_id ;
        return ;
      }
    })

    this.setState({ currentAd: this.state.adData[currentAd_id]})
  }

  componentWillUnmount = () => {
    // Geolocation.clearWatch(this.locationWatcher)
  }

  render() {
    const { currentAd, loading } = this.state ;
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    else {
      return <Ad data = {currentAd}/>;
    }
  }
}
