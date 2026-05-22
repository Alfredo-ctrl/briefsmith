const input = document.querySelector("#ideaInput");
const buildButton = document.querySelector("#buildBrief");
const exampleButton = document.querySelector("#loadExample");
const example = input.value;

function render() {
  const brief = window.BriefSmith.buildBrief(input.value);
  const text = window.BriefSmith.formatBrief(brief);

  document.querySelector("#score").textContent = brief.score;
  document.querySelector("#scoreText").textContent = brief.score >= 80 ? "Strong enough to prototype." : "Needs a little more detail.";
  document.querySelector("#briefTitle").textContent = brief.title;
  document.querySelector("#lensTag").textContent = brief.lens;
  document.querySelector("#promise").textContent = brief.promise;
  document.querySelector("#audience").textContent = brief.audience;
  document.querySelector("#aiAngle").textContent = brief.aiAngle;
  renderList("#mvp", brief.mvpScope);
  renderList("#risks", brief.risks);
  document.querySelector("#textOutput").textContent = text;
}

function renderList(selector, items) {
  const target = document.querySelector(selector);
  target.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    target.appendChild(li);
  });
}

buildButton.addEventListener("click", render);
exampleButton.addEventListener("click", () => {
  input.value = example;
  render();
});

render();
