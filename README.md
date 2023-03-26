# ChatifyUI

Chatify UI is an advanced chatify kit for OpenAI's chat models built on top of [Chatbot UI](https://github.com/mckaywrigley/chatbot-ui) using Next.js, TypeScript, and Tailwind CSS.

See a [demo](https://twitter.com/mckaywrigley/status/1636103188733640704).

![Chatify UI](./public/screenshot.png)

## Updates

Chatify UI will be updated over time.

Expect frequent improvements.

**Next up:**

- [ ] Share your conversation
- [ ] More model settings
- [ ] Custom themes
- [ ] Prompt templates
- [ ] Plugins

**Recent updates:**

- [x] Regenerate & edit responses
- [x] Folders (3/24/23)
- [x] Search chat content (3/23/23)
- [x] Stop message generation (3/22/23)
- [x] Import/Export chats (3/22/23)
- [x] Custom system prompt (3/21/23)
- [x] Error handling (3/20/23)
- [x] GPT-4 support (access required) (3/20/23)
- [x] Search conversations (3/19/23)
- [x] Code syntax highlighting (3/18/23)
- [x] Toggle sidebar (3/18/23)
- [x] Conversation naming (3/18/23)
- [x] Github flavored markdown (3/18/23)
- [x] Add OpenAI API key in app (3/18/23)
- [x] Markdown support (3/17/23)

## Modifications

Modify the chat interface in `components/Chat`.

Modify the sidebar interface in `components/Sidebar`.

Modify the system prompt in `utils/index.ts`.

## Deploy

**Vercel**

Host your own live version of chatify UI with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsyedmuzamilm%2Fchatifyui)

**Docker**

```shell
docker build -t chatgpt-ui .
docker run -e OPENAI_API_KEY=xxxxxxxx -p 3000:3000 chatgpt-ui
```

## Running Locally

**1. Clone Repo**

```bash
git clone https://github.com/syedmuzamilm/chatifyui.git
```

**2. Install Dependencies**

```bash
npm i
```

**3. Provide OpenAI API Key**

Create a .env.local file in the root of the repo with your OpenAI API Key:

```bash
OPENAI_API_KEY=YOUR_KEY
```

**4. Run App**

```bash
npm run dev
```

**5. Use It**

You should be able to start chatting.

## Contact

If you have any questions, feel free to reach out to me on [Twitter](https://twitter.com/syedmuzamilm).
