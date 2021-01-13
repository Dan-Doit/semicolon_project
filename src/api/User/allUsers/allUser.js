import { prisma } from '../../../../generated/prisma-client';

export default { 
    Query: {
        allUsers: async (_, args) => await prisma.users()
    }
}