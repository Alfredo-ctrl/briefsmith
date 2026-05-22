#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { buildBrief, formatBrief } = require("../src/brief-engine");
const pkg = require("../package.json");

const args = parse(process.argv.slice(2));
const root = path.resolve(__dirname, "..");

if (args.help) {
  console.log("briefsmith");
  console.log("");
  console.log("Usage:");
  console.log("  briefsmith --demo");
  console.log("  briefsmith --file examples/idea.txt");
  console.log("  echo \"my app idea\" | briefsmith");
  process.exit(0);
}

const text = args.demo
  ? fs.readFileSync(path.join(root, "examples", "idea.txt"), "utf8")
  : args.file
    ? fs.readFileSync(path.resolve(process.cwd(), args.file), "utf8")
    : fs.readFileSync(0, "utf8");

const brief = buildBrief(text);
brief.text = formatBrief(brief);

if (args.json) console.log(JSON.stringify(brief, null, 2));
else {
  console.log("");
  console.log(`briefsmith v${pkg.version}`);
  console.log("rough idea -> clear AI project brief");
  console.log("");
  console.log(brief.text);
  console.log("");
}

function parse(values) {
  const parsed = {};
  for (let index = 0; index < values.length; index += 1) {
    const item = values[index];
    if (item === "--help" || item === "-h") parsed.help = true;
    else if (item === "--demo") parsed.demo = true;
    else if (item === "--json") parsed.json = true;
    else if (item === "--file" || item === "-f") parsed.file = values[++index];
  }
  return parsed;
}
