import { prisma } from '../../../../generated/prisma-client';
import { generateSecret, sendSecretMail } from '../../../utils';



export default {
    Mutation: {
        requestSecret: async (_, args) => {
            const { email } = args;
            const loginSecret = generateSecret();
            const exitst = await prisma.$exists.userLogin({ email });
            if (exitst) {
                return false

            } else {
                await prisma.createUserLogin({ email });
                await prisma.updateUserLogin({ data: { loginSecret }, where: { email } })
                return true;
            }
        }
    }
}