import { LatLng } from "react-native-maps";

export const transformLocation = (location: string):LatLng => {
  const coords = location.split(":");
  return { latitude: parseFloat(coords[0]), longitude: parseFloat(coords[1]) };
};
