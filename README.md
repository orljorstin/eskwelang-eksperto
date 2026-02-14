# Eskwelang-Eksperto

**Eskwelang-Eksperto** is a "Privacy-First" Progressive Web App (PWA) designed to help parents manage their child's shared device usage. It focuses on **School Mode** focus sessions and **Financial Protection** against accidental spending, all while respecting data privacy through an **Offline-First** architecture.

## 🌟 Key Features

### 1. Offline-First Authentication
-   **No Email Required**: Parents sign up with just a Name and PIN.
-   **Local First**: All data is stored locally on the device using `localforage`.
-   **Background Sync**: Data syncs to Supabase only when online, using a collision-resistant UUID strategy.

### 2. School Mode (Focus Session)
-   **Distraction-Free**: A dedicated screen for study sessions.
-   **Wake Lock**: Prevents the screen from sleeping during reading/watching.
-   **Tracking**: Monitors "Interruptions" (tab switching or minimizing) to encourage focus.
-   **Screen Pinning Guide**: Educates parents on how to lock the device to the app (Kiosk mode).

### 3. Financial Protection
-   **Spending Limits**: Set weekly allowances.
-   **PIN Checkpoints**: Sensitive actions (like changing limits or stopping a session) require the Parent PIN.

## 🛠️ Tech Stack
-   **Framework**: React (Vite)
-   **Styling**: Tailwind CSS
-   **Storage**: LocalForage (IndexedDB wrapper)
-   **Backend**: Supabase (PostgreSQL) - *Optional for offline use, required for sync*
-   **Security**: bcryptjs (Client-side PIN hashing)

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   NPM

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/eskwelang-eksperto.git
    cd eskwelang-eksperto
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up Environment Variables:
    -   Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    -   Update with your Supabase credentials (see "Database Setup").

4.  Run locally:
    ```bash
    npm run dev
    ```

## ☁️ Deployment & Database Setup

### 1. Supabase Setup
This project uses a custom table structure for its offline-auth system.
1.  Create a new project at [database.new](https://database.new).
2.  Go to the **SQL Editor**.
3.  Copy the contents of `supabase/migrations/20260214_initial_schema.sql`.
4.  Run the script to create `users`, `profiles`, `sessions`, and other tables.

### 2. Deploy to Vercel
1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Add the Environment Variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in Vercel Project Settings.
4.  Deploy!

## 📱 PWA Installation
-   **Android/Chrome**: Click "Install" in the browser menu.
-   **iOS**: Tap Share -> "Add to Home Screen".

## 🛡️ License
MIT
