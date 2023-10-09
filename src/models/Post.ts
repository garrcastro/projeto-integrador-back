
export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number
    
}

export interface PostWithCreatorDB extends PostDB {
    creator_name: string
}

export interface PostModel {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    
    creator:{
        
        creatorName: string
    }
}

export interface LikeDislikeDB{
    user_id: string,
    post_id: string,
    like: number
}

export enum POST_LIKE{
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
}

export class Post {
    constructor(
        private id: string, 
        private creator_id: string, 
        private content: string,
        private likes: number,
        private dislikes: number,
        
        private creatorName: string
    ){}

    public getId(): string {
        return this.id
    }
    
    public getContent(): string {
        return this.content
    }
    public setContent(value: string): void{
        this.content = value
    }
    public getLikes(): number{
        return this.likes
    }
    public setLikes(value: number): void{
        this.likes = value
    }  
    public addLike(){
        this.likes += 1
    }
    public removeLike(){
        this.likes -= 1
    }
    public addDislike(){
        this.dislikes += 1
    }
    public removeDislike(){
        this.dislikes -= 1
    }
    public getDislikes(): number{
        return this.dislikes
    }
    public setDislikes(value: number): void{
        this.dislikes = value
    }
    

    public getCreatorId(): string {
        return this.creator_id
    }

    public setCreatorId(value: string): void {
        this.creator_id = value
    }

    public getCreatorName(): string {
        return this.creatorName
    }

    public setCreatorName(value: string): void {
        this.creatorName = value
    }

    public toDBModel(): PostDB{
        return{
            id: this.id,
            creator_id: this.creator_id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes
            
        }
    }

    public toBusinessModel(): PostModel{
        return{
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            
            creator: {
                
                creatorName: this.creatorName
            }
        }
    }
}