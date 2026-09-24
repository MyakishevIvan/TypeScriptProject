export type AuthResult =
    | { success: true; token: string }
    | { success: false; error: string };