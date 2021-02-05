import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        checkemail: (_, args) => {
            const { email } = args;
            return prisma.$exists.user({ email });
        }
    }
}