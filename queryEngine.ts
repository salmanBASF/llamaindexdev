/**

Query engines are powerful interfaces for question-answering (e.g. a RAG pipeline).

 *  The Query Engine allows you to search and retrieve information from the Llamaindex knowledge base using natural language queries.
 It is designed to provide a user-friendly and intuitive way to interact with the data stored in the Llamaindex framework.

The Query Engine uses natural language processing techniques to understand and interpret the user's queries, 
enabling you to ask questions in a conversational manner and receive relevant answers from the knowledge base. 

This can be particularly useful for building chatbots, search engines, question-answering systems,
 and other applications that require natural language understanding capabilities.
 */
import fs from "node:fs/promises";

import {
  Document,
  MetadataMode,
  NodeWithScore,
  VectorStoreIndex,
} from "llamaindex";

async function main() {
  // Load essay from abramov.txt in Node
  const path = "node_modules/llamaindex/examples/abramov.txt";

  const essay = await fs.readFile(path, "utf-8");

  // Create Document object with essay
  const document = new Document({ text: essay, id_: path });

  // Split text and create embeddings. Store them in a VectorStoreIndex
  const index = await VectorStoreIndex.fromDocuments([document]);

  // Query the index as QUERY ENGINE
  const queryEngine = index.asQueryEngine();
  const { response, sourceNodes } = await queryEngine.query({
    query: "Why author main struggle?",
  });

  // Output response with sources
  console.log(response);

  if (sourceNodes) {
    sourceNodes.forEach((source: NodeWithScore, index: number) => {
      console.log(
        `\n${index}: Score: ${source.score} - ${source.node
          .getContent(MetadataMode.NONE)
          .substring(0, 50)}...\n`
      );
    });
  }
}

main().catch(console.error);
