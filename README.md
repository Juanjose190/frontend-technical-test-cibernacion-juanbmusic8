# BankPro - Premium Credit Management Dashboard

Welcome to **BankPro**, a high-end Fintech dashboard I built to provide a seamless and interactive credit application experience. This project focus on professional aesthetics, real-time feedback, and robust CRUD integration.

##  Key Features

### 1. Advanced 30/70 Dashboard Layout
I designed the workspace with a clear hierarchy:
- **Left Panel (30%)**: A dedicated "Configurator" where users enter their data. I optimized it for focus and readability.
- **Center Hero (70%)**: A large preview area where the product stays as the visual protagonist.

### 2. Live Preview Interaction
I implemented a "letter-by-letter" sync engine. As you type your name or amount, the credit card updates instantly. This provides immediate visual reward and reduces input errors.

### 3. Interactive 3D Credit Card
The centerpiece of the app is a cinematic 3D card.
- **Dynamic Themes**: I built a logic that switches card styles (colors, badges, and brand labels) instantly when toggling between **Personal** and **Business** modes.
- **State Feedback**: The card flips automatically to show the final result (Approved/Rejected) once the backend responds.

### 4. Enterprise-Grade Theme System
I implemented a global theme switcher (Light/Dark) using CSS variables:
- **Dark Mode**: A sleek, OLED-ready interface with deep gradients and emerald accents.
- **Light Mode**: A clean, accessible look with refined contrast for high legibility.


### 5. Seamless CRUD Integration
The dashboard is fully connected to a RESTful backend:
- **Real-time Updates**: Editing an entry triggers a smooth scroll to the top and a "Draft" state reset for the card.
- **Optimized Workflow**: Grouped action pills for history management (Edit/Delete) with explicit feedback notifications.

##  Technical Decisions

- **Angular 18 & Standalone Components**: I chose this modern architecture to ensure the project is lightweight, modular, and highly performant.
- **CSS Variables & Glassmorphism**: For the theming system, I avoided heavy libraries and went with native CSS variables for zero-latency theme switching and ultra-smooth 0.3s transitions.
- **Atomic Component Design**: I split the UI into highly specialized components (`CreditCard`, `SolicitudForm`, `SolicitudList`) to keep the logic clean and the codebase scalable.
- **UX-First Logic**: I decided to reset the card status to "Pending" during edits to prevent confusing users with old "Approved" animations while they are still modifying data.

##  Installation

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm start
   ```
4. **Backend requirement**: Ensure your Spring Boot / REST API is running on `http://localhost:8080`.

---
Made with ❤️ by **Juanjobb**
