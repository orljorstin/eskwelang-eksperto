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
    {
        id: 1, title: 'Sign-up (Parent Onboarding)', good: SignupScreenGood, bad: SignupScreenBad,
        goodTips: ["Clear visual hierarchy", "Accessible touch targets (44px+)", "Simple, friendly language", "One dominant action per screen", "High contrast for readability"],
        badTips: ["Poor visual hierarchy", "Small, hard-to-tap elements", "Technical jargon, unclear labels", "Multiple competing actions", "Low contrast, cramped layout"]
    },
    {
        id: 2, title: 'Log-in / App Lock Screen', good: LoginScreenGood, bad: LoginScreenBad,
        goodTips: ["Large 44px+ CTA button", "Human-like, friendly language", "Adequate spacing and padding", "Sufficient color contrast in Dark UI"],
        badTips: ["Technical jargon", "Tiny touch targets", "Poor spacing and alignment", "Conflicting actions with equal weight"]
    },
    {
        id: 3, title: 'Profile Management', good: ProfileManagementScreenGood, bad: ProfileManagementScreenBad,
        goodTips: ["Large 44px+ tap targets for adding/editing", "Ample spacing to prevent misclicks", "Strong visual hierarchy", "Human-readable helper texts"],
        badTips: ["Cramped spacing in lists", "Tiny touch targets for action buttons", "Weak visual hierarchy for roles"]
    },
    {
        id: 4, title: 'Quick Profile Switcher', good: ProfileSwitcherScreenGood, bad: ProfileSwitcherScreenBad,
        goodTips: ["Human-like, friendly language", "Massive touch targets for child profiles", "Clear visual hierarchy distinguishing roles", "Ample spacing"],
        badTips: ["Technical jargon", "Competing primary buttons with equal weight", "Tiny, cramped tap targets"]
    },
    {
        id: 5, title: 'School Mode Setup', good: SchoolModeSetupScreenGood, bad: SchoolModeSetupScreenBad,
        goodTips: ["Chunking complex setup into manageable steps", "Clear progress indicators", "Large tap targets for selections", "Active states clearly highlighted"],
        badTips: ["Lack of chunking (all crammed in one view)", "Tiny dropdowns instead of large tap targets", "No progress indicator", "Conflicting actions side-by-side"]
    },
    {
        id: 6, title: 'Child Home / Restricted Launcher', good: ChildHomeScreenGood, bad: ChildHomeScreenBad,
        goodTips: ["Human-like, friendly language", "Clear visual hierarchy", "Large touch targets for apps", "Effective use of icons for scanning"],
        badTips: ["Overly complex language", "Cramped, confusing grid layout", "Tiny app icons", "Poor contrast on labels"]
    },
    {
        id: 7, title: 'Spending / Load Protection', good: SpendingProtectionScreenGood, bad: SpendingProtectionScreenBad,
        goodTips: ["Sensible default values", "Progressive disclosure of advanced settings", "Clear toggle states", "Large touch targets"],
        badTips: ["Overwhelming data dump", "Tiny inputs for thresholds", "Ambiguous toggle states", "Technical jargon"]
    },
    {
        id: 8, title: 'Attempted Action Blocking', good: BlockedActionScreenGood, bad: BlockedActionScreenBad,
        goodTips: ["Human-readable error messages", "Clear dominant primary action", "Friendly illustration to soften block"],
        badTips: ["Severe technical jargon inducing anxiety", "Six competing buttons causing decision paralysis", "Extremely harsh colors for a routine action"]
    },
    {
        id: 9, title: 'Parent Dashboard', good: ParentDashboardScreenGood, bad: ParentDashboardScreenBad,
        goodTips: ["Progressive disclosure of stats", "Visual hierarchy and grouping", "Large tap targets for profiles", "Human-readable, friendly language"],
        badTips: ["Lack of progressive disclosure", "Extremely cramped UI with tiny fonts", "Equal visual weight for multiple buttons", "Data overload instead of summaries"]
    },
    {
        id: 10, title: 'Settings & Help', good: SettingsScreenGood, bad: SettingsScreenBad,
        goodTips: ["Visual hierarchy and logical grouping", "Large touch targets spanning full row", "Consistent iconography aiding scanning", "Human-readable subtitles"],
        badTips: ["Lack of visual grouping", "Tiny tap targets for action buttons", "Equal visual weight for dangerous actions", "Severe technical jargon dump"]
    },
];

export function ComparisonGallery() {
    const navigate = useNavigate();
    const [currentScreenId, setCurrentScreenId] = useState<ScreenId>(1);
    const [viewMode, setViewMode] = useState<'split' | 'good' | 'bad'>('split');

    const currentScreen = screens.find(s => s.id === currentScreenId)!;
    const GoodComponent = currentScreen.good;
    const BadComponent = currentScreen.bad;

    return (
        <div className="h-screen bg-gray-900 text-gray-100 flex flex-col font-sans selection:bg-teal-500/30">
            {/* Header */}
            <header className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
                <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-white flex items-center gap-2">
                                Eskwelang-Eksperto
                            </h1>
                            <p className="text-xs text-gray-400">Parental Control App Design System</p>
                        </div>
                    </div>

                    {/* View Toggles for Nav */}
                    <div className="hidden md:flex bg-gray-900 border border-gray-700 rounded-lg p-1">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-4 py-1.5 text-sm font-medium rounded-md transition-all text-gray-400 hover:text-gray-200"
                        >
                            Interactive Prototype
                        </button>
                        <button
                            className="px-4 py-1.5 text-sm font-medium rounded-md transition-all bg-gray-700 text-white shadow-sm"
                        >
                            <LayoutGrid className="inline-block w-4 h-4 mr-1 mb-0.5" />
                            Comparison Gallery
                        </button>
                        <button
                            onClick={() => navigate('/design-system')}
                            className="px-4 py-1.5 text-sm font-medium rounded-md transition-all text-gray-400 hover:text-gray-200"
                        >
                            Design System Guide
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

                                    <div className="mt-6 bg-gray-800/50 border-2 border-green-500/30 rounded-2xl p-6 shadow-xl">
                                        <h3 className="text-green-400 font-bold mb-4 text-lg">What's Good:</h3>
                                        <ul className="space-y-2">
                                            {currentScreen.goodTips.map((tip, idx) => (
                                                <li key={idx} className="text-gray-300 text-sm flex gap-2">
                                                    <span className="text-green-500 mt-0.5">•</span>
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
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

                                    <div className="mt-6 bg-gray-800/50 border-2 border-red-500/30 rounded-2xl p-6 shadow-xl">
                                        <h3 className="text-red-400 font-bold mb-4 text-lg">What's Bad:</h3>
                                        <ul className="space-y-2">
                                            {currentScreen.badTips.map((tip, idx) => (
                                                <li key={idx} className="text-gray-300 text-sm flex gap-2">
                                                    <span className="text-red-500 mt-0.5">•</span>
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                </main>
            </div>
        </div>
    );
}
