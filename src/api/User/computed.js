import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    followingCount: (parent) =>
            prisma
                .usersConnection({ where: { followers_some: { id:parent.id } } })
                .aggregate()
        .count(),
    
    followersCount: (parent) =>
            prisma
                .usersConnection({ where: { following_some: { id:parent.id } } })
                .aggregate()
        .count(),
    postsCount: (parent) => 
                 prisma
                .postsConnection({ where: { user: { id:parent.id } } })
                .aggregate()
        .count(),
    
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [
            {
              id: user.id
            },
            {
              following_some: {
                id: parentId
              }
            }
          ]
        });
      } catch {
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};