import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        addComment: async (_, args, { request }) => { 
            isAuthenticated(request);
            const { text, postId } = args;
            const { user } = request;
            const addComment = await prisma.createComment({
                user: {
                    connect: {
                        id:user.id
                    }
                },
                post: {
                    connect: {
                        id:postId
                    }
                },
                text
            });
            return addComment;
        }
    }
}