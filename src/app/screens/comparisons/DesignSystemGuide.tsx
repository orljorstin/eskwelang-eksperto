import { colors, typography, spacing, borderRadius, shadows, touchTargets } from './design-system';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, BookOpen, ChevronLeft } from 'lucide-react';

export function DesignSystemGuide() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 font-sans selection:bg-teal-500/30 overflow-y-auto">
            {/* Header NavBar like ComparisonGallery */}
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
                            onClick={() => navigate('/comparison')}
                            className="px-4 py-1.5 text-sm font-medium rounded-md transition-all text-gray-400 hover:text-gray-200"
                        >
                            <LayoutGrid className="inline-block w-4 h-4 mr-1 mb-0.5" />
                            Comparison Gallery
                        </button>
                        <button
                            className="px-4 py-1.5 text-sm font-medium rounded-md transition-all bg-gray-700 text-white shadow-sm"
                        >
                            Design System Guide
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
                        📱 Eskwelang-Eksperto: Project Overview
                    </h1>
                </div>

                {/* Context & Goals */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-teal-400 mb-6">Context & Goals</h2>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 mb-6">
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            <strong>Real-world context:</strong> In low-income Filipino households, families typically share a single Android smartphone. Children use it for online schoolwork ("modules"), YouTube, and games. Parents have low-to-medium digital literacy.
                        </p>

                        <h3 className="font-bold text-white mt-6 mb-3">Key Risks:</h3>
                        <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-6">
                            <li>Kids open non-school apps during study time</li>
                            <li>Kids accidentally buy load or in-app purchases</li>
                            <li>Children's school data and messages are exposed on a shared device</li>
                        </ul>

                        <h3 className="font-bold text-white mt-6 mb-3">Parent Needs:</h3>
                        <ul className="list-disc pl-5 text-gray-300 space-y-2">
                            <li>Very simple profile switching (Parent / Child / Guest)</li>
                            <li>A clear, time-limited School Mode for study</li>
                            <li>Protection against accidental or impulsive spending</li>
                            <li>Simple Taglish-friendly UI (basic English + Filipino phrases)</li>
                        </ul>
                    </div>

                    <h2 className="text-2xl font-bold text-teal-400 mb-6">Design Goals</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-green-400 mb-4">✓ Primary Goals</h3>
                            <ul className="space-y-3 text-gray-300 text-sm">
                                <li>• Make safe behavior the default and easy</li>
                                <li>• Keep UI convenient for busy parents</li>
                                <li>• Avoid complex, technical language</li>
                                <li>• Prioritize clarity and confidence</li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-blue-400 mb-4">🎯 Target Users</h3>
                            <ul className="space-y-3 text-gray-300 text-sm">
                                <li>• Parents with low-to-medium tech literacy</li>
                                <li>• Children aged 7-12 years old</li>
                                <li>• Shared device environment</li>
                                <li>• Filipino families (Taglish speakers)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Colors */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6">Color Palette</h2>

                    <div className="space-y-8">
                        {/* Primary Colors */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Primary (Trust & Safety)</h3>
                            <div className="grid grid-cols-5 gap-3">
                                {Object.entries(colors.primary).map(([shade, color]) => (
                                    <div key={shade} className="group">
                                        <div
                                            className="h-20 rounded-lg shadow-lg mb-2"
                                            style={{ backgroundColor: color }}
                                        />
                                        <p className="text-sm text-gray-400">{shade}</p>
                                        <p className="text-xs text-gray-500 font-mono">{color}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Warning Colors */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Warning (Risk Alerts)</h3>
                            <div className="grid grid-cols-5 gap-3">
                                {Object.entries(colors.warning).map(([shade, color]) => (
                                    <div key={shade} className="group">
                                        <div
                                            className="h-20 rounded-lg shadow-lg mb-2"
                                            style={{ backgroundColor: color }}
                                        />
                                        <p className="text-sm text-gray-400">{shade}</p>
                                        <p className="text-xs text-gray-500 font-mono">{color}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Danger Colors */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Danger (Critical Actions)</h3>
                            <div className="grid grid-cols-5 gap-3">
                                {Object.entries(colors.danger).map(([shade, color]) => (
                                    <div key={shade} className="group">
                                        <div
                                            className="h-20 rounded-lg shadow-lg mb-2"
                                            style={{ backgroundColor: color }}
                                        />
                                        <p className="text-sm text-gray-400">{shade}</p>
                                        <p className="text-xs text-gray-500 font-mono">{color}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Typography */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6">Typography</h2>

                    <div className="bg-gray-800 rounded-2xl p-8 space-y-6">
                        <div>
                            <p className="text-sm text-gray-400 mb-2">H1 - Screen Titles</p>
                            <h1 className="text-white" style={{ fontSize: typography.sizes.h1 }}>
                                Eskwelang-Eksperto
                            </h1>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400 mb-2">H2 - Section Headings</p>
                            <h2 className="text-white" style={{ fontSize: typography.sizes.h2 }}>
                                Mga Profile
                            </h2>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400 mb-2">H3 - Subsections</p>
                            <h3 className="text-white" style={{ fontSize: typography.sizes.h3 }}>
                                Protection Settings
                            </h3>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400 mb-2">Body - Main Content</p>
                            <p className="text-gray-300" style={{ fontSize: typography.sizes.body }}>
                                I-set up ang parental controls para sa inyong pamilya. Simple lang!
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400 mb-2">Caption - Helper Text</p>
                            <p className="text-gray-400" style={{ fontSize: typography.sizes.caption }}>
                                Para sa password recovery lang
                            </p>
                        </div>
                    </div>
                </section>

                {/* Components */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6">Key Components</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Primary Button */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-4">Primary Button</h3>
                            <button className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl shadow-lg">
                                Magpatuloy
                            </button>
                            <p className="text-sm text-gray-400 mt-3">
                                Height: 56px (comfortable touch target)
                            </p>
                        </div>

                        {/* Secondary Button */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-4">Secondary Button</h3>
                            <button className="w-full h-14 bg-transparent border-2 border-teal-600 text-teal-500 hover:bg-teal-600 hover:text-white text-lg font-semibold rounded-xl">
                                Cancel
                            </button>
                            <p className="text-sm text-gray-400 mt-3">
                                For secondary actions
                            </p>
                        </div>
                    </div>
                </section>

                {/* UX Principles */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-teal-400 mb-6">Core UX Principles</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-green-400 mb-4">✓ DO</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li>• Use clear, simple language (Taglish)</li>
                                <li>• Make touch targets 44px+ minimum</li>
                                <li>• Show one dominant action per screen</li>
                                <li>• Use high contrast for readability</li>
                                <li>• Provide clear visual hierarchy</li>
                                <li>• Group related information together</li>
                                <li>• Show progress in multi-step flows</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-red-900/40 to-rose-900/40 border border-red-500/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-red-400 mb-4">✗ DON'T</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li>• Use technical jargon or complex terms</li>
                                <li>• Create small, hard-to-tap elements</li>
                                <li>• Show multiple competing actions</li>
                                <li>• Use low contrast or poor color choices</li>
                                <li>• Cram information without spacing</li>
                                <li>• Hide important info in tiny fonts</li>
                                <li>• Make risky actions look safe (color)</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
