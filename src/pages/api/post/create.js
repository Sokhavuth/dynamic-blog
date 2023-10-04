// src/pages/api/post/create.js

import jwt from "jsonwebtoken"

export async function POST({locals, redirect, request, cookies}){
    const prisma = locals.prisma
    const data = await request.formData()
    const title = data.get('title')
    console.log(locals.userAuth)
    return redirect('/admin', 302)
}