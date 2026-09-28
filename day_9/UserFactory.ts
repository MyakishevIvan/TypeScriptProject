import {User} from "./Models";

export class UserFactory {
    private id: number = 0

    create(): User {
        return {
            id: this.id++,
            name: "Name" + this.id,
            email: "email " + this.id
        }
    }
}