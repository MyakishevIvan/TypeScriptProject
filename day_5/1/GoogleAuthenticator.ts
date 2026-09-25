import {Authenticator} from "./Authenticator";
import {AuthProvider} from "./AuthProvider";
import {AuthResult} from "./AuthResult";

class GoogleAuthenticator extends Authenticator {
    authenticate(provider: AuthProvider): AuthResult {
        if (provider.type === "google") {
            return {success: true, token: provider.token};
        }

        return {success: false, error: "invalid authentication"};

    }

}