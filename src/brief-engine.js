(function (root) {
  const lenses = [
    { id: "learning", label: "Learning", words: ["student", "study", "homework", "exam", "learn", "school", "course"], audience: "students and self-learners" },
    { id: "productivity", label: "Productivity", words: ["task", "plan", "priority", "schedule", "focus", "work", "organize"], audience: "busy people managing daily work" },
    { id: "health", label: "Wellbeing", words: ["health", "sleep", "mood", "stress", "gym", "habit", "water"], audience: "people building healthier routines" },
    { id: "career", label: "Career", words: ["resume", "job", "interview", "portfolio", "career", "client", "freelance"], audience: "job seekers and early-career builders" },
    { id: "creative", label: "Creative", words: ["design", "content", "write", "video", "music", "brand", "story"], audience: "creators and small teams" }
  ];

  function buildBrief(text) {
    const input = String(text || "").trim();
    const sentences = splitSentences(input);
    const lens = detectLens(input);
    const features = findFeatures(input, lens);
    const risks = findRisks(input);
    const title = makeTitle(input, lens);
    const audience = detectAudience(input, lens);
    const promise = makePromise(title, audience, lens);

    return {
      title,
      lens: lens.label,
      audience,
      promise,
      problem: sentences[0] || `People need a simpler way to handle ${lens.label.toLowerCase()} decisions.`,
      coreFlow: buildFlow(features),
      features,
      aiAngle: buildAiAngle(input, lens),
      mvpScope: buildMvpScope(features),
      risks,
      nextSteps: buildNextSteps(features),
      score: scoreIdea(input, features, risks),
      text: ""
    };
  }

  function splitSentences(text) {
    return String(text || "")
      .replace(/\s+/g, " ")
      .split(/(?<=[.!?])\s+|\n+/)
      .map(item => item.trim())
      .filter(Boolean);
  }

  function detectLens(text) {
    const value = text.toLowerCase();
    let best = lenses[0];
    let score = -1;
    lenses.forEach(lens => {
      const hits = lens.words.reduce((sum, word) => sum + (value.includes(word) ? 1 : 0), 0);
      if (hits > score) {
        best = lens;
        score = hits;
      }
    });
    return best;
  }

  function findFeatures(text, lens) {
    const value = text.toLowerCase();
    const picks = [
      value.includes("paste") || value.includes("input") ? "Paste a messy idea or task list" : null,
      value.includes("priority") || value.includes("first") ? "Rank what matters first" : null,
      value.includes("mobile") || value.includes("phone") ? "Mobile-friendly experience" : null,
      value.includes("ai") ? "AI-ready recommendation layer" : null,
      value.includes("simple") || value.includes("friendly") ? "Low-friction interface" : null,
      value.includes("export") || value.includes("share") ? "Exportable summary" : null
    ].filter(Boolean);

    const defaults = {
      Learning: ["Capture study pressure", "Suggest a first focus block", "Explain the plan in plain language"],
      Productivity: ["Capture messy tasks", "Group work by urgency", "Create a realistic next-action list"],
      Wellbeing: ["Track routine signals", "Spot risky patterns", "Suggest gentle habit changes"],
      Career: ["Clarify the user goal", "Turn progress into portfolio evidence", "Suggest next applications"],
      Creative: ["Shape rough concepts", "Choose a visual direction", "Create a publishable brief"]
    }[lens.label];

    return [...new Set([...picks, ...defaults])].slice(0, 6);
  }

  function findRisks(text) {
    const value = text.toLowerCase();
    const risks = [];
    if (value.includes("ai")) risks.push("Avoid presenting AI suggestions as facts without user review.");
    if (value.includes("student") || value.includes("exam")) risks.push("Keep guidance supportive instead of adding pressure.");
    if (value.includes("health") || value.includes("mood")) risks.push("Do not replace professional advice.");
    if (!risks.length) risks.push("Keep the first version small enough to finish and test.");
    risks.push("Make the interface feel practical, not like a generic AI demo.");
    return risks;
  }

  function makeTitle(text, lens) {
    const words = String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter(word => word.length > 3 && !["with", "that", "they", "have", "want", "build", "simple", "maybe"].includes(word));
    const keyword = singularize(words[0] || lens.label.toLowerCase());
    return `${capitalize(keyword)}Pilot`;
  }

  function singularize(value) {
    if (value.endsWith("ies")) return `${value.slice(0, -3)}y`;
    if (value.endsWith("s") && value.length > 5) return value.slice(0, -1);
    return value;
  }

  function detectAudience(text, lens) {
    const value = text.toLowerCase();
    if (value.includes("student")) return "students who feel overloaded";
    if (value.includes("client")) return "freelancers working with clients";
    if (value.includes("team")) return "small teams moving quickly";
    return lens.audience;
  }

  function makePromise(title, audience, lens) {
    return `${title} helps ${audience} turn messy ${lens.label.toLowerCase()} input into a clear first plan.`;
  }

  function buildFlow(features) {
    return [
      "Write or paste the rough idea.",
      "Let the tool extract audience, problem, features, risks, and next steps.",
      "Review the brief, edit it, then use it as the build plan."
    ].concat(features.length ? [`Start with: ${features[0]}.`] : []);
  }

  function buildAiAngle(text, lens) {
    const value = text.toLowerCase();
    if (value.includes("ai")) return `Use AI as a decision-support layer for ${lens.label.toLowerCase()}, while keeping the user in control.`;
    return `The current version uses local heuristics, and can later connect to an AI model for richer ${lens.label.toLowerCase()} recommendations.`;
  }

  function buildMvpScope(features) {
    return features.slice(0, 3).map((feature, index) => `${index + 1}. ${feature}`);
  }

  function buildNextSteps(features) {
    return [
      "Build the smallest usable web screen.",
      `Test with 3 example inputs, especially: ${features[0] || "a messy real-world note"}.`,
      "Add export/share only after the brief quality feels useful."
    ];
  }

  function scoreIdea(input, features, risks) {
    const lengthScore = Math.min(35, Math.round(input.length / 8));
    const featureScore = features.length * 8;
    const riskPenalty = Math.max(0, risks.length - 1) * 3;
    return Math.max(20, Math.min(96, 30 + lengthScore + featureScore - riskPenalty));
  }

  function formatBrief(brief) {
    const lines = [
      brief.title,
      "",
      `Score: ${brief.score}/100`,
      `Lens: ${brief.lens}`,
      `Audience: ${brief.audience}`,
      "",
      "Promise",
      brief.promise,
      "",
      "Problem",
      brief.problem,
      "",
      "Core Flow",
      ...brief.coreFlow.map(item => `- ${item}`),
      "",
      "Features",
      ...brief.features.map(item => `- ${item}`),
      "",
      "AI Angle",
      brief.aiAngle,
      "",
      "MVP Scope",
      ...brief.mvpScope,
      "",
      "Risks",
      ...brief.risks.map(item => `- ${item}`),
      "",
      "Next Steps",
      ...brief.nextSteps.map(item => `- ${item}`)
    ];
    return lines.join("\n");
  }

  function capitalize(value) {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  }

  const api = { buildBrief, formatBrief };
  root.BriefSmith = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : window);
