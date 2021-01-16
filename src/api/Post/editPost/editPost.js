import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
    Mutation: {
        editPost: async (_, args, { request })=>{
            isAuthenticated(request);
            const { user } = request;
            const { id, location, caption, action } = args;
            const post = await prisma.$exists.post({ id, user:{id:user.id}});
            if (post) {
                if (action === EDIT) {
                    return await prisma.updatePost({ data: { location, caption }, where: { id } });
                } else if (action === DELETE) {
                    return await prisma.deletePost({ id });
                }
            } else { 
                throw new Error('당신의 글이 아닙니다 ㅎㅎ');
            }
            
        } 
    }
}