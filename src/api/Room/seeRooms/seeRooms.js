import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        seeRooms: (_, __, { request }) => { 
            isAuthenticated(request);
            const { user } = request;
            // some은 다른테이블의 요소를 비교할때 사용을 한다.
            return prisma.rooms({ where: { participants_some: { id: user.id } } }).$fragment(ROOM_FRAGMENT);
        }
    }
}