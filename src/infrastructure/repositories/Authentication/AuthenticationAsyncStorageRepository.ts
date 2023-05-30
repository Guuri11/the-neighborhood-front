import { AuthenticationRepositoryI } from "../../../domain/Authentication/AuthenticationRepository";
import {
  AuthenticationRequest,
  RegisterRequest,
  RegisterResponse,
} from "../../../domain/Authentication/authentication";
import { uniqueId } from "lodash";
import { storeData } from "../../../ui/hooks/useAsyncStorage";

export const AuthenticationLocalRepository: AuthenticationRepositoryI = {
  login: async (request: AuthenticationRequest): Promise<RegisterResponse | any> => {
    storeData("userEmail", request.email);
    storeData("userPassword", request.password);
    const token = uniqueId(request.email);
    return new Promise<RegisterResponse>((resolve, reject) => {
      const response = new Promise<{
        token: string;
      }>((resolve) => resolve({ token }));
      setTimeout(() => {
        resolve({ status: 200, response });
      }, 1000);
    });
  },
  register: async (request: RegisterRequest): Promise<AuthenticatorResponse | any> => {
    storeData("mock-user-name", request.name);
    storeData("userEmail", request.email);
    storeData("userPassword", request.password);
    const token = uniqueId(request.email);
    return new Promise<RegisterResponse>((resolve, reject) => {
      const response = new Promise<{
        token: string;
      }>((resolve) => resolve({ token }));
      setTimeout(() => {
        resolve({ status: 200, response });
      }, 1000);
    });
  },
};
