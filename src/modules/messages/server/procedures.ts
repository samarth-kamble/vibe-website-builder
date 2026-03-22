import {z} from "zod"

import {inngest} from "@/inngest/client"
import {prisma} from "@/lib/db"
import { baseProocedure, createTRPCRouter } from "@/trpc/init"

export const messagesRouter = createTRPCRouter({
    getMany: baseProocedure.query(async () => {
     const messages = await prisma.message. findMany({
        orderBy: {
            updatedAt: "asc"
        },

     })
     return messages;
    }),
    create: baseProocedure.input(
        z.object({
            value: z.string().min(1, "Message is required"),
        })
    )
    .mutation(async ({input}) => {
        const createdMessage = await prisma.message.create({
            data: {
                content:input.value,
                role: 'USER',
                type:"RESULT"
            }
        })

        await inngest.send({
            name: "code-agent/run",
            data: {
                value: input.value,
            },
        });

        return createdMessage;
    })
})