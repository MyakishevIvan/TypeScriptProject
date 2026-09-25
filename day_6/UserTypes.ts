import {User} from "../day_1/User";

export type UserUpdate = Partial<User>;
export type UserReadonly = Readonly<User>;

const partial: UserUpdate = {
    phone : "123"
}
const userPick: Pick<User, "id"| "role"> = {
    id: "",
    role: "admin"

}

