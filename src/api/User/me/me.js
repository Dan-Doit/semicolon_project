import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"
import { FULL_POST_FRAGMENT } from "../../../fragments";


export default {
    Query: {
        me: async (_, __, { request }) => { 
            isAuthenticated(request);
            const { user } = request;
            const userProfile = await prisma.user({ id: user.id });
            const posts = await prisma.user({ id: user.id }).posts().$fragment(FULL_POST_FRAGMENT);
            // const userProfile = await prisma.user({id:user.id}).$fragment(USER_FRAGMENT);
            // return userProfile;
            return { user : userProfile, posts };
        }
    }
}