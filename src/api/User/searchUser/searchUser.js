import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchUser: async (_, args) => await prisma.users({
            where: {
                 OR: [
                { username_contains: args.turm },
                { firstName_contains : args.turm},
                { lastName_contains : args.turm}
            ]
            }
        })
    }
}