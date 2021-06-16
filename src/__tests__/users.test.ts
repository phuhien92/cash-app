import { seedDatabase, getAllUsers, searchUsers } from "../../backend/database";

import { User } from './../models';

describe("Users", () => {
    beforeEach(() => {
        seedDatabase();
    });

    test("should get a user by email address", () => {
        const userToLookup: User = getAllUsers()[0];
        const { email } = userToLookup;
        const users = searchUsers(email);
        
        expect(users.length).toBeGreaterThanOrEqual(1);
        expect(users[0].id).toBe(userToLookup.id);
    });

    test("should get a user by username", () => {
        const userToLookup: User = getAllUsers()[0];
        const { email } = userToLookup;
        const users = searchUsers(email);
        expect(users.length).toBeGreaterThanOrEqual(1);
        expect(users[0].id).toBe(userToLookup.id);
    })
})
