import { openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "writer",
      system:
        "You are expert next.js developer. you can write readable, maintainable code. You write a simple Next.js & React snippets.",
      model: openai({
        apiKey: process.env.OPENAI_API_KEY,
        baseUrl: "https://api.chatanywhere.tech/v1",
        model: "gpt-4.1",
      }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`
    );

    console.log(output);

    return { output };
  }
);
