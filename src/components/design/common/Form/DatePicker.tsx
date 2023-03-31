import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from "@rneui/base";
import DateTimePicker from '@react-native-community/datetimepicker';
import { UseFormRegister } from 'react-hook-form';

const DatePicker = ({onChange, onBlur, label}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    onChange()
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <Input
        placeholder={label}
        onFocus={showDatepicker}
        value={date.toLocaleDateString()}
        onBlur={onBlur}
        
      />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={handleOnChange}
        />
      )}
    </View>
  );
};

export default DatePicker;