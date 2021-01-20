import { prisma } from "../../../../generated/prisma-client";
import { SEARCH_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        searchPost: async (_, args) => await prisma.posts({
            where: {
                OR: [
                    { location_starts_with : args.term},
                    { caption_starts_with : args.term}
                ]
            }
        }).$fragment(SEARCH_FRAGMENT)
    }
}