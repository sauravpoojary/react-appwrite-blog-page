import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call login

        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Error in signing up !!");
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Error in logging in !!");
      throw error;
    }
  }

  //to check if user is logged in or not
  //get current user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("User is not athenticated");
    }

    return null;
  }

  async logout() {
    try {
      console.log("Logging out ...");
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Error Logging out ...");
    }
  }
}

const authService = new AuthService();

export default authService;
