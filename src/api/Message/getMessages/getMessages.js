import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Query: {
    getMessages: (_, args, { request }) => {
      isAuthenticated(request);
        //   const { RoomId } = args;
          const RoomId = "ckkqfcpg4d99w0928ro6hozpl";
          return prisma.messages({ where: { room: { id: RoomId } } })
    }
  }
};