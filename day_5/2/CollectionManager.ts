import {User} from "../../day_1/User";
import {UserRole} from "../../day_1/UserRole";

class CollectionManager {
    users: User[]
    roles: Set<UserRole>
    usersById: Map<number, User>


    constructor(users: User[], roles: Set<UserRole>, usersById: Map<number, User>) {
        this.users = users;
        this.roles = roles;
        this.usersById = usersById;
    }

    getActiveUser(): User[] {
        return this.users.filter(user => user.isActive)
    }

    getUserNames(): string[] {
        return this.users.map(user => user.name);
    }

    findUser(id: string): User | undefined {
        return this.users.find(user => user.id === id)
    }

    findUserIndex(id: string): number {
        return this.users.findIndex(user => user.id === id)
    }

    hasAdmin(): boolean {
        return this.users.some(user => user.isAdmin)
    }

    allUsersActive(): boolean {
        return this.users.every(user => user.isActive)
    }

    hasUserName(name: string): boolean {
        return this.getUserNames().includes(name)
    }

    sortUsersByName(): User[] {
        return [...this.users].sort((a, b) => a.name.localeCompare(b.name));
    }

    getUsersCountByRole(): Record<UserRole, number> {
        return this.users.reduce<Record<UserRole, number>>(
            (acc, user) => {
                acc[user.role]++;
                return acc;
            },
            {
                admin: 0,
                manager: 0,
                user: 0
            }
        );
    }

    logUsers(): void {
        for (const user of this.users) {
            console.log(user);
        }
    }

    getAllPermissions(): string[] {
        return this.users.flatMap(user => user.permissions);
    }

    addRole(role: UserRole): void {
        this.roles.add(role);
    }

    removeRole(role: UserRole): void {
        this.roles.delete(role);
    }

    hasRole(role: UserRole): boolean {
        return this.roles.has(role);
    }

    getRoleCount(): number {
        return this.roles.size;
    }

    getRoles(): UserRole[] {
        return [...this.roles]
    }

    addUser(user: User): void {
        this.usersById.set(1, user);
    }

    getUser(id: number): User | undefined {
        return this.usersById.get(id)
    }

    hasUser(id: number): boolean {
        return this.usersById.has(id);
    }

    removeUser(id: number): boolean {
        return this.usersById.delete(id);
    }

    getUserCount(): number {
        return this.usersById.size
    }
}