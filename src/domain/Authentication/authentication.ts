export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
}

export type RegisterResponse = {
    token: string;
}