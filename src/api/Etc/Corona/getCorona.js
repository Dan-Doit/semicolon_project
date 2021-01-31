import { covid19 } from "../../../covid19";

export default {
    Query: { 
        covid19: async (_, args) => { 
            const { location } = args;
            const data = await covid19();
            const { newCase } = data[location];
            console.log(newCase);
            return newCase;
        }
    }

}
