declare class LocationDto {
    type: string;
    coordinates: number[];
}
export declare class SignupDto {
    name: string;
    email: string;
    phone: string;
    password: string;
    location: LocationDto;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class UpdatePasswordDto {
    password: string;
    newPassword: string;
}
export declare class ResetPasswordDto {
    password: string;
}
export {};
