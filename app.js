const STORAGE_KEY = "dq-cake-concierge-inquiries-v1";
const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
let inquiries = loadInquiries();

function loadInquiries() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  renderInquiries();
}
function addMessage(text, who) {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${who}`;
  const name = document.createElement("b");
  name.textContent = who === "bot" ? "Cake Concierge" : "You";
  const p = document.createElement("p");
  p.textContent = text;
  bubble.append(name, p);
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
function getReply(message) {
  const q = message.toLowerCase();
  if (/allerg|ingredient|nut|dairy|gluten|safe to eat/.test(q))
    return "For allergy or ingredient questions, please contact the store team directly and ask them to verify current ingredient and cross-contact information. I can't confirm allergy safety in this demo.";
  if (/price|cost|how much|available|availability/.test(q))
    return "Cake prices and availability can vary by location, size, design, and date. Please contact your local store to confirm current options and pricing. You can save a callback request in the Inquiry Desk.";
  if (/pickup|pick up|when|date|tomorrow|today|lead time/.test(q))
    return "Pickup timing depends on the store and cake requested. Please have the team confirm the date and lead time before relying on an order.";
  if (/size|design|picture|flavour|flavor|option|type/.test(q))
    return "Cake options and designs may vary by store. The team can confirm current sizes, designs, flavours, and personalization options.";
  if (/order|ordering|buy|cake/.test(q))
    return "To order, contact your local Dairy Queen and confirm the cake design, size, pickup date, price, and store-specific ordering requirements. This prototype cannot place or confirm an order.";
  if (/call|callback|phone|contact|staff|person|human/.test(q))
    return "I can help record a callback request. Add the customer's name, contact details, and question in the Inquiry Desk. This demo does not actually call or message anyone.";
  return "Thanks for asking! I don't have verified store-specific information for that question. Please check with the store team. If you'd like a follow-up, add the details in the Inquiry Desk.";
}
function respond(message) {
  const clean = message.trim();
  if (!clean) return;
  addMessage(clean, "user");
  window.setTimeout(() => addMessage(getReply(clean), "bot"), 180);
}
document.getElementById("chatForm").addEventListener("submit", e => {
  e.preventDefault();
  respond(chatInput.value);
  chatInput.value = "";
});
document.querySelectorAll(".chip").forEach(button => {
  button.addEventListener("click", () => respond(button.dataset.question));
});
document.getElementById("inquiryForm").addEventListener("submit", e => {
  e.preventDefault();
  const inquiry = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name: document.getElementById("customerName").value.trim(),
    contact: document.getElementById("customerContact").value.trim(),
    type: document.getElementById("inquiryType").value,
    notes: document.getElementById("inquiryNotes").value.trim(),
    status: "Needs follow-up",
    createdAt: new Date().toLocaleString()
  };
  inquiries.unshift(inquiry);
  persist();
  e.target.reset();
});
document.getElementById("clearInquiries").addEventListener("click", () => {
  if (confirm("Delete all demo inquiries saved in this browser?")) {
    inquiries = [];
    persist();
  }
});
function renderInquiries() {
  const list = document.getElementById("inquiryList");
  list.replaceChildren();
  document.getElementById("totalCount").textContent = inquiries.length;
  document.getElementById("followCount").textContent = inquiries.filter(x => x.status !== "Complete").length;
  document.getElementById("inquiryBadge").textContent = `${inquiries.length} saved`;
  if (!inquiries.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No inquiries yet. Add a test inquiry to see how the staff desk works.";
    list.appendChild(empty);
    return;
  }
  inquiries.forEach(item => {
    const card = document.createElement("article");
    card.className = "inquiry-card";
    const top = document.createElement("div");
    top.className = "inquiry-card-top";
    const title = document.createElement("strong");
    title.textContent = item.name;
    const status = document.createElement("select");
    status.setAttribute("aria-label", `Status for ${item.name}`);
    ["Needs follow-up", "In progress", "Complete"].forEach(value => {
      const option = document.createElement("option");
      option.value = value; option.textContent = value; option.selected = value === item.status;
      status.appendChild(option);
    });
    status.addEventListener("change", () => {
      item.status = status.value;
      persist();
    });
    top.append(title, status);
    const contact = document.createElement("p"); contact.textContent = item.contact;
    const type = document.createElement("p"); type.textContent = item.type;
    const notes = document.createElement("p"); notes.textContent = item.notes || "No notes added.";
    const date = document.createElement("small"); date.textContent = `Saved ${item.createdAt}`;
    card.append(top, contact, type, notes, date);
    list.appendChild(card);
  });
}
renderInquiries();