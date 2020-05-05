import React from 'react';
import {Alert} from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from 'axios';
import Weather from './Weather'

const API_KEY = "405a773528d1231a85b16028ff178535";

export default class extends React.Component {
  state = {
    isLoading : true,
  };
  getWeather = async(latitude, longitude) => {
    const { data : {main : {temp}, weather }} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    this.setState({isLoading:false, condition: "Clear", temp})
  }
  getLocation = async () => {
    try{
      const response = await Location.requestPermissionsAsync();
      const {coords: { latitude, longitude}} = await Location.getCurrentPositionAsync();
      // Send to API and get weather!
      this.getWeather(latitude, longitude);
      this.setState({isLoading: false, condition: weather[0].main})
    } catch (e) {
      Alert.alert("Can't find you.", "So sad");
    }
  }
  componentDidMount() {
    this.getLocation();
  }
  render() { 
    const { isLoading, temp, condition } = this.state;
    return isLoading? <Loading /> : <Weather condition={condition} temp={Math.round(temp)}/>;
  }
}

