import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gamepad2, Search } from 'lucide-react';

export function LauncherSettingsScreen() {
    const navigate = useNavigate();
    const [apps, setApps] = useState([
        { id: '1', name: 'YouTube Kids', allowed: true, icon: '📺' },
        { id: '2', name: 'Khan Academy', allowed: true, icon: '🎓' },
        { id: '3', name: 'Roblox', allowed: false, icon: '🎮' },
        { id: '4', name: 'Facebook', allowed: false, icon: '📘' },
        { id: '5', name: 'Calculator', allowed: true, icon: '🔢' },
        { id: '6', name: 'Camera', allowed: true, icon: '📷' },
    ]);

    const toggleApp = (id: string) => {
        setApps(apps.map(app =>
            app.id === id ? { ...app, allowed: !app.allowed } : app
        ));
    };

    return (
        <div className="h-full bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Allowed Apps</h1>
                    <p className="text-sm text-gray-600">Piliin ang mga apps na pwedeng gamitin</p>
                </div>
            </div>

            {/* Search */}
            <div className="px-6 py-3 bg-white border-b border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search apps..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-3">
                    {apps.map((app) => (
                        <div
                            key={app.id}
                            className="bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-4 shadow-sm"
                        >
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                {app.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{app.name}</h3>
                                <p className={`text-xs ${app.allowed ? 'text-green-600' : 'text-gray-500'}`}>
                                    {app.allowed ? 'Allowed' : 'Blocked'}
                                </p>
                            </div>

                            {/* Toggle Switch */}
                            <button
                                onClick={() => toggleApp(app.id)}
                                className={`relative w-12 h-7 rounded-full transition-colors ${app.allowed ? 'bg-teal-600' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${app.allowed ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-teal-50 rounded-xl border border-teal-100 text-center">
                    <Gamepad2 className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                    <h4 className="font-bold text-teal-800">Launcher Mode Active</h4>
                    <p className="text-sm text-teal-700 mt-1">
                        Only the apps selected above will appear in Child Mode.
                    </p>
                </div>
            </div>
        </div>
    );
}
