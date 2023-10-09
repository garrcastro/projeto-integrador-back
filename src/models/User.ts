

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string
    
   
}

export interface UserModel {
    id: string,
    name:string,
    email:string
}

export class User {
    constructor(
        private id: string, 
        private name: string, 
        private email: string,
        private password: string
    ){}

    public getId(): string {
        return this.id
    }
    public setId(value: string): void {
        this.id = value
    }
    public getName(): string {
        return this.name
    }
    public getEmail(): string {
        return this.email
    }
    public getPassword(): string {
        return this.password
    }
  
    public toDBModel(): UserDB {
        return {
            id:this.id,
            name:this.name,
            email:this.email,
            password:this.password
        }
    }
    public toBusinessModel(): UserModel {
        return {
            id:this.id,
            name:this.name,
            email:this.email

        }
    }
}