import { prisma } from "../../../../generated/prisma-client"
import { FULL_POST_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        seeUser: async (_, args) => {
            const { username } = args;
            console.log(username);
            const userProfile = await prisma.user({ username });
            const posts = await prisma.user({ username }).posts().$fragment(FULL_POST_FRAGMENT);
            // const userProfile = await prisma.user({id:user.id}).$fragment(USER_FRAGMENT);
            // return userProfile;
            console.log(posts.id)
            return { user : userProfile, posts };
        }
    }
}
