import { colors, typography, spacing, borderRadius, shadows, touchTargets } from '../design-system';

export function DesignSystemGuide() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Eskwelang-Eksperto Design System
        </h1>
        <p className="text-xl text-gray-400">
          A comprehensive design system for a Filipino parental control app
        </p>
      </div>

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
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Primary Button</h3>
            <button className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl shadow-lg">
              Magpatuloy
            </button>
            <p className="text-sm text-gray-400 mt-3">
              Height: 56px (comfortable touch target)
            </p>
          </div>

          {/* Secondary Button */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Secondary Button</h3>
            <button className="w-full h-14 bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white text-lg font-semibold rounded-xl">
              Cancel
            </button>
            <p className="text-sm text-gray-400 mt-3">
              For secondary actions
            </p>
          </div>

          {/* Card */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Profile Card</h3>
            <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center text-3xl">
                  👦
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">Miguel</h4>
                  <p className="text-sm text-gray-600">Anak • 10 years old</p>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Toggle Switch</h3>
            <div className="flex items-center justify-between bg-white rounded-xl p-4">
              <span className="text-gray-900 font-medium">PIN Protection</span>
              <div className="relative w-14 h-8 bg-teal-600 rounded-full">
                <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UX Principles */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Core UX Principles</h2>
        
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

      {/* Touch Targets */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6">Touch Target Guidelines</h2>
        
        <div className="bg-gray-800 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Minimum (44px)</h3>
              <div 
                className="bg-teal-600 rounded-lg flex items-center justify-center text-white font-semibold"
                style={{ width: touchTargets.minimum, height: touchTargets.minimum }}
              >
                44px
              </div>
              <p className="text-sm text-gray-400 mt-3">
                iOS HIG minimum recommendation
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Comfortable (56px)</h3>
              <div 
                className="bg-teal-600 rounded-lg flex items-center justify-center text-white font-semibold"
                style={{ width: touchTargets.comfortable, height: touchTargets.comfortable }}
              >
                56px
              </div>
              <p className="text-sm text-gray-400 mt-3">
                Recommended for primary actions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
