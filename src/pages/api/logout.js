// src/pages/api/logout.js

export async function GET({ cookies, redirect }){
    cookies.delete("access_token", {path: '/'})
    return redirect('/login', 302)
}