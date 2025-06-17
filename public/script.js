// Show/hide login and signup forms by hash in URL
function toggleForms() {
  const hash = window.location.hash;
  const login = document.getElementById("login");
  const signup = document.getElementById("signup");
  const chatSection = document.getElementById("chatSection");

  if (hash === "#login") {
    login.style.display = "block";
    signup.style.display = "none";
    chatSection.style.display = "none";
  } else if (hash === "#signup") {
    login.style.display = "none";
    signup.style.display = "block";
    chatSection.style.display = "none";
  } else {
    login.style.display = "none";
    signup.style.display = "none";
    chatSection.style.display = "block";
  }
}

// Run on page load and hash change
window.addEventListener("load", toggleForms);
window.addEventListener("hashchange", toggleForms);

// Dummy login/signup forms handlers (you can replace with real logic)
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login is not implemented yet.");
});

document.getElementById("signupForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Signup is not implemented yet.");
});

// Chat with backend AI endpoint
const chatForm = document.getElementById("chatForm");
const chatBox = document.getElementById("chatBox");

chatForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const prompt = input.value.trim();
  if (!prompt) return;

  // Display user message
  const userMsg = document.createElement("div");
  userMsg.style.fontWeight = "bold";
  userMsg.textContent = "You: " + prompt;
  chatBox.appendChild(userMsg);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    const aiMsg = document.createElement("div");
    aiMsg.style.color = "#2563eb";
    if (data.response) {
      aiMsg.textContent = "AI Buddy: " + data.response;
    } else {
      aiMsg.textContent = "AI Buddy: Sorry, no response.";
    }
    chatBox.appendChild(aiMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    const errorMsg = document.createElement("div");
    errorMsg.style.color = "red";
    errorMsg.textContent = "Error: Failed to get AI response.";
    chatBox.appendChild(errorMsg);
  }
});
