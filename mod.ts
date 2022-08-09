import styles from "./styles.ts"
import showdown from "https://esm.sh/showdown@1.9.0";

const markdown = await Deno.readTextFile("./readme.md");

const converter = new showdown.Converter({
  ghCompatibleHeaderId: true,
  simpleLineBreaks: true,
  ghMentions: true,
  tables: true,
});

const preContent = `
<html lang="en">
  <head>
    <title>` + "README" + `</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <div id='content'>
`;

const postContent = `
    </div>
    <style>` + styles + `</style>
  </body>
</html>
`;

const html = preContent + converter.makeHtml(markdown) + postContent;

converter.setFlavor("github");

await Deno.writeTextFile("./README.html", html);
