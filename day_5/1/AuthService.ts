import {Authenticator} from "./Authenticator";
import {AuthResult} from "./AuthResult";
import {AuthProvider} from "./AuthProvider";

class AuthService {
    constructor(private authenticator: Authenticator) {}

    login(provider: AuthProvider): AuthResult {
        return this.authenticator.authenticate(provider);
    }

    setAuthenticator(authenticator: Authenticator): void {
        this.authenticator = authenticator
    }
}