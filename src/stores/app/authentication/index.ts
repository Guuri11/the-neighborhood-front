/* eslint-disable @typescript-eslint/no-empty-function */
import { action, makeAutoObservable, observable } from "mobx";
import AppStore from "..";
import { Resetable } from "../../interfaces/resetable";
import { storeData } from "../../../hooks/useAsyncStorage";
import type { Player } from "../../../domain/Player";
import { me } from "../../../services/api/player";

class AuthenticationStore implements Resetable {
  appStore!: AppStore;

  @observable user: Player = null;
  @observable token: string = null;
  @observable isAuthenticated = false;

  constructor(app: AppStore) {
    makeAutoObservable(this);
    this.appStore = app;
  }

  reset(): void {
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;
  }

  @action setToken(token: string) {
   this.token = token;
   storeData("token", token);
  }

  @action setUser(user: Player) {
    this.user = user;
    this.isAuthenticated = user && user.nickname ? true : false;
  }

  @action getSelf = async () => {
    try {
      const userResult = await me(this.token)
      if (userResult?.email) {
        this.setUser(userResult);
        return;
      }
      this.appStore.UIStore.notification.addNotification(userResult.error, "error");
    } catch (error) {
      this.appStore.UIStore.notification.addNotification("Unhandled error", "error");
    }
  };
}

export default AuthenticationStore;
