<!-- portfolio:start -->
<p align="center">
  <img src="assets/readme-hero.svg" alt="BriefSmith banner" width="100%" />
</p>

<h1 align="center">BriefSmith</h1>

<p align="center"><strong>A project brief forge for turning rough product ideas into buildable plans.</strong></p>

<p align="center">
<img alt="focus: planning" src="https://img.shields.io/badge/focus-planning-2d936c?style=for-the-badge&labelColor=17231d" />
  <img alt="output: briefs" src="https://img.shields.io/badge/output-briefs-2d936c?style=for-the-badge&labelColor=17231d" />
  <img alt="mode: local" src="https://img.shields.io/badge/mode-local-2d936c?style=for-the-badge&labelColor=17231d" />
</p>

## Workshop Feel

BriefSmith is framed as a practical workbench: the user brings a rough idea and leaves with a clearer build plan.

## Outputs

Generates project direction, scope, feature lists, risks, and export-friendly planning text.

## Run It

`npm install` then use the CLI or open the included web interface.

## Portfolio Note

This repository has its own visual identity inside the portfolio. The goal is that every project feels like a different product, not another copy of the same template.
<!-- portfolio:end -->

---

## Existing Project Notes

# BriefSmith

BriefSmith turns rough AI product ideas into clear project briefs. It is built for students and builders who want to move from "I have an idea" to "I know what to build first."

![BriefSmith web app](assets/briefsmith-dashboard.png)

## What It Does

- Detects the likely project lens: learning, productivity, wellbeing, career, or creative.
- Extracts audience, promise, problem, AI angle, MVP scope, risks, and next steps.
- Runs fully locally in the browser or terminal.
- Helps shape AI-focused portfolio projects without needing an API key.

## Why It Helps

AI projects often start too vague. BriefSmith makes the first version smaller, clearer, and easier to explain in a README, demo, or LinkedIn post.

## Run The Web App

```bash
npm start
```

Open:

```text
http://localhost:5180
```

## Run The CLI

```bash
node bin/briefsmith.js --demo
```

From a file:

```bash
node bin/briefsmith.js --file examples/idea.txt
```

From stdin:

```bash
echo "AI app idea..." | node bin/briefsmith.js
```

## Project Structure

```text
briefsmith/
  index.html
  bin/briefsmith.js
  src/brief-engine.js
  src/app.js
  src/styles.css
  examples/idea.txt
```

## Author

Alfredo Oliva
