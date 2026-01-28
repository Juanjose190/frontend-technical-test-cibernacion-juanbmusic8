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
   git clone https://github.com/Juanjose190/frontend-technical-test-cibernacion-juanbmusic8
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   ng serve
   ```
4. **Backend requirement**: Ensure your Spring Boot / REST API is running on `http://localhost:8080`.


<img width="1440" height="804" alt="Screenshot 2026-01-28 at 2 52 37 pm" src="https://github.com/user-attachments/assets/a61e9b78-0edb-4a18-b5d5-0907f3b4b2f0" />
<img width="1440" height="616" alt="Screenshot 2026-01-28 at 3 20 15 pm" src="https://github.com/user-attachments/assets/f1e65d8c-8fb5-482b-8ad2-fddf806d2408" />
<img width="1440" height="810" alt="Screenshot 2026-01-28 at 3 20 48 pm" src="https://github.com/user-attachments/assets/7839e059-df2b-453b-912f-c7c816eb5af0" />
<img width="1440" height="619" alt="Screenshot 2026-01-28 at 3 21 07 pm" src="https://github.com/user-attachments/assets/0ae368e7-c294-4d13-8d57-769ea650e661" />



---
Made with ❤️ by **Juanjobb**
