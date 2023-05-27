import { AuthenticationRepositoryI} from "../../../domain/Authentication/AuthenticationRepository";
import { AuthenticationRequest, AuthenticationResponse, RegisterRequest, RegisterResponse } from "../../../domain/Authentication/authentication";
import { HOST } from "..";

const path = `${HOST}/api/v1/auth`;

const register = async (request: RegisterRequest): Promise<RegisterResponse | any> =>
  fetch(`${path}/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(request),
  }).then((response) => {
    return { status: response.status, response: response.json() };
  });
const login = async (
  request: AuthenticationRequest,
): Promise<AuthenticationResponse> =>
  fetch(`${path}/authenticate`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(request),
  }).then(async (response) => {
    return { status: response.status, response: response.json() };
  });

const logout = () => console.log('logout');

export const AuthenticationRepository: AuthenticationRepositoryI = {
    login,
    register,
    logout,
}
