# DQ Cake Concierge — AI Receptionist Capstone Prototype

## What this project is
A mobile-friendly web prototype exploring how an AI receptionist could help a Dairy Queen store respond to common cake inquiries and capture callback requests when staff are busy or miss a call.

**This is an independent student prototype, not an official Dairy Queen product.** It is not connected to a real store, phone line, ordering system, or Dairy Queen database.

## Features that work in this version
- Responsive dashboard for phone and desktop screens.
- Scripted chat assistant with safe, general cake-inquiry responses.
- Callback inquiry form with name, contact, inquiry category, and notes.
- Inquiry desk where saved inquiries can be marked Needs follow-up, In progress, or Complete.
- Inquiry records persist in the same browser using `localStorage`.
- Counts update as inquiries are created and completed.

## What is not implemented yet
- No real generative AI model/API is connected. Chat replies are scripted in `app.js`.
- No phone answering, speech recognition, voice generation, SMS, email, or automatic callback.
- No live cake catalog, pricing, inventory, allergen data, or order placement.
- Data is stored only in the current browser/device. It is not a secure shared database.
- Do not enter real customer personal information in this demo.

## Run it in VS Code on an iPhone
The iPhone app/browser experience is different from desktop VS Code. Use a browser-based development environment such as GitHub Codespaces if it is available to your GitHub account.

1. Sign in to GitHub in Safari and create a new repository named `dq-cake-concierge`.
2. Upload the files in this folder (`index.html`, `styles.css`, `app.js`, `README.md`) to the repository root. You can also upload the ZIP and extract it on a computer; GitHub's browser editor is often easier with individual files.
3. Open the repository and choose **Code → Codespaces → Create codespace on main** if that option is available.
4. In the Codespaces editor, open the terminal and run:
   ```bash
   python3 -m http.server 3000
   ```
5. Open the **Ports** panel, find port `3000`, and choose **Open in Browser**. If Codespaces does not show a Ports panel on your mobile layout, use the command palette/menu to open it or switch to desktop-site view.
6. Test the chat prompts and add a sample inquiry. Refresh the page; the inquiry should remain in that same browser.

### Simple alternative
For a static HTML demo, you can upload these files to a static hosting service that supports plain HTML/CSS/JS. Keep the project in a GitHub repository so you can edit it later.

## Suggested capstone project description
**Project title:** Using AI to Integrate a Receptionist into Dairy Queen Cake Inquiries

**Problem:** Customers may call with cake questions while employees are busy serving customers. Missed calls can mean missed opportunities to answer questions and help customers take the next step.

**Proposed solution:** A digital receptionist that can answer approved frequently asked questions, collect callback requests, and organize inquiries for staff follow-up. A future version could connect speech-to-text, an AI model grounded in store-approved information, text-to-speech, and a phone provider.

**Prototype scope:** This version demonstrates the website experience, scripted question handling, and inquiry tracking. It does not yet demonstrate a real phone call or live AI.

**Success criteria for a classroom demo:**
1. The website works on an iPhone-sized screen.
2. At least four sample cake questions receive sensible responses.
3. A user can submit a callback request.
4. The inquiry appears in the staff desk and can be marked complete.
5. The inquiry remains after refreshing the same browser.
6. The presenter clearly explains which features are functional and which are future development.

## Next engineering steps
1. Confirm the store's approved answers and contact process with a manager.
2. Add a backend and database for secure shared inquiry storage.
3. Connect a real AI API on a server (never expose API keys in browser JavaScript).
4. Add a voice/telephony provider and test calls only with permission.
5. Add consent, retention, access controls, monitoring, and human handoff.
6. Have the store verify all price, product, availability, and allergy-related answers before any public pilot.
