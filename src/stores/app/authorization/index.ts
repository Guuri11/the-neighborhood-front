import { action, makeAutoObservable, observable } from "mobx";
import AppStore from "..";
import { storeData } from "../../../hooks/useAsyncStorage";
import { Resetable } from "../../interfaces/resetable";


class AuthorizationStore implements Resetable {
  appStore!: AppStore;

  @observable showIntro: "0" | "1" = "0";

  @observable firstTime: "0" | "1" = "1";

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

  @action setIsFirstTime(value: "0" | "1") {
    this.firstTime = value;
    storeData("firstTime", value)
  }
}

export default AuthorizationStore;
