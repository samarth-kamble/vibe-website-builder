import { openai, createAgent } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";

import { inngest } from "./client";
import { getSanbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-d", async () => {
      const sandbox = await Sandbox.create("samarth-nextjs-vibe-dev");

      return sandbox.sandboxId;
    });

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

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSanbox(sandboxId);

      const host = sandbox.getHost(3000);

      return `https://${host}`;
    });

    console.log(output);

    return { output, sandboxUrl };
  }
);
