import {AuthProvider} from "./AuthProvider";
import {AuthResult} from "./AuthResult";

export abstract class Authenticator {
    abstract authenticate(provider: AuthProvider): AuthResult;

    protected createToken(userId: number): string {
        return `Bearer ${userId}`;
    }
}