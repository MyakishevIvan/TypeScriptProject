type Success<T> = {
    status: "Success";
    data: T;
}

type Failure = {
    status: "Failure";
    message: string;
}

type ApiResponse<T> = Success<T> | Failure;

function unwrap<T>(response: ApiResponse<T>): T | null {
    if (response.status === "Success") {
        return response.data;
    }
    return null;
}