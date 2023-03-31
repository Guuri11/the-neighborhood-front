import React from 'react';
import { Picker } from '@react-native-picker/picker';

const CustomPicker = ({ items, selectedValue, onValueChange, style, register, name }) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={style}
      {...register(name)}
    >
      {items.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

export default CustomPicker;