import { UserDatabase } from "../database/UserDatabase";

import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/loginDTO";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signupDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import {  User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";

export class UserBusiness {
    constructor (
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { name, email, password } = input

        const id = this.idGenerator.generate()
        //const userDBExists = await this.userDatabase.findUserById(id)

        /* if (userDBExists) {
            throw new BadRequestError("id já existe.")
        } */
        const hashedPassword = await this.hashManager.hash(password)
        const newUser = new User(
            id,
            name,
            email,
            hashedPassword
        )
        const newUserDB = newUser.toDBModel()
        await this.userDatabase.insertUser(newUserDB)

        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName()
            
        }
        const token = this.tokenManager.createToken(tokenPayload)

        const output:SignupOutputDTO = {
            message: "Usuário cadastrado com sucesso!",
            token
        }
        return output
    }

    public getUsers = async (input: any) => {
        const { q } = input
        const usersDB = await this.userDatabase.findUsers(q)
        const users: User[] = usersDB.map((userDB) => new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password
        ))
        const output = users.map((user) => ({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword()
        }))
        return output
    }
    public login = async (input:LoginInputDTO):Promise<LoginOutputDTO> => {
        const { email, password} = input
        const userDB = await this.userDatabase.findUserByEmail(email)
        if (!userDB) {
            throw new NotFoundError("'Email' não encontrado.")
        }

        const isPasswordCorrect = await this.hashManager.compare(password, userDB.password)
        if (!isPasswordCorrect) {
            throw new BadRequestError("'Password' incorreto.")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password
        )

        const tokenPayload: TokenPayload ={
            id: user.getId(),
            name: user.getName()
        }
        const token = this.tokenManager.createToken(tokenPayload)

        const output:LoginOutputDTO = {
            message:"Login realizado com sucesso.",
            token
        } 
        return output
    }
}