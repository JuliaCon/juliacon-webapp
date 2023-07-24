# Code of Conduct

See the [Julia Community Standards](https://julialang.org/community/standards/).

# Workflow

1. Clone the repository.
   ```bash
   git clone https://github.com/JuliaCon/juliacon-webapp.git
   ```
1. Install the dependencies.
   ```bash
   npm ci
   ```
1. Check out a branch to make your changes.
   Your branch should have an informative name (e.g., `add-talk-description` or `fix-youtube-link`, **not** `update`).
   Optionally, you can prefix your branchname with your initials (e.g., `td/add-talk-description` since my name is Travis DePrato).
   ```bash
   git checkout -b td/add-talk-description
   ```
1. Start the development server.
   ```bash
   npm run dev
   ```
1. Open the site on your browser.
   Navigate to http://localhost:3000/.
   The changes you make in your editor should live-reload instantly.
1. Commit your changes to git and push them to GitHub.
   Your commit messages should be concise and informative.
   ```bash
   git add .
   git commit -m "Add the talk description to the talk overview page"
   git push
   ```
1. Create a pull request on GitHub (simply opening the repository page in GitHub should show a banner at the top and prompt you to open a new PR).
   Commenting with which pages were changed (to help review be faster) is very appreciated.
   Wait for PR approval.
   Vercel will automatically generate a deployment preview link and add a comment with the URL.
   Please make sure everything works as expected.

## Submitting your pull request

Please prefer small (<= 100 lines) PR's.
It's much better to have a series of small PR's than a single monster PR.

Please also include a screenshot of your changes if applicable.
Vercel will automatically generate a deploy link and people can go test out your application, but it's much easier if you just include a screenshot as well.

### Guidelines for approval

I don't want to be overly authoritarian about PR approval.
I will be looking for a few basic things:

- Does the code do what it's supposed to do?
- Are there bugs?
- Is the code relatively straightforward and idiomatic?
- Are there [accessibility issues](https://www.w3.org/WAI/fundamentals/accessibility-intro/)?

If I request changes, please know that your code is not **bad**, and that we are here to help each other.
Code reviews are meant to help the reviewer and the reviewee learn and to ensure that the project is the best it can possibly be.

## What to do if stuck

Feel free to open WIP (work in progress) PRs and ask for help.
Try to do your homework before doing so (e.g., don't ask questions that can be answered by Googling your words verbatim).

# What do I need to know?

- Basic knowledge of TypeScript is required (if you have JavaScript knowledge, you're probably fine).
- Basic knowledge of React (using hooks) is required.
- Knowledge of GraphQL is helpful.

# How is the project structured?

## Framework

The project uses [Next.JS](https://nextjs.org/) as the primary framework.
This provides server-side rendering for a React application, which greatly increases the performance of the site.

## File Structure

Individual pages are defined in `./src/pages`.
NextJS uses file-based routing, so `./src/pages/foo.tsx` corresponds to the `/foo` URL on the site.
Pages in `./src/pages/api` are serverless functions (so they act as REST/GraphQL endpoints rather than pages that a user is intended to see).

Re-usable components are defined in `./src/components`. Some re-usable React hooks are defined in `./src/hooks`. Some utilities are defined in `./src/utils`.

Additionally, `./src/apollo` contains the code for the Apollo GraphQL client in the frontend.

The `./src/server` directory contains code that is only meant to be run on the server.

# What is the goal?

Unfortunately, Pretalx is not terribly well suited to what we're trying to do, so we're making our own.
Essentially, the goal is to have a single place where someone can experience the conference.

The main feature of the site is going to be a live conference view page, where you can choose from any of the active talks.
The talks should automatically roll over into the next talk in the track at the scheduled time.

## "Soft" Goals

- We want to convery, as best as we can, the feeling that people are actually attending an event.
  A large portion of this is allowing conference-goers to engage in conversation and discussion like they would at an in-person event.

# Conference Technical Details

- Most(?) talks will be pre-recorded as YouTube videos and will be scheduled to be released at their talk time.
- Talks are scheduled concurrently in a variety of different tracks.
- Keynotes will be livestreamed during a single-track session.
- There will be scheduled "poster session" time
- We will use Discord as the primary means of communication between conference goers during the conference.
  Talk speakers will be available on Discord during their talk to answer audience questions.
