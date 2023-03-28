import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CustomPicker = ({ items, selectedValue, onValueChange, style }) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={style}
    >
      {items.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

export default CustomPicker;