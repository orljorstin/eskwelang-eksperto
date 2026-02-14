import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Screens
import { SignupScreenGood } from './screens/01-SignupScreen';
import { LoginScreenGood } from './screens/02-LoginScreen';
import { ProfileManagementScreenGood } from './screens/03-ProfileManagementScreen';
import { ProfileSwitcherScreenGood } from './screens/04-ProfileSwitcherScreen';
import { SchoolModeSetupScreenGood } from './screens/05-SchoolModeSetupScreen';
import { ChildHomeScreenGood } from './screens/06-ChildHomeScreen';
import { SpendingProtectionScreenGood } from './screens/07-SpendingProtectionScreen';
import { BlockedActionScreenGood } from './screens/08-BlockedActionScreen';
import { ParentDashboardScreenGood } from './screens/09-ParentDashboardScreen';
import { SettingsScreenGood } from './screens/10-SettingsScreen';
import { CreateProfileScreen } from './screens/11-CreateProfileScreen';
import { SessionScreen } from './screens/12-SessionScreen';
import { MobileFrame } from './components/MobileFrame';

// Protect routes that require parent authentication
function ProtectedRoute() {
  const { isAuthenticated, user, isLoading } = useApp();

  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (!user) return <Navigate to="/signup" replace />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

import { useSync } from '../hooks/useSync';
import { SyncBadge } from './components/SyncBadge';

// Redirect to dashboard if already authenticated
function PublicRoute() {
  const { isAuthenticated, isLoading } = useApp();

  if (isLoading) return <div>Loading...</div>;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}

// Layout wrapper: Full screen on mobile, Phone frame on desktop
function AppLayout() {
  const { isSyncing, pendingCount } = useSync();

  return (
    <div className="min-h-screen bg-gray-50 md:bg-gray-900 flex items-center justify-center md:p-4">
      <div className="w-full h-[100dvh] md:w-[375px] md:h-[812px] bg-white md:rounded-3xl overflow-hidden md:shadow-2xl relative">
        <SyncBadge isSyncing={isSyncing} pendingCount={pendingCount} />
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/signup" element={<SignupScreenGood />} />
              <Route path="/login" element={<LoginScreenGood />} />
            </Route>

            {/* Protected Parent Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<ParentDashboardScreenGood />} />
              <Route path="/profile-management" element={<ProfileManagementScreenGood />} />
              <Route path="/profile-switcher" element={<ProfileSwitcherScreenGood />} />
              <Route path="/school-setup" element={<SchoolModeSetupScreenGood />} />
              <Route path="/settings" element={<SettingsScreenGood />} />
              <Route path="/spending-protection" element={<SpendingProtectionScreenGood />} />
              <Route path="/blocked" element={<BlockedActionScreenGood />} />
              <Route path="/create-profile" element={<CreateProfileScreen />} />
            </Route>

            {/* Child Routes (Special case, might need different protection later) */}
            <Route path="/child-home" element={<ChildHomeScreenGood />} />

            {/* Default */}
            {/* Phase 3: School Mode */}
            <Route path="/session" element={<SessionScreen />} />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}