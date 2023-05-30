/* eslint-disable @typescript-eslint/no-empty-function */
import { action, makeAutoObservable, observable } from "mobx";
import AppStore from "..";
import { Resetable } from "../../interfaces/resetable";
import { getData, removeData, storeData } from "../../../hooks/useAsyncStorage";
import type { Player } from "../../../../domain/Player/Player";
import { AuthenticationService, AuthenticationServiceType } from "../../../../application/AuthenticationService";
import { AuthenticationRepositoryI } from "../../../../domain/Authentication/AuthenticationRepository";
import { PlayerService, PlayerServiceType } from "../../../../application/PlayerService";
import { PlayerRepositoryI } from "../../../../domain/Player/PlayerRepository";
import { AuthenticationRepository } from "../../../../infrastructure/repositories/Authentication/AuthenticationRepository";
import { PlayerRepository } from "../../../../infrastructure/repositories/Player/PlayerRepository";
import { PlayerLocalRepository } from "../../../../infrastructure/repositories/Player/PlayerAsyncStorageRepository";
import { AuthenticationLocalRepository } from "../../../../infrastructure/repositories/Authentication/AuthenticationAsyncStorageRepository";

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
    this.service = AuthenticationService;
    this.repository = app.env === "prod" ? AuthenticationRepository : AuthenticationLocalRepository;
    this.playerService = PlayerService;
    this.playerRepository = app.env === "prod" ? PlayerRepository : PlayerLocalRepository;
  }

  reset(): void {
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;
    this.service = null;
    this.repository = null;
    this.playerService = null;
    this.playerRepository = null;
  }

  @action setToken(token: string) {
    if (token) {
      this.token = token;
      storeData("token", token);
    }
  }

  @action setUser(user: Player) {
    this.user = user;
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
        this.setIsAuthenticated(userResult && userResult.nickname);
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
