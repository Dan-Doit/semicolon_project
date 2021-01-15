import { prisma } from "../../../../generated/prisma-client"

export default {
    Query: {
        seeUser: async (_, args) => {
            const { id } = args;
            const userProfile = await prisma.user({ id });
            const posts = await prisma.user({ id }).posts();
            // const userProfile = await prisma.user({id:user.id}).$fragment(USER_FRAGMENT);
            // return userProfile;
            return { user : userProfile, posts };
        }
    }
}
