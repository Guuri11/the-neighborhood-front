import React from 'react';
import { Picker } from '@react-native-picker/picker';

const CustomPicker = ({ items, selectedValue, onValueChange, style, label }) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={style}
      placeholder={label}
    >
      {items.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

export default CustomPicker;