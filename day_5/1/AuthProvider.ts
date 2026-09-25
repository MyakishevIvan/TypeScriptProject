export type AuthProvider =
    | { type: "password"; password: string }
    | { type: "google"; token: string }
    | { type: "github"; token: string };
