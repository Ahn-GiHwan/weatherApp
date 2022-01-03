import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  LogBox,
} from "react-native";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import dayjs from "dayjs";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  LogBox.ignoreLogs(["Remote debugger"]);

  const now = dayjs();
  const today = now.format("YYYY년 MM월 DD일");

  const API_KEY = "5459d8f9dd0632df6f0fc2b95f46ea5d";

  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
      return;
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    setCity(location[0].city);

    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&units=metric&appid=${API_KEY}`
    );

    setDays(data.daily);
  };

  const iconsName = {
    Snow: "snowflake",
    Clouds: "cloud",
    Clear: "sun",
    Rain: "cloud-rain",
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      {!ok ? (
        <View style={styles.error}>
          <Ionicons name="warning-outline" size={120} color="white" />
          <Text style={styles.errorText}>위치 정보를 허용해 주세요</Text>
        </View>
      ) : (
        <>
          <View style={styles.city}>
            <Text style={styles.cityName}>
              <Ionicons name="md-location-outline" size={58} color="white" />
              {city}
            </Text>

            <Text style={{ color: "white" }}>{today}</Text>
          </View>
          <ScrollView horizontal pagingEnabled indicatorStyle="white">
            {days.length === 0 ? (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
              days.map((day, i) => (
                <View style={styles.day} key={i}>
                  <View style={styles.icon}>
                    <FontAwesome5
                      name={iconsName[day.weather[0].main]}
                      size={125}
                      color="white"
                    />
                  </View>
                  <View style={styles.info}>
                    <Text style={{ color: "white" }}>
                      {i === 0
                        ? "Today"
                        : now.add(i, "day").format("YYYY년 MM월 DD일")}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.temp}>
                        {Number(day.temp.day).toFixed(1)}
                      </Text>
                      <Text style={{ color: "white", marginTop: 7 }}>℃</Text>
                    </View>
                    <Text style={styles.description}>
                      {day.weather[0].main}
                    </Text>
                    <Text style={styles.tinyText}>
                      {day.weather[0].description}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </>
      )}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  error: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "white",
    fontSize: 25,
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
    color: "white",
  },
  day: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  icon: {
    flex: 4,
    alignItems: "center",
  },
  info: {
    flex: 3,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  temp: {
    fontSize: 40,
    color: "white",
  },
  description: {
    fontWeight: "600",
    fontSize: 60,
    color: "white",
  },
  tinyText: {
    fontSize: 20,
    color: "white",
  },
  loading: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
});
