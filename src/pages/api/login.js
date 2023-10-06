// src/pages/api/login.js

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const SECRET_KEY = import.meta.env.SECRET_KEY

export async function POST({cookies, redirect, request, locals}){
  const prisma = locals.prisma
  const body = await request.json()
  const user = await prisma.user.findUnique({ where: {email: body.email }})

  if(user){
    if(bcrypt.compareSync(body.password, user.password)){
      const userAuth = {userId: user.id, userRole: user.role, userName: user.title}
      const token = jwt.sign(userAuth, SECRET_KEY, {expiresIn: 60*60*12})
      cookies.set("access_token", token, { httpOnly: true, path: "/"})
      return redirect('/admin', 302)
    }else{
      const message = 'ពាក្យ​សំងាត់​មិន​ត្រឹមត្រូវ​ទេ'         
      return new Response(JSON.stringify(message))
    }
  }else{
    const message = 'Email មិន​ត្រឹមត្រូវទេ'
    return new Response(JSON.stringify(message))
  }
}