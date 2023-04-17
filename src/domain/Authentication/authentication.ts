export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
}

export type RegisterResponse = {
    status: number;
    response: Promise<{token: string}>;
}

export type AuthenticationRequest = {
    email: string;
    password: string;
}

export type AuthenticationResponse = RegisterResponse;