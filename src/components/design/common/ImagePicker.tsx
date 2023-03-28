import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacityComponent, View } from 'react-native';
import * as ImagePickerExpo from 'expo-image-picker';
import { Button, Icon } from '@rneui/base';

export default function ImagePicker() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePickerExpo.launchImageLibraryAsync({
      mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={pickImage} buttonStyle={{ backgroundColor: "#EEEEEE", borderRadius: 100, paddingHorizontal: 20, paddingVertical: 20 }}>
            <Icon name="image-outline" type="ionicon" />
        </Button>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
