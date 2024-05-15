/**
Chat engines are conversational interfaces for multi-message, "back and forth" interactions with your data.

 * NOTE:
The Chat Engine in Llamaindex is a component that allows you to build conversational interfaces, 
such as chatbots, using the Llamaindex data framework.

It enables you to create interactive chat experiences where users can engage in conversations with the chatbot 
to ask questions, receive information, and perform tasks.

The Chat Engine leverages the natural language processing capabilities of the Llamaindex framework 
to understand user input, generate responses, and maintain context during the conversation. 
It provides a seamless way to interact with the Llamaindex knowledge base and retrieve relevant information 
based on user queries.

By using the Chat Engine in Llamaindex, you can develop chatbot applications that can handle a wide range of user
 interactions, provide personalized responses, and simulate natural conversations. 
 
 This can be beneficial for customer support, information retrieval, task automation, 
 and other use cases where a conversational interface can enhance user experience and efficiency.

Overall, the Chat Engine in Llamaindex empowers developers to create intelligent chatbots 
and conversational agents that leverage the data and knowledge stored in the Llamaindex framework to
 deliver meaningful and engaging interactions with users.
 */

import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";

import {
  ContextChatEngine,
  Document,
  Settings,
  VectorStoreIndex,
} from "llamaindex";

const essay = "/essay/ucl.txt";

// Update chunk size
Settings.chunkSize = 512;

async function main() {
  // Create a new Document object with the specified text
  const document = new Document({ text: essay });

  // Create a VectorStoreIndex from the array of documents, in this case only one document
  // Split text and create embeddings. Store them in a VectorStoreIndex
  const index = await VectorStoreIndex.fromDocuments([document]);

  // Create a retriever from the index
  const retriever = index.asRetriever();

  // Set the number of top similar documents to retrieve
  retriever.similarityTopK = 5;

  // Create a new ContextChatEngine with the retriever
  const chatEngine = new ContextChatEngine({ retriever });

  // Create a readline interface for reading user input from stdin and writing output to stdout
  const rl = readline.createInterface({ input, output });

  while (true) {
    const query = await rl.question("Query: ");

    /**
     * Chat Engine is a class that allows you to create a chatbot from a retriever.
     It is a wrapper around a retriever that allows you to chat with it in a conversational manner.
     */
    const stream = await chatEngine.chat({ message: query, stream: true });
    console.log();

    for await (const chunk of stream) {
      process.stdout.write(chunk.response);
    }
  }
}

main().catch(console.error);
