import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { username, email, firstName, lastName, bio } = args;
            const exists = await prisma.$exists.user({
                OR: [
                    { username }, {email}
            ]});
            if (exists) {
                throw Error('Woops! 이미 사용중인 이름 또는 이메일이에요!');
            }
            await prisma.createUser({ username, email, firstName, lastName, bio });
            return true;
        } 
    }
};