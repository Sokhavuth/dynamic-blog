// src/middleware.js

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken"
import setup from "./setting.js"

export function onRequest ({ locals, request, cookies, redirect }, next) {
    locals.prisma = prisma
    locals.setting = setup()
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