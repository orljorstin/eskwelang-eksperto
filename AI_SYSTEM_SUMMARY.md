# Eskwelang-Eksperto: System Summary & Current Standing

## System Overview
**Eskwelang-Eksperto** is a Progressive Web Application (PWA) designed as a digital parenting and educational tool. It functions as a lightweight, simulated "kiosk mode" or launcher for children, providing a controlled environment where screen time is balanced between educational activities ("School Mode") and leisure ("Play Time").

The app is built with mobile-first principles and is intended to be installed on a device via the browser's "Add to Home Screen" feature.

## Technology Stack
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (emphasizing a modern, dark cohesive gradient UI for inner screens)
- **Icons:** `lucide-react`
- **Routing:** `react-router-dom` (HashRouter or standard BrowserRouter)
- **PWA Features:** `vite-plugin-pwa` (Service workers, manifest, offline capabilities)
- **State Management:** React Context (`AppContext`, `LanguageContext`)
- **Backend/DB:** Supabase (Auth & Database - Note: Currently, much of the frontend state relies on mocked data pending full backend wiring).

## Core Features & Architecture

### 1. Dual-Role System
- **Parent Mode (PIN Protected):** Allows parents to configure allowed apps, view recent activity logs, manage child profiles, and configure "Spending Protection" (preventing unauthorized app purchases/loads).
- **Child Mode:** A restricted environment. Upon entering a session, the child only sees allowed educational apps. 

### 2. The "School Mode" Session (The Core Loop)
Instead of relying on native OS app-blocking (which a PWA cannot securely do), the app simulates a locked-down workspace:
- Uses the Screen Wake Lock API to prevent the device from sleeping.
- Prompts Android users to use "App Pinning" to lock the PWA to the screen.
- Tracks "interruptions" via the Page Visibility API (detecting if the child switches away to another app).

### 3. Embedded "Safe" Apps
Because a PWA cannot reliably deep-link to launch specific native Android/iOS apps (like the default Calculator), the system embeds safe, lightweight versions of these tools directly within the PWA session. Current embedded apps include:
- **Calculator:** A fully functional React calculator.
- **Notes:** A simple note-taking interface with local state.
- **Safe Browser:** An iframe-based browser (simulated safe search).
- **Kids Dictionary:** A mock dictionary tool.
- **PDF Reader:** A mock PDF viewer with zoom controls.

### 4. UI/UX Design Language
The application recently underwent a major UI overhaul to standardize its aesthetic.
- **Login & Global Style:** Uses a distinctive "dark glowing gradient" background (`bg-gray-900` with blurred overlapping `teal-600/30` and `purple-600/30` circles).
- **Consistency:** All inner screens (Signup, Settings, Dashboard Headers, Profile Management) now strictly adhere to this dark gradient header aesthetic for a highly premium, cohesive look.

## Current Standing & Completion Status

**What is completed and working well:**
- Initial PWA scaffolding and manifest configuration.
- Routing architecture (Public vs. Protected routes).
- Extensive UI Development: Almost all main screens (17+ screens) are built, responsive, and styled consistently.
- Complex UI components (Pin Modal, Sync Badge, Context hooks).
- The internal embedded apps (Calculator, Notes, Dictionary, Browser, PDF Reader) are built and functional within the Session Screen.
- Localization scaffolding (`LanguageContext` supporting English, Taglish, Bisaya).
- Recent Activities screen and Parent Dashboard UI.

**What is pending / Next Steps for another AI/Developer:**
1. **Supabase Integration:** The UI relies heavily on mock data (`mockStats.ts`, hardcoded arrays in components). The next major phase is connecting the `AppContext.tsx` methods (login, createProfile, fetchActivities) to the actual Supabase database and Auth endpoints.
2. **Offline Data Sync:** The `useSync` hook and `SyncBadge` exist visually but need to be wired to IndexedDB/Dexie to queue actions when offline and flush them to Supabase when online.
3. **PWA Enhancements:** Testing the Service Worker caching strategies to ensure all embedded apps (like the local dictionary data or PDF placeholder) work seamlessly offline.
4. **Push Notifications:** Adding Web Push to alert parents of "Blocked Action" attempts in real-time.

## File Structure Context for AI Handoff
- `/src/app/screens/` -> Contains all 17 distinct view components (e.g., `09-ParentDashboardScreen.tsx`, `12-SessionScreen.tsx`).
- `/src/app/apps/` -> Contains the embedded internal applications (e.g., `CalculatorApp.tsx`).
- `/src/context/` -> Contains `AppContext` (state and auth logic) and `LanguageContext` (i18n).
- `/src/constants/` -> Contains configuration data like `ALLOWED_APPS`.
