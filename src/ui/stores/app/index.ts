import { action } from "mobx";

import { Resetable } from "../interfaces/resetable";
import AuthenticationStore from "./authentication";
import AuthorizationStore from "./authorization";
import LocationStore from "./location";
import UIStore from "./ui";
import { AuthenticationRepository } from "../../../infrastructure/repositories/Authentication/AuthenticationRepository";
import { PlayerRepository } from "../../../infrastructure/repositories/Player/PlayerRepository";
import { CareerHistoryRepository } from "../../../infrastructure/repositories/CareerHistory/CareerHistoryRepository";
import { RepositoryType } from "../../../infrastructure/repositories/types";
import { AuthenticationService } from "../../../application/AuthenticationService";
import { PlayerService } from "../../../application/PlayerService";
import { CareerHistoryService } from "../../../application/CareerHistoryService";
import * as types from "../../../application/types";
import { AuthenticationLocalRepository } from "../../../infrastructure/repositories/Authentication/AuthenticationAsyncStorageRepository";
import { PlayerLocalRepository } from "../../../infrastructure/repositories/Player/PlayerAsyncStorageRepository";
import { CareerHistoryLocalRepository } from "../../../infrastructure/repositories/CareerHistory/CareerHistoryAsyncStorageRepository";

type EnvironmentType = "dev" | "prod";
type ServicesDIType = {
  name: types.ServiceNameType;
  service: types.ServiceType;
  env: EnvironmentType;
  repository: RepositoryType;
};

class AppStore implements Resetable {
  authenticationStore!: AuthenticationStore;
  authorizationStore!: AuthorizationStore;
  locationStore!: LocationStore;
  UIStore!: UIStore;
  env: EnvironmentType;
  services: ServicesDIType[];

  constructor() {
    this.authenticationStore = new AuthenticationStore(this);
    this.authorizationStore = new AuthorizationStore(this);
    this.locationStore = new LocationStore(this);
    this.UIStore = new UIStore(this);
    this.env = "dev";
    this.services = [
      {
        name: "authentication",
        service: AuthenticationService,
        env: "prod",
        repository: AuthenticationRepository
      },
      {
        name: "authentication",
        service: AuthenticationService,
        env: "dev",
        repository: AuthenticationLocalRepository
      },
      {
        name: "player",
        service: PlayerService,
        env: "prod",
        repository: PlayerRepository
      },
      {
        name: "player",
        service: PlayerService,
        env: "dev",
        repository: PlayerLocalRepository
      },
      {
        name: "careerHistory",
        service: CareerHistoryService,
        env: "prod",
        repository: CareerHistoryRepository
      },
      {
        name: "careerHistory",
        service: CareerHistoryService,
        env: "dev",
        repository: CareerHistoryLocalRepository
      }
    ];
  }

  @action reset(): void {
    this.authenticationStore.reset();
    this.authorizationStore.reset();
    this.locationStore.reset();
    this.UIStore.reset();
    this.env = "dev";
    this.services = [];
  }

  @action setEnv(env: EnvironmentType) {
    this.env = env;
  }

  @action getService(name: types.ServiceNameType) {
    return this.services.find((repo) => repo.name === name && this.env == repo.env);
  }
}

export default AppStore;
