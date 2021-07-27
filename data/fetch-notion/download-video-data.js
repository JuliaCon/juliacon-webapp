/* eslint-disable */

const fs = require("fs");
const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = "e3f1a9eb59b04fb5b37bb2fcf5928582";

function getNotionText(page, key) {
  return page.properties[key].rich_text?.[0]?.plain_text;
}

function getNotionUrl(page, key) {
  return page.properties[key]?.url;
}

function getNotionCheckbox(page, key) {
  return page.properties[key]?.checkbox;
}

async function main() {
  const pages = await getPages();
  const videos = [];

  for (const [i, page] of Object.entries(pages)) {
    const title = page.properties.Name.title?.[0]?.plain_text;
    if (!title) continue;
    const code = getNotionText(page, "Pretalx Code");
    if (!code) {
      throw new Error(`${title} has no Pretalx Code`);
    }
    const yt = getNotionUrl(page, "[internal] YouTube URL");
    if (!yt) {
      continue;
    }

    console.log(`${code}\t${title}\t${yt}`);

    let ytCode;
    if (yt.startsWith("https://youtu.be/")) {
      ytCode = yt.substr("https://youtu.be/".length);
    } else if (yt.startsWith("https://www.youtube.com/watch?v=")) {
      ytCode = yt.substr(
        "https://www.youtube.com/watch?v=".length,
        "G4siuvNMj0c".length
      );
    } else {
      throw new Error(`don't know how to parse YouTube URL: ${title} ${yt}`);
    }

    videos.push({
      id: code,
      youtubeCode: ytCode,
      live: getNotionCheckbox(page, "[internal] Live"),
    });
  }

  // Sort by id to make the line diff churn (in git) minimal
  videos.sort((a, b) => (a.id > b.id ? 1 : -1));
  fs.writeFileSync("../videos.json", JSON.stringify(videos, null, 2));
}

async function getPages() {
  let cursor = undefined;
  let hasMore = true;
  const pages = [];
  while (hasMore) {
    const currentPages = await notion.databases.query({
      database_id: databaseId,
      page_size: 100,
      start_cursor: cursor,
    });
    pages.push(...currentPages.results);
    cursor = currentPages.next_cursor;
    hasMore = currentPages.has_more;
  }

  return pages;
}

main()
  .then(() => console.log("done"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
