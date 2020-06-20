# What do I need to know?
* Basic knowledge of TypeScript is required (if you have JavaScript knowledge, you're probably fine).
* Basic knowledge of React (using hooks) is required.
* Knowledge of GraphQL is helpful.

# How is the project structured?

## Framework
The project uses [Next.JS](https://nextjs.org/) as the primary framework.
This provides server-side rendering for a React application, which greatly increases the performance of the site.

## File Structure
Individual pages are defined in `./src/pages`.
NextJS uses file-based routing, so `./src/pages/foo.tsx` corresponds to the `/foo` URL on the site.
Pages in `./src/pages/api` are serverless functions (so they act as REST/GraphQL endpoints rather than pages that a user is intended to see).

Re-usable components are defined in `./src/components`. Some re-usable React hooks are defined in `./src/hooks`. Some utilities are defined in `./src/utils`.

Additionally, `./src/apollo` contains the code for the Apollo GraphQL client in the frontend, and `./src/apollo-server` contains the code for the Apollo GraphQL server backend.

The `./src/pretalx` directory contains code that details with extracting data out of Pretalx. For performance reasons, we're extracting the responses from the Pretalx API into JSON files that are checked into the repository (since they're reasonably small).

# What is the goal?
Unfortunately, Pretalx is not terribly well suited to what we're trying to do, so we're making our own.
Essentially, the goal is to have a single place where someone can experience the conference.

The main feature of the site is going to be a live conference view page, where you can choose from any of the active talks.
The talks should automatically roll over into the next talk in the track at the scheduled time.

## "Soft" Goals
* We want to convery, as best as we can, the feeling that people are actually attending an event.
  A large portion of this is allowing conference-goers to engage in conversation and discussion like they would at an in-person event.
  
# Conference Technical Details
* Most(?) talks will be pre-recorded as YouTube videos and will be scheduled to be released at their talk time.
* Talks are scheduled concurrently in a variety of different tracks.
* Keynotes will be livestreamed during a single-track session.
* There will be scheduled "poster session" time
* We will use Discord as the primary means of communication between conference goers during the conference.
  Talk speakers will be available on Discord during their talk to answer audience questions.
