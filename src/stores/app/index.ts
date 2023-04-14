import { action } from "mobx";

import { Resetable } from "../interfaces/resetable";
import AuthenticationStore from "./authentication";
import AuthorizationStore from "./authorization";
import LocationStore from "./location";
import UIStore from "./ui";

class AppStore implements Resetable {
  authenticationStore!: AuthenticationStore
  authorizationStore!: AuthorizationStore
  locationStore!: LocationStore
  UIStore!: UIStore

  constructor() {
    this.authenticationStore = new AuthenticationStore(this);
    this.authorizationStore = new AuthorizationStore(this);
    this.locationStore = new LocationStore(this);
    this.UIStore = new UIStore(this);
  }

  @action reset(): void {
    this.authenticationStore.reset();
    this.authorizationStore.reset();
    this.locationStore.reset();
    this.UIStore.reset();
  }

}

export default AppStore;
