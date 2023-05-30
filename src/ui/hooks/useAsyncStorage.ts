import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

type LocalStorageKeyType =
  | "userEmail"
  | "userPassword"
  | "token"
  | "showIntro"
  | "firstTime"
  | "mock-user-name"
  | "mock-user-nickname"
  | "mock-user-height"
  | "mock-user-weight"
  | "mock-user-birthdate"
  | "mock-user-level"
  | "mock-user-experience"
  | "mock-user-position"
  | "mock-user-gender"
  | "mock-user-archetype"
  // we'll save all career histories mocked in an array, we'll do then a .find to get the
  // careerhistory from a specific user
  | "mock-users-careerhistories";

const LOCAL_STORAGE_KEYS = [
  "userEmail",
  "userPassword",
  "token",
  "showIntro",
  "firstTime",
  "mock-user-name",
  "mock-user-nickname",
  "mock-user-height",
  "mock-user-weight",
  "mock-user-birthdate",
  "mock-user-level",
  "mock-user-experience",
  "mock-user-position",
  "mock-user-gender",
  "mock-user-archetype",
  "mock-users-careerhistories"
]

export const storeData = async (key: LocalStorageKeyType, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
    Alert.alert("Async storage error", e);
  }
};

export const storeObject = async (key: LocalStorageKeyType, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
    Alert.alert("Async storage error", e);
  }
};

export const getData = async (key: LocalStorageKeyType) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    console.log(e);
    Alert.alert("Async storage error", e);
  }
};

export const getObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    Alert.alert("Async storage error", e);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
    Alert.alert("Async storage error", e);
  }
};

export const removeAllData = async () => {
  try {
    await AsyncStorage.multiRemove(LOCAL_STORAGE_KEYS);
  } catch (e) {
    console.log(e);
    Alert.alert("Async storage error", e);
  }
};

export const useAsyncStorage = () => {
  return { getObject, getData, storeObject, storeData, removeData };
};
