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
            // crud 형태의 subscript의 resolve는 쿼리 뮤테이션 서브스크립션 유저링크를 실행한다.
            resolve: payload => payload
        }
    }
}