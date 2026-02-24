import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Globe, FileText, Clock, Hand } from 'lucide-react';

export function ChildHomeScreenGood() {
  const [timeRemaining, setTimeRemaining] = useState(38 * 60); // 38 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const allowedApps = [
    { id: '1', name: 'Google Classroom', icon: '📚', color: 'from-green-400 to-green-500' },
    { id: '2', name: 'Browser', icon: '🌐', color: 'from-blue-400 to-blue-500' },
    { id: '3', name: 'PDF Reader', icon: '📄', color: 'from-red-400 to-red-500' },
    { id: '4', name: 'Calculator', icon: '🔢', color: 'from-purple-400 to-purple-500' },
    { id: '5', name: 'Dictionary', icon: '📖', color: 'from-orange-400 to-orange-500' },
    { id: '6', name: 'Notes', icon: '📝', color: 'from-pink-400 to-pink-500' },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {/* Header - clear info about current session */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-4 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-xl">
            👦
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Hi, Miguel!</h1>
            <div className="flex items-center gap-2 text-teal-100 text-sm">
              <GraduationCap className="w-4 h-4" />
              <span>School Mode</span>
            </div>
          </div>
        </div>
        
        {/* Timer - prominent, clear */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Time Left:</span>
          </div>
          <div className="text-2xl font-bold tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Mga Pwedeng Apps
        </h2>

        {/* App grid - simple, clear */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {allowedApps.map((app) => (
            <button
              key={app.id}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center text-2xl shadow-md`}>
                {app.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                {app.name}
              </span>
            </button>
          ))}
        </div>

        {/* Helper message */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-teal-200">
          <p className="text-sm text-gray-700 text-center">
            📖 Mga school apps lang ang pwede ngayon
          </p>
        </div>
      </div>

      {/* Request more time - small, non-obvious but available */}
      <div className="px-6 pb-6">
        <button className="w-full py-3 text-sm text-gray-500 hover:text-teal-600 font-medium underline underline-offset-2">
          Humingi ng Karagdagang Oras
        </button>
      </div>
    </div>
  );
}

export function ChildHomeScreenBad() {
  return (
    <div className="h-full bg-white">
      {/* Cluttered header */}
      <div className="bg-blue-400 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-blue-300 rounded-full text-[10px] flex items-center justify-center">
            M
          </div>
          <span className="text-xs text-white">Miguel</span>
          <span className="text-[9px] text-blue-200">| School</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-white" />
          <span className="text-xs text-white">38:24</span>
        </div>
      </div>

      {/* Content - poor organization */}
      <div className="px-3 py-3">
        {/* Mixed allowed and blocked apps - confusing */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-green-300 rounded flex items-center justify-center text-sm">
              GC
            </div>
            <span className="text-[9px] text-gray-600 text-center">Classroom</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <div className="w-12 h-12 bg-red-300 rounded flex items-center justify-center text-sm">
              YT
            </div>
            <span className="text-[9px] text-gray-600 text-center">YouTube</span>
            <span className="text-[8px] text-red-500">Blocked</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-blue-300 rounded flex items-center justify-center text-sm">
              BR
            </div>
            <span className="text-[9px] text-gray-600 text-center">Browser</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <div className="w-12 h-12 bg-purple-300 rounded flex items-center justify-center text-sm">
              GM
            </div>
            <span className="text-[9px] text-gray-600 text-center">Games</span>
            <span className="text-[8px] text-red-500">Blocked</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-orange-300 rounded flex items-center justify-center text-sm">
              PD
            </div>
            <span className="text-[9px] text-gray-600 text-center">PDF</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-pink-300 rounded flex items-center justify-center text-sm">
              CA
            </div>
            <span className="text-[9px] text-gray-600 text-center">Calc</span>
          </div>
        </div>

        {/* Confusing timer display */}
        <div className="bg-gray-100 p-2 rounded mb-3">
          <p className="text-[10px] text-gray-600">
            Session timeout: 38 min 24 sec remaining | Mode: Educational | Status: Active
          </p>
        </div>

        {/* Multiple competing action buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button className="h-7 bg-blue-400 text-white text-[10px] rounded">
            Request Time
          </button>
          <button className="h-7 bg-green-400 text-white text-[10px] rounded">
            Add Time
          </button>
          <button className="h-7 bg-purple-400 text-white text-[10px] rounded">
            Extend
          </button>
          <button className="h-7 bg-orange-400 text-white text-[10px] rounded">
            More Time
          </button>
        </div>

        {/* Technical alert */}
        <div className="mt-3 bg-yellow-100 border border-yellow-300 p-2 rounded">
          <p className="text-[9px] text-gray-700 leading-tight">
            NOTICE: Current profile is in restricted educational mode. 
            Only applications whitelisted for academic purposes are accessible during this session period.
          </p>
        </div>
      </div>
    </div>
  );
}
