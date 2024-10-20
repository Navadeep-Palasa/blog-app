import { Client, Databases ,Storage,Query ,ID} from "appwrite";
import conf from "../conf/conf";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId , slug
            )
            
        } catch (error) {
            console.log('Error in getPost() ::' + error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
            
        } catch (error) {
            console.log('Error in getPosts() ::' + error);
            return false;
        }
    }

    async getActivePosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('status' , 'Active')
                ]
            )
            
        } catch (error) {
            console.log('Error in getActivePosts() ::' + error);
            return false;
        }
    }

    async createPost({slug,title,content,featuerdImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title,content,featuerdImage,status,userId}
            )
            
        } catch (error) {
            console.log('Error in createPost()  ' + error);
            return false;
        }
    }

    async updatePost(slug,{title,content,featuerdImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title,content,featuerdImage,status}
            )
            
        } catch (error) {
            console.log('Error in updatePost()  ' + error);
            return false;
        }
    }

    async deletePost(slug){
        try {
            this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
            
        } catch (error) {
            console.log('Error in deletePost()  ' + error);
            return false;
        }
    }

    // cloud services 

    async addFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log('Error in storageServices :: addFile()  ' + error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
            
        } catch (error) {
            console.log('Error in storageServices :: deleteFile()  ' + error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        ).href

    }

}

const service = new Service()

export default service;
