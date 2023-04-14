import React, { useCallback, useEffect, useState } from "react";
import Template from "../../design/layout/Template";
import { useLocationStore } from "../../../hooks/store";
import { observer } from "mobx-react-lite";
import MapView, { Marker } from "react-native-maps";
import { Park } from "../../../domain/Park";
import { transformLocation } from "../../../utils/tranformLocation";
import { Icon, SearchBar } from "@rneui/themed";
import { GRAY_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from "../../../assets/colors";
import * as Location from "expo-location";
import { StyleSheet } from "react-native";

const Neighborhood = observer(() => {
  const locationStore = useLocationStore();
  const [parks, setParks] = useState<Park[]>([]);

  const handleLocationChange = useCallback((location) => {
    locationStore.setLocation(location);
  }, []);

  useEffect(() => {
    setParks([
      { id: 1, name: "Park lorem", location: "39.48168020309881:-0.39736634326647874", courts: [] },
    ]);
  }, []);

  useEffect(() => {
    (async () => {
      const subscription = await Location.watchPositionAsync(
        { distanceInterval: 10 },
        handleLocationChange,
      );
      return () => subscription.remove();
    })();
  }, [handleLocationChange]);

  return (
    <Template paddingFull>
      {locationStore.location && (
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: locationStore.location.coords.latitude,
            longitude: locationStore.location.coords.longitude,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0221,
          }}
          showsUserLocation
        >
          <Marker
            coordinate={{
              latitude: locationStore.location.coords.latitude,
              longitude: locationStore.location.coords.longitude,
            }}
          >
            <Icon type='ionicon' name='ellipse' color={PRIMARY_COLOR} style={{ height: 30 }} />
          </Marker>
          {parks.map((park) => {
            return (
              <Marker
                key={park.id}
                coordinate={transformLocation(park.location)}
                title={park.name}
                description={"Lorem ipsum"}
              >
                <Icon
                  type='material-community'
                  name='basketball-hoop'
                  color={SECONDARY_COLOR}
                  style={{ height: 30 }}
                />
              </Marker>
            );
          })}
        </MapView>
      )}
      <SearchBar
        platform='default'
        containerStyle={styles.searchBarContainer}
        placeholder='Search a park...'
        placeholderTextColor={GRAY_COLOR}
      />
    </Template>
  );
});

const styles = StyleSheet.create({
  searchBarContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    borderWidth: 0, //no effect
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    borderRadius: 50,
  },
});

export default Neighborhood;
