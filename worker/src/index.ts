import { Kafka } from 'kafkajs';
import { PrismaClient } from "./generated/prisma";

const TOPIC = 'outbox_events';
const client = new PrismaClient();
const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
}) 
async function hey() {
    while(1){
        const consumer = kafka.consumer({ groupId: 'woker_main' });
        await consumer.connect();
        await consumer.subscribe({ topic: TOPIC, fromBeginning: true });
        await consumer.run({
          autoCommit:false,
            eachMessage: async ({ topic, partition, message }) => {
              console.log({
                offset: message.offset,
                value: message.value?.toString()
              })
              await new Promise(resolve => setTimeout(resolve, 5000)); //  need to do somethng here in the future

              await consumer.commitOffsets([
                { topic:TOPIC, 
                  partition:partition, 
                  offset: (parseInt(message.offset)+1).toString()
                }
              ]);
            } 
        }
        )
    }
}
hey()
 