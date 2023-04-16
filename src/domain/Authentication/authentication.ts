export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
}

export type RegisterResponse = {
    token: string;
}

export type AuthenticationRequest = {
    email: string;
    password: string;
}

export type AuthenticationResponse = RegisterResponse;