import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        seeFeed: async (_, __, { request }) => { 
            isAuthenticated(request);
            const { user } = request;
            const following = await prisma.user({ id: user.id }).following();
            return prisma.posts({
                // in은 내가 직접준 테이블값을 비교할때 사용
                where: { user: { id_in: [...following.map(user => user.id), user.id] } },
                orderBy : "createdAt_DESC"
            });
        }
    }
}