import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gamepad2, BookOpen, ShieldAlert, MonitorPlay, Clock } from 'lucide-react';
import { useT } from '../../context/LanguageContext';

// Mock data for recent activities
const MOCK_ACTIVITIES = [
    {
        id: '1',
        profileId: 'p2',
        profileName: 'Miguel',
        type: 'school',
        app: 'Khan Academy',
        duration: '45m',
        time: '10:30 AM',
        date: 'Today',
        icon: BookOpen,
        color: 'text-green-600',
        bg: 'bg-green-100'
    },
    {
        id: '2',
        profileId: 'p2',
        profileName: 'Miguel',
        type: 'play',
        app: 'Roblox',
        duration: '30m',
        time: '2:15 PM',
        date: 'Today',
        icon: Gamepad2,
        color: 'text-purple-600',
        bg: 'bg-purple-100'
    },
    {
        id: '3',
        profileId: 'p3',
        profileName: 'Ana',
        type: 'school',
        app: 'Google Classroom',
        duration: '1h 20m',
        time: '9:00 AM',
        date: 'Yesterday',
        icon: BookOpen,
        color: 'text-green-600',
        bg: 'bg-green-100'
    },
    {
        id: '4',
        profileId: 'p2',
        profileName: 'Miguel',
        type: 'blocked',
        app: 'YouTube',
        duration: null,
        time: '4:45 PM',
        date: 'Yesterday',
        icon: ShieldAlert,
        color: 'text-red-600',
        bg: 'bg-red-100',
        note: 'Attempted to access blocked app'
    },
    {
        id: '5',
        profileId: 'p3',
        profileName: 'Ana',
        type: 'play',
        app: 'YouTube Kids',
        duration: '45m',
        time: '7:00 PM',
        date: 'Yesterday',
        icon: MonitorPlay,
        color: 'text-blue-600',
        bg: 'bg-blue-100'
    },
    {
        id: '6',
        profileId: 'p2',
        profileName: 'Miguel',
        type: 'school',
        app: 'Calculator',
        duration: '15m',
        time: '11:15 AM',
        date: 'Mon, Oct 24',
        icon: BookOpen,
        color: 'text-green-600',
        bg: 'bg-green-100'
    }
];

export function RecentActivitiesScreen() {
    const navigate = useNavigate();
    const { t } = useT();

    return (
        <div className="h-full bg-gray-50 flex flex-col">
            {/* Header - Consistent Dark Gradient Style */}
            <div className="px-6 py-4 bg-gray-900 text-white relative overflow-hidden flex items-center gap-3 border-b border-gray-800">
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-teal-600/30 rounded-full blur-3xl mix-blend-screen" />
                    <div className="absolute bottom-[-50%] left-[-10%] w-64 h-64 bg-purple-600/30 rounded-full blur-3xl mix-blend-screen" />
                </div>
                <div className="relative z-10 flex items-center gap-3 w-full">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-400 hover:text-white" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-white">{t('activity')}</h1>
                        <p className="text-sm text-gray-400 mt-0.5">All monitored events</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
                <div className="space-y-6">
                    {/* Group by Date Simulator */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Today</h3>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            {MOCK_ACTIVITIES.filter(a => a.date === 'Today').map((activity, idx, arr) => (
                                <div key={activity.id} className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${idx !== arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${activity.bg}`}>
                                        <activity.icon className={`w-6 h-6 ${activity.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="font-bold text-gray-900 truncate pr-2">{activity.profileName}</p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 flex-shrink-0">
                                                <Clock className="w-3 h-3" /> {activity.time}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">{activity.app}</p>
                                        {activity.duration && (
                                            <p className="text-xs font-medium text-gray-500 mt-1">
                                                Duration: <span className="text-gray-700">{activity.duration}</span>
                                            </p>
                                        )}
                                        {activity.note && (
                                            <p className="text-xs font-medium text-red-500 mt-1">
                                                {activity.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Yesterday</h3>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            {MOCK_ACTIVITIES.filter(a => a.date === 'Yesterday').map((activity, idx, arr) => (
                                <div key={activity.id} className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${idx !== arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${activity.bg}`}>
                                        <activity.icon className={`w-6 h-6 ${activity.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="font-bold text-gray-900 truncate pr-2">{activity.profileName}</p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 flex-shrink-0">
                                                <Clock className="w-3 h-3" /> {activity.time}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">{activity.app}</p>
                                        {activity.duration && (
                                            <p className="text-xs font-medium text-gray-500 mt-1">
                                                Duration: <span className="text-gray-700">{activity.duration}</span>
                                            </p>
                                        )}
                                        {activity.note && (
                                            <p className="text-xs font-medium text-red-500 mt-1">
                                                {activity.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mon, Oct 24</h3>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                            {MOCK_ACTIVITIES.filter(a => a.date === 'Mon, Oct 24').map((activity, idx, arr) => (
                                <div key={activity.id} className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${idx !== arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${activity.bg}`}>
                                        <activity.icon className={`w-6 h-6 ${activity.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="font-bold text-gray-900 truncate pr-2">{activity.profileName}</p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 flex-shrink-0">
                                                <Clock className="w-3 h-3" /> {activity.time}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">{activity.app}</p>
                                        {activity.duration && (
                                            <p className="text-xs font-medium text-gray-500 mt-1">
                                                Duration: <span className="text-gray-700">{activity.duration}</span>
                                            </p>
                                        )}
                                        {activity.note && (
                                            <p className="text-xs font-medium text-red-500 mt-1">
                                                {activity.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
