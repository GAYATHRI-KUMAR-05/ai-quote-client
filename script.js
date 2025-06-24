function goTo(sectionId) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

const form = document.getElementById("quoteForm");
const quoteOutput = document.getElementById("quoteOutput");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const audience = formData.get("audience");
  const tone = formData.get("tone");
  const format = formData.get("format");
  const context = formData.get("context");

  quoteOutput.textContent = "⏳ Generating your quote...";

  try {
    const response = await fetch("http://localhost:3001/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ audience, tone, format, context }),
    });

    const data = await response.json();
    quoteOutput.textContent = `"${data.quote}"`;
    goTo("quotePage");
  } catch (err) {
    quoteOutput.textContent = "❌ Failed to generate quote. Try again.";
    goTo("quotePage");
  }
});
