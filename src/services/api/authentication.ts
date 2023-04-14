import { HOST } from ".";
import { RegisterRequest, RegisterResponse } from "../../domain/Authentication/authentication";

const path = `${HOST}/api/v1/auth`;


export const register = async (request: RegisterRequest): Promise<RegisterResponse | any> => fetch(`${path}/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(request),
  }).then((response) => response.json())