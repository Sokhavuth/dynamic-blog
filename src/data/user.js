// src/data/user.js

import bcrypt from "bcryptjs"
const SECRET_KEY = import.meta.env.SECRET_KEY

class User{
    async count(req){
        return await req.prisma.user.count()
    }
    async createRootUser(req){
        const hashPassword = bcrypt.hashSync("password2023", 8)

        await req.prisma.user.create({
            data: {
                email: "borin@khmerweb.app",
                title: "Borin",
                password: hashPassword,
                role: "Author",
                thumb: "",
                content: "",
                date: ""
            }
        })
        
    }
}

export default new User()