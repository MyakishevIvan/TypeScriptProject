import {Authenticator} from "./Authenticator";
import {AuthProvider} from "./AuthProvider";
import {AuthResult} from "./AuthResult";

class GitHubAuthenticator extends Authenticator {
    authenticate(provider: AuthProvider): AuthResult {
        if (provider.type === "github") {
            return {success: true, token: provider.token};
        }

        return {success: false, error: "invalid authentication"};
    }

}