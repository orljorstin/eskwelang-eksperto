export function ProjectOverview() {
  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-8 mb-8">
      <h2 className="text-3xl font-bold text-white mb-6">
        📱 Eskwelang-Eksperto: Project Overview
      </h2>

      {/* Context */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-teal-400 mb-4">Context & Goals</h3>
        <div className="bg-gray-900 rounded-lg p-6 text-gray-300 space-y-4">
          <p>
            <strong className="text-white">Real-world context:</strong> In low-income Filipino households, 
            families typically share a single Android smartphone. Children use it for online schoolwork 
            ("modules"), YouTube, and games. Parents have low-to-medium digital literacy.
          </p>
          <p>
            <strong className="text-white">Key Risks:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Kids open non-school apps during study time</li>
            <li>Kids accidentally buy load or in-app purchases</li>
            <li>Children's school data and messages are exposed on a shared device</li>
          </ul>
          <p>
            <strong className="text-white">Parent Needs:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Very simple profile switching (Parent / Child / Guest)</li>
            <li>A clear, time-limited School Mode for study</li>
            <li>Protection against accidental or impulsive spending</li>
            <li>Simple Taglish-friendly UI (basic English + Filipino phrases)</li>
          </ul>
        </div>
      </section>

      {/* Design Goals */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-teal-400 mb-4">Design Goals</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">✓ Primary Goals</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Make safe behavior the default and easy</li>
              <li>• Keep UI convenient for busy parents</li>
              <li>• Avoid complex, technical language</li>
              <li>• Prioritize clarity and confidence</li>
            </ul>
          </div>
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">🎯 Target Users</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Parents with low-to-medium tech literacy</li>
              <li>• Children aged 7-12 years old</li>
              <li>• Shared device environment</li>
              <li>• Filipino families (Taglish speakers)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-teal-400 mb-4">10 Core Screens</h3>
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="grid gap-4">
            {[
              { num: 1, title: 'Sign-up (Parent Onboarding)', desc: 'Register locally and set a 4-6 digit PIN' },
              { num: 2, title: 'Log-in / App Lock Screen', desc: 'Require parent PIN to access Parent area' },
              { num: 3, title: 'Profile Management', desc: 'Add/edit multiple profiles (Parent, Children, Guest)' },
              { num: 4, title: 'Quick Profile Switcher', desc: 'Choose current active profile' },
              { num: 5, title: 'School Mode Setup', desc: 'Configure child session (mode + duration)' },
              { num: 6, title: 'Child Home / Restricted Launcher', desc: "Child's home when in School Mode" },
              { num: 7, title: 'Spending / Load Protection', desc: 'Set weekly load limit and confirmation rules' },
              { num: 8, title: 'Attempted Action Blocking', desc: 'Show when a child tries to open blocked app' },
              { num: 9, title: 'Parent Dashboard', desc: 'Show how the child has been using the device' },
              { num: 10, title: 'Settings & Help', desc: 'Change language, manage protections, FAQ' },
            ].map((screen) => (
              <div key={screen.num} className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {screen.num}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{screen.title}</h4>
                  <p className="text-sm text-gray-400">{screen.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good vs Bad Methodology */}
      <section>
        <h3 className="text-xl font-semibold text-teal-400 mb-4">Good vs. Bad Comparison Methodology</h3>
        <div className="bg-gray-900 rounded-lg p-6">
          <p className="text-gray-300 mb-4">
            Each of the 10 screens has been designed in two variants to demonstrate best practices 
            and common UX mistakes. This approach is ideal for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
            <li><strong className="text-white">Usability Testing:</strong> Compare user performance and satisfaction between good and bad designs</li>
            <li><strong className="text-white">Educational Purposes:</strong> Teach UX principles through concrete examples</li>
            <li><strong className="text-white">Design Reviews:</strong> Facilitate discussions about what makes effective mobile UI</li>
            <li><strong className="text-white">Client Presentations:</strong> Show the value of investing in good UX design</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
