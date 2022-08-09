import help from "./help.ts";
import styles from "./styles.ts";
import showdown from "https://esm.sh/showdown@1.9.0";

const input = Deno.args[0];
const output = Deno.args[1] || "index.html";

// ~No input? Jeez~
if (!input) {
  console.log(help.trim());
  Deno.exit(1);
}

// Read the file
const markdown = await Deno.readTextFile(input).catch(() => {
  console.error(`Seems like there is no ${input} file in there...`);
  Deno.exit(1);
});

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
    <title>` + input.replace(".md", "") + `</title>
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
await Deno.writeTextFile(output, html);
