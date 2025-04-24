export interface UserCreateDTO {
    username: string;
    password: string;
    role: 'USER' | 'ADMIN';
    firstName: string;
    lastName: string;
    sex: string;
    age: number;
    email: string;
}