import { AuthenticationRepositoryI } from "../../domain/Authentication/AuthenticationRepository";
import { CareerHistoryRepositoryI } from "../../domain/CareerHistory/CareerHistoryRepository";
import { PlayerRepositoryI } from "../../domain/Player/PlayerRepository";

export type OptionsInfraType = {
    token: string
}

export type RepositoryType =
  | PlayerRepositoryI
  | CareerHistoryRepositoryI
  | AuthenticationRepositoryI;
