import { PrismaClient } from "./generated/prisma";
import { Kafka } from "kafkajs";
const client = new PrismaClient();

const kafka = new Kafka({
  clientId: 'outbox-processor',
  brokers: ['localhost:9092']
})

async function hey(){

    const producer = kafka.producer();
    await producer.connect();
    while(1){
         const pending = await client.outBox.findMany({
            where: {},
            take: 10,
         })
         producer.send({    
                topic: 'outbox_events',
                messages: pending.map(row => ({ value: row.zaprunid }))  
            }).then(() => {
                console.log("send event");
            }).catch(err => {
                console.error(`Failed to send outbox event`, err);
            });
}
}
hey()
