import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from "@rneui/base";
import DateTimePicker from '@react-native-community/datetimepicker';
import { UseFormRegister } from 'react-hook-form';

type DatePickerProps = {
  register: UseFormRegister<any>;
  name: string;
};

const DatePicker = ({register, name}: DatePickerProps) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    register(name);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <Input
        placeholder="Fecha de nacimiento"
        onFocus={showDatepicker}
        value={date.toLocaleDateString()}
        {...register(name)}
      />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;