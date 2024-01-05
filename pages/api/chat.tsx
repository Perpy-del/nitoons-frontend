// import { getEmbedding } from "@/lib/openai";
// import { chapterIndex } from "@/lib/pinecone";
// import { ChatCompletionMessage } from "openai/resources/index.mjs";

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         const messages: ChatCompletionMessage[] = body.messages;

//         const messagestruncated = messages.slice(-6);

//         const embedding = await getEmbedding(messagestruncated.map(message => message.content).join('\n'));

//         const userId = localStorage.getItem('user_id') as string;

//         const vectorResponse = await chapterIndex.query({
//             vector: embedding,
//             topK: 5,
//             filter: {userId}
//         })
//     } catch (error) {
//         console.error(error);
//         return Response.json({ error: "Internal Server Error"}, {status: 500} )
//     }
// }