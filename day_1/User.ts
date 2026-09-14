import {UserRole} from "./UserRole";
import {UserProfile} from "./UserProfile";

export class User implements UserProfile {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean = true
    address: string | undefined;
    age: number | undefined;
    phone: string | undefined;

    constructor(id: string, name: string, email: string, role: UserRole) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    updateProfile(profile: UserProfile) {
        this.address = profile.address ?? this.address;
        this.age = profile.age ?? this.age;
        this.phone = profile.phone ?? this.phone;
    }

    activate() {
        this.isActive = true;
    }

    deactivate() {
        this.isActive = false;
    }

    changeRole(role: UserRole) {
        this.role = role;
    }

    getInfo(): string {
        return `${this.name} (${this.role}) - ${this.isActive ? "active" : "inactive"} \n
        ${this.phone ? `Phone ${this.phone}` : ""}\n
        ${this.address ? `Address ${this.address}` : ""}\n
        ${this.age ? `Age ${this.age}` : ""}`;
    }

}