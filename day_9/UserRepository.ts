import {User} from "./Models";
import {Repository} from "./Repository";

export class UserRepository implements Repository<User> {
    private users: User[] = [];

    add(user: User): void {
        this.users.push(user);
    }

    get(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }

    getAll(): User[] {
        return this.users;
    }


}