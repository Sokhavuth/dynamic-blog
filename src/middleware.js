// src/middleware.js

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
 
export function onRequest ({ locals, request }, next) {
    locals.prisma = prisma
    return next()
}