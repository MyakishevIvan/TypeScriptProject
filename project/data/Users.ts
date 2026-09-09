import {Credentials} from "../models/Credentials";
import {Customer} from "../models/Customer";

export const standardUser: Credentials = {password: "secret_sauce", username: "standard_user"}
export const lockedUser: Credentials = {password: "secret_sauce", username: "locked_out_user"}
export const custromer: Customer = {firstName: "Ivan", lastName: "Myakishev", postalCode: "123"}