import { getRecommendation } from "../../../recommendation";
import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: { 
        getRecommendation: async(_, args, { request }) => { 
            isAuthenticated(request);
            // const { user: { id } } = request;
            const id = "ckl4ol115004j0727dmrblb8s";
            const data = await getRecommendation();
            // const arr = data[id]
            const arr = ["ckkq7vmokocxe0a32cu941c25","ckl392ieufjph0a32xa394vfj"]
            const recoPosts = arr.map(async(a) => { 
               return await prisma.post({id:a})
            })
            
            return recoPosts;
        }
    }
}
