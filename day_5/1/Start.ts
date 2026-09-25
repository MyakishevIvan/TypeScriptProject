import {AuthProvider} from "./AuthProvider";
import {AuthResult} from "./AuthResult";

function getProviderInfo(provider: AuthProvider): string {
    switch (provider.type) {
        case "google":
            return "Google authentication";
        case "github":
            return "Github authentication"
        case "password":
            return "Github authentication"
        default:
            throw Error("Unsupported provider type");
    }
}

function getAuthMessage(result: AuthResult): string {
    if (result.success) {
        return "Authenticated: " + result.token;
    } else {
        return "Authentication failed: " + result.error;
    }
}