declare class LocationDto {
    type: string;
    coordinates: number[];
}
export declare class SignupDto {
    name: string;
    email: string;
    phone: string;
    password: string;
    businessName?: string;
    businessEmail?: string;
    businessPhone?: string;
    cacRegistration?: string;
    businessLocation?: string;
    homeAddress?: string;
    cityOfResidence?: string;
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
