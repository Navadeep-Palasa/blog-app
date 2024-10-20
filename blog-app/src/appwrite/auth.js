import conf from "../conf/conf";
import {Account , Client, ID} from 'appwrite'

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({name,email,password}){
        try {
            const userAccount =  await this.account.create(
                ID.unique(),
                name,
                email,
                password
            )
            if(userAccount)
                return this.login({email,password});
            else
                return userAccount;
            
        } catch (error) {
            console.log('Erroe in createAccount()' + error)
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            console.log('Erroe in createAccount()' + error)
        }
    }
    async logout(){
        try {
            // logout from current device
            return await this.account.deleteSession('current')
            // logout from all devices
            // return await this.account.deleteSessions()
        } catch (error) {
            console.log('Erroe in logout()' + error)
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Erroe in getCurrentUser()' + error)
        }

    }
    
}

const authService = new AuthService()

export default authService;