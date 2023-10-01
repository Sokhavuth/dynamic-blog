// src/middleware.js

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken"

export function onRequest ({ locals, request, cookies }, next) {
    locals.prisma = prisma
    const token = cookies.get('access_token')
    
    if(!token){
        return next()
    }

    try{
        const userAuth = jwt.verify(token.value, import.meta.env.SECRET_KEY)
        if(userAuth.userRole === "Admin"){
            locals.userAdmin = userAuth.userRole
        }
        locals.userAuth = userAuth
    }catch(err){
        console.log(err.message)
    }

    return next()
}