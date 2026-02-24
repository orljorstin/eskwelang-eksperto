import { Clock, BookOpen, Gamepad2, ShieldAlert, TrendingUp } from 'lucide-react';

export function ParentDashboardScreenGood() {
  const todayStats = {
    schoolTime: 125,
    playTime: 45,
    blockedAttempts: 3,
  };

  const recentActivity = [
    { time: '2:30 PM', child: 'Miguel', action: 'Started School Mode', duration: '45 min', icon: '📚' },
    { time: '1:15 PM', child: 'Sofia', action: 'Blocked: YouTube', icon: '🚫' },
    { time: '11:00 AM', child: 'Miguel', action: 'Completed School Session', duration: '60 min', icon: '✅' },
    { time: '10:30 AM', child: 'Sofia', action: 'Started Play Mode', duration: '30 min', icon: '🎮' },
  ];

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-teal-100 text-sm">Today's Activity - February 5</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Summary cards - clear grouping */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* School time */}
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-teal-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-teal-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">School Mode</p>
            <p className="text-2xl font-bold text-gray-900">{todayStats.schoolTime} min</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>+15% vs yesterday</span>
            </div>
          </div>

          {/* Play time */}
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Play Time</p>
            <p className="text-2xl font-bold text-gray-900">{todayStats.playTime} min</p>
            <div className="mt-2 text-xs text-gray-500">
              Within limit
            </div>
          </div>
        </div>

        {/* Blocked attempts card */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 shadow-sm border-2 border-orange-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Blocked Attempts</p>
              <p className="text-3xl font-bold text-gray-900">{todayStats.blockedAttempts}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">Most blocked:</p>
              <p className="text-sm font-semibold text-gray-900">YouTube</p>
            </div>
          </div>
        </div>

        {/* Recent activity - readable list */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Recent Activity</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity, index) => (
              <div key={index} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0">{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className="font-semibold text-gray-900">{activity.child}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <p className="text-sm text-gray-700">{activity.action}</p>
                    {activity.duration && (
                      <p className="text-xs text-gray-500 mt-1">Duration: {activity.duration}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View all link */}
        <button className="w-full mt-4 py-3 text-teal-600 font-medium text-sm hover:text-teal-700">
          View Full History →
        </button>
      </div>
    </div>
  );
}

export function ParentDashboardScreenBad() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Poor header */}
      <div className="px-3 py-2 bg-gray-200 border-b">
        <h1 className="text-sm font-normal text-gray-700">Activity Log</h1>
      </div>

      {/* Content - overwhelming data */}
      <div className="flex-1 px-3 py-3 overflow-y-auto">
        {/* Cramped stats */}
        <div className="grid grid-cols-3 gap-1 mb-3">
          <div className="bg-blue-100 p-2 rounded text-center">
            <p className="text-[10px] text-gray-600">School</p>
            <p className="text-sm font-bold text-gray-900">125m</p>
          </div>
          <div className="bg-purple-100 p-2 rounded text-center">
            <p className="text-[10px] text-gray-600">Play</p>
            <p className="text-sm font-bold text-gray-900">45m</p>
          </div>
          <div className="bg-red-100 p-2 rounded text-center">
            <p className="text-[10px] text-gray-600">Block</p>
            <p className="text-sm font-bold text-gray-900">3</p>
          </div>
        </div>

        {/* Poor list formatting - tiny fonts */}
        <div className="bg-gray-50 rounded p-2 mb-2">
          <p className="text-[9px] text-gray-600 leading-tight">
            14:30 | Miguel | School Mode | 45min | Active<br/>
            13:15 | Sofia | Block:YouTube | N/A | Denied<br/>
            11:00 | Miguel | Complete | 60min | Success<br/>
            10:30 | Sofia | Play Mode | 30min | Complete
          </p>
        </div>

        {/* Overwhelming metrics */}
        <div className="space-y-1 mb-3">
          <div className="flex justify-between text-[10px] bg-gray-100 p-1 rounded">
            <span>Avg Session</span>
            <span>52.5 min</span>
          </div>
          <div className="flex justify-between text-[10px] bg-gray-100 p-1 rounded">
            <span>Total Today</span>
            <span>170 min</span>
          </div>
          <div className="flex justify-between text-[10px] bg-gray-100 p-1 rounded">
            <span>Block Rate</span>
            <span>12.5%</span>
          </div>
          <div className="flex justify-between text-[10px] bg-gray-100 p-1 rounded">
            <span>Compliance</span>
            <span>87.5%</span>
          </div>
        </div>

        {/* Multiple competing action buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button className="h-7 bg-blue-400 text-white text-xs rounded">View</button>
          <button className="h-7 bg-green-400 text-white text-xs rounded">Details</button>
          <button className="h-7 bg-purple-400 text-white text-xs rounded">Export</button>
          <button className="h-7 bg-orange-400 text-white text-xs rounded">Report</button>
        </div>

        {/* Data overload */}
        <div className="mt-3 bg-yellow-50 border border-yellow-200 p-2 rounded">
          <p className="text-[9px] text-gray-600 leading-tight">
            Analytics: Total sessions=4 | Avg duration=42.5min | Peak usage=14:00-15:00 | 
            Most used app=Classroom | Block frequency=0.75/hr | Compliance score=87.5% | 
            Trend=+15% WoW
          </p>
        </div>
      </div>
    </div>
  );
}
