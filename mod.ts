import styles from "./styles.ts"
import showdown from "https://esm.sh/showdown@1.9.0";

// Read the file
const markdown = await Deno.readTextFile("./readme.md");

// Converter from md to html
const converter = new showdown.Converter({
  ghCompatibleHeaderId: true,
  simpleLineBreaks: true,
  ghMentions: true,
  tables: true,
});

// Post beginning of HTML file
const preContent = `
<html lang="en">
  <head>
    <title>` + "README" + `</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <div id='content'>
`;

// Post ending of HTML file
const postContent = `
    </div>
    <style>` + styles + `</style>
  </body>
</html>
`;

// converter.setFlavor("github");
const html = preContent + converter.makeHtml(markdown) + postContent;

// Write converted output to file
await Deno.writeTextFile("./README.html", html);
