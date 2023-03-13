import { action, makeAutoObservable, observable } from "mobx";
import AppStore from "..";
import { storeData } from "../../../hooks/useAsyncStorage";
import { Resetable } from "../../interfaces/resetable";


class AuthorizationStore implements Resetable {
  appStore!: AppStore;

  @observable showIntro: "0" | "1" = "0";

  constructor(app: AppStore) {
    makeAutoObservable(this);
    this.appStore = app;
  }

  reset(): void {
    this.showIntro = "0";
  }

  @action setShowIntro(value: "0" | "1") {
    this.showIntro = value;
    storeData("showIntro", value)
  }
}

export default AuthorizationStore;
