import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const connectClient = async () => {
  await prisma.$connect()
  return prisma
}
