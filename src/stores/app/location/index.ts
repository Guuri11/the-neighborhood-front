import type { LocationObject } from "expo-location";
import { action, makeAutoObservable, observable } from "mobx";
import AppStore from "..";
import { Resetable } from "../../interfaces/resetable";

class LocationStore implements Resetable {
  appStore!: AppStore;

  @observable location: LocationObject = null;

  constructor(app: AppStore) {
    makeAutoObservable(this);
    this.appStore = app;
  }

  reset(): void {
    this.location = null;
  }

  @action setLocation(location: LocationObject): void {
    this.location = location;
  }
}

export default LocationStore;
