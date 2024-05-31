import { Role } from "../role/role.enum";
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: Role;
}
export declare class UpdateUserDto {
    name: string;
    phone: string;
    role: Role;
}
