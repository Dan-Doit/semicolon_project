import axios from 'axios';

export const getRecommendation = async () => { 
        try {
            const { data } = await axios.get(`http://218.156.65.175:5000/recommendation/key=teamsemicolon`);
            console.log(data["ckl4ol115004j0727dmrblb8s"][0])
            return data;
        } catch (e) { 
            console.log("데이터가 존재 하지 않습니다.");
            return [];
        }
}