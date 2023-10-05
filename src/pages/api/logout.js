// src/pages/api/logout.js

import jwt from "jsonwebtoken"

export async function GET({ locals, cookies, redirect }){
    cookies.delete("access_token", { path: '/' })
    return redirect('/login', 302)
}