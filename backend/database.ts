import logger from 'morgan';
import path from 'path';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import { v4 } from 'uuid';
import lowdb from "lowdb";
import shortid from "shortid";
import { DbSchema } from "../src/models/db-schema";
import FileSync from "lowdb/adapters/FileSync";
import Fuse from 'fuse.js';
import { 
    map,
    curry,
    flow
} from 'lodash';
import { User } from './../src/models';

const USER_TABLE = "users";

const databaseFile = path.join(__dirname, "../data/database.json");

const adapter = new FileSync<DbSchema>(databaseFile);
const db = lowdb(adapter);

export const seedDatabase = () => {
    const testSeed = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "data", "database-seed.json"), "utf-8")
    )

    db.setState(testSeed).write();
    return;
}

export const cleanSearchQuery = (query: string) => query.replace(/[^a-zA-Z0-9]/g,'');
export const setupSearch = curry((items: object[], options: {}, query: string) => {
    const fuse = new Fuse(items,options);
    return fuse.search(query);
})
export const performSearch = (items: object[], options: {}, query: string) => {
    let q = cleanSearchQuery(query);
    return setupSearch(items, options, q).map(result => result.item);
}
    // flow(
    //     cleanSearchQuery,
    //     setupSearch(items, options),
    //     map((result: any) => result.item)
    // )(query);

export const searchUsers = (query: string) => {
    const items = getAllUsers();
    return performSearch(
        items,
        {
            keys: ["firstName", "lastName", "username", "email", "phoneNumber"]
        },
        query 
    ) as User[];
}

export const getBy = (entity: keyof DbSchema, key: string, value:any):any => {
    const result = db.get(entity)
                    // @ts-ignore
                    .find({[`${key}`]:value}).value();

    return result;
}

// User
export const getUserBy = (key:string, value:any) => getBy(USER_TABLE,key,value);

export const getUserById = (id:string) => getUserBy('id', id)

export const getAllUsers = () => db.get(USER_TABLE).value();