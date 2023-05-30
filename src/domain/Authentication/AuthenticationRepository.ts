import { AuthenticationRequest, AuthenticationResponse, RegisterRequest, RegisterResponse } from "./authentication";

export interface AuthenticationRepositoryI {
    login: (request: AuthenticationRequest) => Promise<AuthenticationResponse | any>;
    register: (request: RegisterRequest) => Promise<RegisterResponse | any>;
}
