import { AuthenticationRepositoryI } from "../domain/Authentication/AuthenticationRepository";
import { AuthenticationRequest, RegisterRequest } from "../domain/Authentication/authentication";

export type AuthenticationServiceType = {
  login: (repository: AuthenticationRepositoryI, request: AuthenticationRequest) => Promise<any>,
  register: (repository: AuthenticationRepositoryI, request: RegisterRequest) => Promise<any>,
}

export const AuthenticationService: AuthenticationServiceType = {
  login: (repository: AuthenticationRepositoryI, request: AuthenticationRequest) =>
    repository.login(request),
  register: (repository: AuthenticationRepositoryI, request: RegisterRequest) =>
    repository.register(request),
};
