import {User} from "./User";
import {UserRole} from "./UserRole";

class UserManager {
    private users: User[] = [];

    addUser(user: User) {
        const sameUser = this.users.find(result => result.id === user.id);
        if (sameUser) {
            throw new Error(`${user.id} is already in the users`);
        }
        this.users.push(user);
    }

    findUser(id: string): User {
        const result = this.users.find(user => user.id === id);
        if (!result) {
            throw new Error("User not found");
        }

        return result;
    }

    removeUser(id: string) {
        const user = this.findUser(id);
        this.users = this.users.filter(result => result.id !== user.id);
    }

    getActiveUsers(): User[] {
        const result = this.users.filter(user => user.isActive);
        if (result.length === 0) {
            throw new Error("There is no active user");
        }

        return result
    }

    getUsersByRole(role: UserRole): User[] {
        const result = this.users.filter(user => user.role === role);
        if (result.length === 0) {
            throw new Error("There is no  user with role = " + role);
        }

        return result
    }

    getUserByRoles(roles: UserRole[]): User[] {
         let result: User[] = []
        for (const role of roles) {
            const usersByRole = this.getUsersByRole(role);
            result.push(...usersByRole)
        }

        if (result.length === 0) {
            throw new Error("There is no  users with role = " + roles);
        }

        return result
    }
    deactivateUser(id: string) {
        const user = this.findUser(id);
        user.isActive = false;
    }

    activateUser(id: string) {
        const user = this.findUser(id);
        user.isActive = true;
    }

    changeUserRole(id: string, role: UserRole) {
        const user = this.findUser(id);
        if (!user.isActive) {
            throw new Error("User not active");
        }

        user.role = role;
    }

    getUserNames(): Array<string> {
        return this.users.map(user => user.name);
    }

    getUsersWithPhone(): User[] {
         return this.users.filter(user=>user.phone !== undefined)
    }

    findUserByEmail(email: string): User {
        const result = this.users.find(user => user.email === email);
        if (!result) {
            throw new Error("User not found");
        }
        return result;
    }
}