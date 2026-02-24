import { useState } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { DesignSystemGuide } from './components/DesignSystemGuide';
import { ProjectOverview } from './components/ProjectOverview';
import { SignupScreenGood, SignupScreenBad } from './screens/01-SignupScreen';
import { LoginScreenGood, LoginScreenBad } from './screens/02-LoginScreen';
import { ProfileManagementScreenGood, ProfileManagementScreenBad } from './screens/03-ProfileManagementScreen';
import { ProfileSwitcherScreenGood, ProfileSwitcherScreenBad } from './screens/04-ProfileSwitcherScreen';
import { SchoolModeSetupScreenGood, SchoolModeSetupScreenBad } from './screens/05-SchoolModeSetupScreen';
import { ChildHomeScreenGood, ChildHomeScreenBad } from './screens/06-ChildHomeScreen';
import { SpendingProtectionScreenGood, SpendingProtectionScreenBad } from './screens/07-SpendingProtectionScreen';
import { BlockedActionScreenGood, BlockedActionScreenBad } from './screens/08-BlockedActionScreen';
import { ParentDashboardScreenGood, ParentDashboardScreenBad } from './screens/09-ParentDashboardScreen';
import { SettingsScreenGood, SettingsScreenBad } from './screens/10-SettingsScreen';
import { ChevronLeft, ChevronRight, Menu, Grid3x3 } from 'lucide-react';

type ViewMode = 'prototype' | 'comparison' | 'design-system';
type ScreenId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const screens = [
  { id: 1, title: 'Sign-up (Parent Onboarding)', good: SignupScreenGood, bad: SignupScreenBad },
  { id: 2, title: 'Log-in / App Lock Screen', good: LoginScreenGood, bad: LoginScreenBad },
  { id: 3, title: 'Profile Management', good: ProfileManagementScreenGood, bad: ProfileManagementScreenBad },
  { id: 4, title: 'Quick Profile Switcher', good: ProfileSwitcherScreenGood, bad: ProfileSwitcherScreenBad },
  { id: 5, title: 'School Mode Setup', good: SchoolModeSetupScreenGood, bad: SchoolModeSetupScreenBad },
  { id: 6, title: 'Child Home / Restricted Launcher', good: ChildHomeScreenGood, bad: ChildHomeScreenBad },
  { id: 7, title: 'Spending / Load Protection', good: SpendingProtectionScreenGood, bad: SpendingProtectionScreenBad },
  { id: 8, title: 'Attempted Action Blocking', good: BlockedActionScreenGood, bad: BlockedActionScreenBad },
  { id: 9, title: 'Parent Dashboard', good: ParentDashboardScreenGood, bad: ParentDashboardScreenBad },
  { id: 10, title: 'Settings & Help', good: SettingsScreenGood, bad: SettingsScreenBad },
];

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('prototype');
  const [currentScreenId, setCurrentScreenId] = useState<ScreenId>(1);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const currentScreen = screens.find(s => s.id === currentScreenId)!;
  const GoodComponent = currentScreen.good;
  const BadComponent = currentScreen.bad;

  const goToPrevScreen = () => {
    if (currentScreenId > 1) {
      setCurrentScreenId((currentScreenId - 1) as ScreenId);
    }
  };

  const goToNextScreen = () => {
    if (currentScreenId < 10) {
      setCurrentScreenId((currentScreenId + 1) as ScreenId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Top Navigation Bar */}
      <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Eskwelang-Eksperto</h1>
              <p className="text-sm text-gray-400">Parental Control App Design System</p>
            </div>
            
            {/* View mode toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('prototype')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'prototype'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Interactive Prototype
              </button>
              <button
                onClick={() => setViewMode('comparison')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'comparison'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Grid3x3 className="inline w-4 h-4 mr-2" />
                Comparison Gallery
              </button>
              <button
                onClick={() => setViewMode('design-system')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'design-system'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Design System Guide
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Interactive Prototype Mode */}
      {viewMode === 'prototype' && (
        <div className="flex">
          {/* Sidebar - Screen Navigation */}
          <aside className="w-72 bg-gray-800 border-r border-gray-700 min-h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto">
            <div className="p-4">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Screens
              </h2>
              <nav className="space-y-1">
                {screens.map((screen) => (
                  <button
                    key={screen.id}
                    onClick={() => setCurrentScreenId(screen.id as ScreenId)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      currentScreenId === screen.id
                        ? 'bg-teal-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentScreenId === screen.id
                          ? 'bg-white/20'
                          : 'bg-gray-700'
                      }`}>
                        {screen.id}
                      </div>
                      <span className="text-sm font-medium">{screen.title}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content - Screen Preview */}
          <main className="flex-1">
            <div className="max-w-5xl mx-auto px-6 py-8">
              {/* Screen info header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-white">
                    {currentScreen.id}. {currentScreen.title}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={goToPrevScreen}
                      disabled={currentScreenId === 1}
                      className={`p-2 rounded-lg transition-all ${
                        currentScreenId === 1
                          ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNextScreen}
                      disabled={currentScreenId === 10}
                      className={`p-2 rounded-lg transition-all ${
                        currentScreenId === 10
                          ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Screen {currentScreenId} of 10 • Use sidebar to navigate or arrow buttons
                </p>
              </div>

              {/* Screen preview */}
              <div className="bg-gray-800 rounded-2xl p-8">
                <MobileFrame variant="good">
                  <GoodComponent />
                </MobileFrame>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Comparison Gallery Mode */}
      {viewMode === 'comparison' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <ProjectOverview />
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Good vs. Bad UX Comparison
            </h2>
            <p className="text-gray-400">
              Side-by-side comparison of all 10 screens showing best practices vs. common mistakes
            </p>
          </div>

          <div className="space-y-16">
            {screens.map((screen) => {
              const Good = screen.good;
              const Bad = screen.bad;
              
              return (
                <div key={screen.id} className="bg-gray-800 rounded-2xl p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {screen.id}. {screen.title}
                    </h3>
                    <div className="h-1 w-20 bg-teal-500 rounded-full" />
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Good version */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
                          <span className="text-green-400 font-semibold text-sm">✓ GOOD UX</span>
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-center">
                        <div className="w-full max-w-[320px]">
                          <MobileFrame variant="good">
                            <Good />
                          </MobileFrame>
                        </div>
                      </div>
                      <div className="mt-4 bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                        <h4 className="font-semibold text-green-400 mb-2">What's Good:</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Clear visual hierarchy</li>
                          <li>• Accessible touch targets (44px+)</li>
                          <li>• Simple, friendly language</li>
                          <li>• One dominant action per screen</li>
                          <li>• High contrast for readability</li>
                        </ul>
                      </div>
                    </div>

                    {/* Bad version */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
                          <span className="text-red-400 font-semibold text-sm">✗ BAD UX</span>
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-center">
                        <div className="w-full max-w-[320px]">
                          <MobileFrame variant="bad">
                            <Bad />
                          </MobileFrame>
                        </div>
                      </div>
                      <div className="mt-4 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                        <h4 className="font-semibold text-red-400 mb-2">What's Bad:</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Poor visual hierarchy</li>
                          <li>• Small, hard-to-tap elements</li>
                          <li>• Technical jargon, unclear labels</li>
                          <li>• Multiple competing actions</li>
                          <li>• Low contrast, cramped layout</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Design System Guide Mode */}
      {viewMode === 'design-system' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <ProjectOverview />
          <DesignSystemGuide />
        </div>
      )}
    </div>
  );
}