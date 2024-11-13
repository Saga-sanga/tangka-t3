# Tangka

This is a web based POS system targeted towards small and medium businesses

## Prerequisites

Make sure you have the following installed in your system:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.dev/en/)
- [Git](https://git-scm.com/)
- [pnpm](https://pnpm.io/)

Read this document to understand basic git workflow: [link](https://github.com/chingu-voyages/Handbook/blob/main/docs/resources/techresources/gitgithub.md)

## Getting started

- Create a fork of the repo
- Clone your forked repo locally `git clone <repo_link>`
- `cd` into the cloned directory
- Run `cp .env.example .env` and set up env variables
- Create an upstream to the main repo `git remote add upstream https://github.com/Saga-sanga/tangka-t3.git`
- To update your fork with the main repo run `git pull upstream main`. Make sure you update your repo regularly to keep up with the main repo.
- Create a new branch `git checkout -b <branch_name>`
- Run `docker compose up` and start developing

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!
