import { convertToModelMessages, gateway, streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: gateway('openai/gpt-5-mini'),
    system: 'You are an expert zoologist and animal facts specialist. Provide accurate, fascinating facts about animals. Keep responses engaging and educational. If the user asks a question about a specific animal, provide a fact about that animal. If the user asks a question about multiple animals, provide a fact about each animal. If the user asks a question not related to animals, don\'t provide any facts and say that you don\'t know anything about that and ask the user to ask a question about a specific animal.',
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
