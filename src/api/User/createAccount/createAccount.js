import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { username, email, firstName, lastName, bio } = args;
            const existname = await prisma.$exists.user({ username });
            const existemail = await prisma.$exists.user({email});
            if (existname) {
                throw Error('Woops! 이미 사용중인 이름이에요!');
            } else if (existemail) { 
                throw Error('Woops! 이미 사용중인 이메일이에요!!');
            }
            await prisma.createUser({ username, email, firstName, lastName, bio });
            return true;
        } 
    }
};