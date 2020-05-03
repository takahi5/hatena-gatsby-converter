const turndown = require("turndown");
const fs = require("fs");
const moment = require("moment");

const FILE_PATH = process.argv[2];
if (!FILE_PATH) {
  console.log("[Error] enter file path like... node convert-mt.js input.txt");
  return;
}

const OUTPUT_PATH = "./output";

const htmlToMarkdown = (html) => {
  const turndownService = new turndown({
    headingStyle: "atx",
  });
  const markdown = turndownService.turndown(html);
  //console.log(markdown);
  return markdown;
};

const readFile = (file) => {
  const text = fs.readFileSync(file, "utf-8");
  const res = text.split("--------");
  //return res.splice(0, 1);
  return res;
};

const extractLabel = (content, label) => {
  const matches = content.match(label + ": (.*)\n");
  if (!matches) return null;
  return matches[1];
};

const extractBody = (content) => {
  const matches = content.split("-----");
  if (!matches || matches.length < 2) return null;
  return matches[1].replace("BODY:\n", "");
};

const parseContent = (content) => {
  const title = extractLabel(content, "TITLE");
  const date = extractLabel(content, "DATE");
  const category = extractLabel(content, "CATEGORY");
  const image = extractLabel(content, "IMAGE");
  const status = extractLabel(content, "STATUS");
  //console.log(title, date, category, image);
  const bodyHtml = extractBody(content);
  const bodyMarkdown = bodyHtml ? htmlToMarkdown(bodyHtml) : "";
  //console.log(bodyMarkdown);
  return {
    title,
    date,
    category,
    image,
    status,
    bodyMarkdown,
    moment: moment(date, "MM/DD/YYYY hh:mm:ss"),
  };
};

const getGatsbyMarkdown = (parseResult) => {
  return `---
title: ${parseResult.title}
date: "${parseResult.moment.format()}"
tags: ["${parseResult.category}"]
---
${parseResult.bodyMarkdown}`;
};

const outputGatsbyFile = (parseResult) => {
  const gatsbyMarkdown = getGatsbyMarkdown(parseResult);
  // create directory
  const year = parseResult.moment.format("YYYY");
  const month = parseResult.moment.format("MM");
  const day = parseResult.moment.format("DD");
  const dirPath = `${OUTPUT_PATH}/${year}${month}${day}`;
  fs.mkdirSync(dirPath, { recursive: true }, (err) => {
    if (err) throw err;
  });
  // write file
  fs.writeFileSync(`${dirPath}/index.md`, gatsbyMarkdown);
};

const main = () => {
  const contents = readFile(FILE_PATH);
  contents.forEach((content) => {
    const parseResult = parseContent(content);
    if (parseResult.status === "Publish") {
      outputGatsbyFile(parseResult);
      console.log(parseResult.date, parseResult.title);
    }
  });
};

main();
