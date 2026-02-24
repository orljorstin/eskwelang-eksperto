import { useState } from 'react';
import { MobileFrame } from '../../components/MobileFrame';
import { ChevronLeft, ChevronRight, LayoutGrid, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import all 10 core screens (Good and Bad variants)
import { SignupScreenGood, SignupScreenBad } from '../01-SignupScreen';
import { LoginScreenGood, LoginScreenBad } from '../02-LoginScreen';
import { ProfileManagementScreenGood, ProfileManagementScreenBad } from '../03-ProfileManagementScreen';
import { ProfileSwitcherScreenGood, ProfileSwitcherScreenBad } from '../04-ProfileSwitcherScreen';
import { SchoolModeSetupScreenGood, SchoolModeSetupScreenBad } from '../05-SchoolModeSetupScreen';
import { ChildHomeScreenGood, ChildHomeScreenBad } from '../06-ChildHomeScreen';
import { SpendingProtectionScreenGood, SpendingProtectionScreenBad } from '../07-SpendingProtectionScreen';
import { BlockedActionScreenGood, BlockedActionScreenBad } from '../08-BlockedActionScreen';
import { ParentDashboardScreenGood, ParentDashboardScreenBad } from '../09-ParentDashboardScreen';
import { SettingsScreenGood, SettingsScreenBad } from '../10-SettingsScreen';

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

export function ComparisonGallery() {
    const navigate = useNavigate();
    const [currentScreenId, setCurrentScreenId] = useState<ScreenId>(1);
    const [viewMode, setViewMode] = useState<'split' | 'good' | 'bad'>('split');

    const currentScreen = screens.find(s => s.id === currentScreenId)!;
    const GoodComponent = currentScreen.good;
    const BadComponent = currentScreen.bad;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans selection:bg-teal-500/30">
            {/* Header */}
            <header className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
                <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors"
                            title="Return to App"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-white flex items-center gap-2">
                                <LayoutGrid className="w-5 h-5 text-teal-400" />
                                UX Design Gallery
                            </h1>
                            <p className="text-xs text-gray-400">Eskwelang-Eksperto Good vs. Bad Implementations</p>
                        </div>
                    </div>

                    {/* View Toggles */}
                    <div className="hidden md:flex bg-gray-900 border border-gray-700 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('split')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'split' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                        >
                            Side-by-Side
                        </button>
                        <button
                            onClick={() => setViewMode('good')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'good' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-400 hover:text-green-400'}`}
                        >
                            Only Good
                        </button>
                        <button
                            onClick={() => setViewMode('bad')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'bad' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-400 hover:text-red-400'}`}
                        >
                            Only Bad
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 max-w-[1400px] w-full mx-auto overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className="w-72 bg-gray-800/30 border-r border-gray-800 hidden lg:flex flex-col overflow-y-auto custom-scrollbar">
                    <div className="p-4">
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <Info className="w-4 h-4 text-teal-500" />
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                10 Scenarios
                            </h2>
                        </div>
                        <nav className="space-y-1">
                            {screens.map((screen) => (
                                <button
                                    key={screen.id}
                                    onClick={() => setCurrentScreenId(screen.id as ScreenId)}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${currentScreenId === screen.id
                                            ? 'bg-gray-800 text-white shadow-md border border-gray-700/50'
                                            : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${currentScreenId === screen.id ? 'bg-teal-500/20 text-teal-400' : 'bg-gray-700/50'
                                        }`}>
                                        {screen.id}
                                    </div>
                                    <span className="text-sm font-medium truncate">{screen.title}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8">

                    {/* Mobile view toggles */}
                    <div className="flex md:hidden bg-gray-900 border border-gray-700 rounded-lg p-1 mb-6">
                        <button
                            onClick={() => setViewMode('split')}
                            className={`flex-1 py-2 text-xs font-medium rounded-md ${viewMode === 'split' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                        >
                            Split
                        </button>
                        <button
                            onClick={() => setViewMode('good')}
                            className={`flex-1 py-2 text-xs font-medium rounded-md ${viewMode === 'good' ? 'bg-green-600 text-white' : 'text-gray-400'}`}
                        >
                            Good
                        </button>
                        <button
                            onClick={() => setViewMode('bad')}
                            className={`flex-1 py-2 text-xs font-medium rounded-md ${viewMode === 'bad' ? 'bg-red-600 text-white' : 'text-gray-400'}`}
                        >
                            Bad
                        </button>
                    </div>

                    <div className="mb-8 flex items-center justify-between bg-gray-800/50 p-4 lg:p-6 rounded-2xl border border-gray-700/50">
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                {currentScreen.id}. {currentScreen.title}
                            </h2>
                            <p className="text-gray-400 max-w-2xl">
                                Observe the application of the 50 UI Design Tips. The GOOD version applies standard heuristics (contrast, touch targets, spacing). The BAD version violates these rules. Check the source file comments for the exact tip numbers.
                            </p>
                        </div>

                        {/* Nav Arrows for Mobile/Tablet */}
                        <div className="flex lg:hidden gap-2 shrink-0">
                            <button onClick={() => setCurrentScreenId(Math.max(1, currentScreenId - 1) as ScreenId)} className="p-3 bg-gray-700 rounded-xl"><ChevronLeft /></button>
                            <button onClick={() => setCurrentScreenId(Math.min(10, currentScreenId + 1) as ScreenId)} className="p-3 bg-gray-700 rounded-xl"><ChevronRight /></button>
                        </div>
                    </div>

                    {/* Comparison Viewer Container */}
                    <div className={`grid gap-8 ${viewMode === 'split' ? 'xl:grid-cols-2' : 'grid-cols-1 max-w-md mx-auto'} items-start justify-center`}>

                        {/* GOOD SCREEN */}
                        {(viewMode === 'split' || viewMode === 'good') && (
                            <div className="flex flex-col items-center">
                                <div className="w-full max-w-[375px]">
                                    <MobileFrame variant="good">
                                        <GoodComponent />
                                    </MobileFrame>
                                </div>
                            </div>
                        )}

                        {/* BAD SCREEN */}
                        {(viewMode === 'split' || viewMode === 'bad') && (
                            <div className="flex flex-col items-center">
                                <div className="w-full max-w-[375px]">
                                    <MobileFrame variant="bad">
                                        <BadComponent />
                                    </MobileFrame>
                                </div>
                            </div>
                        )}

                    </div>

                </main>
            </div>
        </div>
    );
}
