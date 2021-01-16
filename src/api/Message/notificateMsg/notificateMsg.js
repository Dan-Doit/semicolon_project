import { prisma } from "../../../../generated/prisma-client"


export default {
    Subscription: {
        notificateMsg: {
            subscribe: async (_, args) => {
                const { roomId } = args;
                return await prisma.$subscribe.message({
                    AND: [
                        { mutation_in: "CREATED" },
                        { node: { room: { id: roomId } } }
                    ]
                }).node();

            },
            // crud 형태의 subscript의 resolve는 
            resolve: payload => payload
        }
    }
}