import { prisma } from "../../../../generated/prisma-client"
import { SEARCH_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        seeUser: async (_, args) => {
            const { username } = args;
            const userProfile = await prisma.user({ username });
            const posts = await prisma.user({ username }).posts().$fragment(SEARCH_FRAGMENT);
            // const userProfile = await prisma.user({id:user.id}).$fragment(USER_FRAGMENT);
            // return userProfile;
            return { user : userProfile, posts };
        }
    }
}
