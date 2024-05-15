# HOW TO RUN



install
`pnpm i`

run
`pnpm run {filename}`
`npx tsx ./{filename}.ts`


## CONCEPT

### BASIC IMPORT
```typescript
import { Document, VectorStoreIndex } from "llamaindex";
```


### DOCUMENTS
a "Document" refers to a unit of information or a piece of content that is stored and managed within the framework. Documents in Llamaindex can represent various types of data, such as text, images, structured data, or any other form of content that you want to store and retrieve.

```typescript
 //Load essay from abramov.txt in Node
  const path = "node_modules/llamaindex/examples/abramov.txt";

  const essay = await fs.readFile(path, "utf-8");

  // Create Document object with essay
  const document = new Document({ text: essay, id_: path });
```
In the context of the Llamaindex data framework, a Document" refers to a unit of **information or a piece of content** that is stored and managed within the framework. Documents in Llamaindex can represent **various types of data, such as text, images,** structured data, or any other form of content that you want to store and retrieve.




### INDEX
an Index refers to a **data structure that organizes and stores information in a way that enables efficient search and retrieval operations.**

Indexing plays a crucial role in optimizing the performance of search queries within the framework by facilitating quick access to relevant data based on user queries.

 Vectors are numerical representations of data points in a multi-dimensional space, often used in machine learning and natural language processing tasks.
    
```typescript
    // Create Document object with essay
    const document = new Document({ text: essay, id_: document_path });
    // Create Index
    const index = await VectorStoreIndex.fromDocuments([document]);
```

The VectorStoreIndex in the Llamaindex data framework is **a specialized type of indexing mechanism that is designed to efficiently store and retrieve vector representations of data.**

Some key features and functionalities of the VectorStoreIndex in Llamaindex may include:

- Vector Representation: Storing and indexing data in vector form, enabling efficient mathematical operations and similarity calculations.

- Similarity Search: Allowing users to search for vectors that are similar to a given query vector, based on similarity measures such as cosine similarity or Euclidean distance.

- Clustering: Supporting clustering algorithms that group similar vectors together in the vector space, facilitating data exploration and analysis.

- Recommendation Systems: Enabling the development of recommendation systems that suggest items or content based on similarities between vectors representing user preferences and item features.

Scalability: Handling large volumes of vector data and providing efficient indexing and retrieval mechanisms for high-dimensional vector spaces



### QueryEngine
The Query Engine in Llamaindex is a powerful feature that allows you to **search and retrieve information from the Llamaindex knowledge base** using natural language queries.
```typescript
  // Split text and create embeddings. Store them in a VectorStoreIndex
  const index = await VectorStoreIndex.fromDocuments([document]);

  // Query the index as QUERY ENGINE
  const indexAsQueryEngine = index.asQueryEngine();
  const { response, sourceNodes } = await indexAsQueryEngine.query({
    query: "Why author main struggle?",
  });
```

The Query Engine uses natural language processing techniques to understand and interpret the user's queries, enabling you to ask questions in a conversational manner and receive relevant answers from the knowledge base. 

By leveraging the Query Engine in Llamaindex, you can access a vast amount of structured and unstructured data, perform complex searches, and extract valuable insights from the data repository.

 This feature enhances the usability and accessibility of the Llamaindex framework, making it easier for developers and users to interact with the data and leverage its capabilities for various applications.


### The chat engine 
 Chat Engine is a class that allows you to **create a chatbot from a retriever**. It is a wrapper around a retriever that allows you to chat with it in a conversational manner.

The Chat Engine in Llamaindex is a **component that allows you to build conversational interfaces, such as chatbots**, using the Llamaindex data framework. It enables you to create interactive chat experiences where users can engage in conversations with the chatbot to ask questions, receive information, and perform tasks.

```typescript

    import { stdin as input, stdout as output } from "node:process";
    import readline from "node:readline/promises";

    const index = await VectorStoreIndex.fromDocuments([document]);

    const indexAsRetriever = index.asRetriever();

    // Create a new ContextChatEngine with the retriever
    const chatEngine = new ContextChatEngine({ indexAsRetriever });

   
    // Create a readline interface for reading user input from stdin and writing output to stdout
    const rl = readline.createInterface({ input, output });

    while (true) {
        const query = await rl.question("Query: ");

        const stream = await chatEngine.chat({ message: query, stream: true });
   
        for await (const chunk of stream) {
            process.stdout.write(chunk.response);
        }
    }

```

The Chat Engine leverages the natural language processing capabilities of the Llamaindex framework to **understand user input, generate responses**, and **maintain context** during the conversation. It provides a seamless way to interact with the Llamaindex knowledge base and retrieve relevant information based on user queries.

By using the Chat Engine in Llamaindex, you can develop chatbot applications that can handle a wide range of user interactions, provide personalized responses, and simulate natural conversations. This can be beneficial for customer support, information retrieval, task automation, and other use cases where a conversational interface can enhance user experience and efficiency.

Overall, the Chat Engine in Llamaindex empowers developers to create intelligent chatbots and conversational agents that leverage the data and knowledge stored in the Llamaindex framework to deliver meaningful and engaging interactions with users.