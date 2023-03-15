import { Button, Text } from "@rneui/base";
import React, { useCallback, useEffect } from "react";
import * as ExpoLocation from "expo-location";
import { Alert } from "react-native";
import { useLocationStore } from "../../../hooks/store";
import { observer } from "mobx-react-lite";
import Template from "../../design/layout/Template";
import Heading from "../../design/common/Heading";

const LocationPage = observer(() => {
  const locationStore = useLocationStore();
  const [status] = ExpoLocation.useForegroundPermissions();

  const setLocationAutomatically = useCallback(async () => {
    if (status && status.granted) {
      locationStore.setLocation(await ExpoLocation.getCurrentPositionAsync({}));
    }
  }, [status]);

  useEffect(() => {
    setLocationAutomatically();
  }, [status]);

  const handleLocation = async () => {
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }
    locationStore.setLocation(await ExpoLocation.getCurrentPositionAsync({}));
  };

  return (
    <Template transparent={false}>
      <Text>Logo</Text>
      <Heading size={2}>Have you activated localization?</Heading>
      <Text>Easily find services near you by activating location</Text>
      <Button title='Yes, activate my location' loading={false} onPress={handleLocation} />
    </Template>
  );
});

export default LocationPage;
