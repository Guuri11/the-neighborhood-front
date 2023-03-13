/* eslint-disable @typescript-eslint/no-empty-function */
import { action, makeAutoObservable, observable } from "mobx";
import AppStore from "..";
import { Resetable } from "../../interfaces/resetable";

class AuthenticationStore implements Resetable {
  appStore!: AppStore;

  @observable user: any = null;
  @observable isAuthenticated = false;

  constructor(app: AppStore) {
    makeAutoObservable(this);
    this.appStore = app;
  }

  reset(): void {
    this.user = null;
    this.isAuthenticated = false;
  }

  @action setUser(user: any) {
    this.user = user;
    this.isAuthenticated = user ? true : false;
  }

  @action register(email: string, password: string) {
  }

  @action login = async (email: string, password: string) => {
  };

  @action logout = async () => {
  };

  @action loginWithGoogle = async () => {
    // Google login code goes here
  };
}

export default AuthenticationStore;
