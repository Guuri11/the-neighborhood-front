/* eslint-disable @typescript-eslint/no-empty-function */
import { action, makeAutoObservable, observable } from "mobx";
import AppStore from "..";
import { Resetable } from "../../interfaces/resetable";
import { getData, removeData, storeData } from "../../../hooks/useAsyncStorage";
import type { Player } from "../../../../domain/Player/Player";
import { AuthenticationServiceType } from "../../../../application/AuthenticationService";
import { AuthenticationRepositoryI } from "../../../../domain/Authentication/AuthenticationRepository";
import { PlayerServiceType } from "../../../../application/PlayerService";
import { PlayerRepositoryI } from "../../../../domain/Player/PlayerRepository";

class AuthenticationStore implements Resetable {
  appStore!: AppStore;

  @observable user: Player = null;
  @observable token: string = null;
  @observable isAuthenticated = false;
  service: AuthenticationServiceType = null;
  repository: AuthenticationRepositoryI = null;
  playerService: PlayerServiceType = null;
  playerRepository: PlayerRepositoryI = null;

  constructor(app: AppStore) {
    makeAutoObservable(this);
    this.appStore = app;
    this.service = this.appStore.getService("authentication").service as AuthenticationServiceType;
    this.repository = this.appStore.getService("authentication").repository as AuthenticationRepositoryI;
    this.playerService = this.appStore.getService("player").service as PlayerServiceType;
    this.playerRepository = this.appStore.getService("player").repository as PlayerRepositoryI;
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

  @action setIsAuthenticated(authenticated: boolean) {
      this.isAuthenticated = authenticated;
  }

  @action login = async () => {
    try {
      removeData("token");
      const email = await getData("userEmail");
      const password = await getData("userPassword");

      if (email && password) {
        const loginResult = await this.service.login(this.repository, { email: email, password: password });

        if (loginResult.status === 400) {
          this.isAuthenticated = false;
          return;
        }


        this.setToken((await loginResult.response).token);
      } else {
        this.isAuthenticated = false;
      }
    } catch (error) {
      this.appStore.UIStore.notification.addNotification("Unhandled error", "error");
    }
  };

  @action getSelf = async () => {
    try {
      const userResult = await this.playerService.me(this.playerRepository, this.token);
      if (userResult?.email) {
        this.setUser(userResult);
        return;
      }
      this.login();
    } catch (error) {
      this.login();
    }
  };

  @action logout = () => {
    removeData("token");
    removeData("userEmail");
    removeData("userPassword");
    this.isAuthenticated = false;
  }
}

export default AuthenticationStore;
