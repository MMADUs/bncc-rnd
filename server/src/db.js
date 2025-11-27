import { PrismaClient } from "@prisma/client";

const clientOpt = {
  log: process.env.QUERY_LOG === 'true' 
  ? ['query', 'info', 'warn', 'error']
  : ['warn', 'error']
}

const db = new PrismaClient(clientOpt);

export default db;