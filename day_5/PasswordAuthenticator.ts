import {Authenticator} from "./Authenticator";
import {AuthProvider} from "./AuthProvider";
import {AuthResult} from "./AuthResult";

class PasswordAuthenticator extends Authenticator {
    authenticate(provider: AuthProvider): AuthResult {
        if (provider.type === "password") {
            if (!provider.password) {
                return {success: true, token: super.createToken(123)};
            }
        }

        return {success: false, error: "invalid authentication"};
    }
}