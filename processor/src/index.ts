import { PrismaClient } from "./generated/prisma";
const client = new PrismaClient();

async function hey(){
    while(1){
         const pending = await client.outBox.findMany({
            where: {},
            take: 10,
         })
         pending.forEach(row => {
         })



}
}
