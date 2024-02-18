export interface LoggedUser {
    token: string
    username: string,
    role: userRole
}

export interface User {
    username: string,
    password: string,
}

type userRole = "admin" | "user"