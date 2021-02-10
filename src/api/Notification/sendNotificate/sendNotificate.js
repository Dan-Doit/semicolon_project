import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"
import axios from 'axios';

export default {
    Mutation: {
        sendNotificate: async (_, args, { request }) => {
            isAuthenticated(request);
            const { username, to, from, message, post, state } = args;
            const { moToken } = await prisma.user({ id: to });
            const pongst = post.split(',');
            console.log(pongst[1])

            if (state === "1") {

                const notification = await prisma.createNotification({
                    to: { connect: { id: to } },
                    from:{connect:{id:from}}
                    
                });
                return true;

            } else if (state === "2") {
                
                const notification = await prisma.createNotification({
                    to: { connect: { id: to } },
                    from:{connect:{id:from}},
                    message:{connect:{id:message}}
                    
                });
                return true;

            } else if (state === "3") { 
                if (pongst[1] === "false") {
                    try { 
                    await axios.post("https://exp.host/--/api/v2/push/send", {
                        to: moToken,
                        title: "좋아요 알림!",
                        body: `${username}님이 회원님의 게시물에 좋아요를 눌렀습니다.`,
                        badge: 1
                        });

                    await prisma.createNotification({
                        to: { connect: { id: to } },
                        post: { connect: { id: pongst[0] } },
                        from:{connect:{id:from}}
                
                    });
                    return true;
                    } catch (e) {  
                        console.log(e)
                        return false;
                    }
                } else { 
                    return false;
                }          
                
            }
        }
    }
}