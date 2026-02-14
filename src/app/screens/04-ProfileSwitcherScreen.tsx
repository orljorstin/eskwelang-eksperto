import { Crown, Baby, Users, Lock } from 'lucide-react';

export function ProfileSwitcherScreenGood() {
  return (
    <div className="h-full bg-gradient-to-br from-teal-500 to-teal-700 flex flex-col items-center justify-center px-6">
      {/* Header - clear question */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-3">
          Sino ang gagamit ngayon?
        </h1>
        <p className="text-teal-100 text-base">
          Piliin ang inyong profile
        </p>
      </div>

      {/* Profile tiles - large, tappable, clear */}
      <div className="w-full max-w-sm space-y-4">
        {/* Parent tile - distinct with PIN indicator */}
        <button className="w-full bg-white/95 backdrop-blur-sm hover:bg-white rounded-2xl p-6 flex items-center gap-4 shadow-2xl active:scale-95 transition-all border-4 border-amber-400">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
            👩
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-xl font-bold text-gray-900">Maria</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
              <Crown className="w-4 h-4 text-amber-500" />
              Magulang
            </p>
          </div>
          <div className="flex items-center gap-2 bg-amber-100 px-3 py-2 rounded-full">
            <Lock className="w-4 h-4 text-amber-700" />
            <span className="text-xs font-semibold text-amber-700">PIN</span>
          </div>
        </button>

        {/* Child tiles - friendly, accessible */}
        <button className="w-full bg-white/95 backdrop-blur-sm hover:bg-white rounded-2xl p-6 flex items-center gap-4 shadow-2xl active:scale-95 transition-all border-4 border-transparent hover:border-blue-300">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
            👦
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-xl font-bold text-gray-900">Miguel</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
              <Baby className="w-4 h-4 text-blue-500" />
              Anak • 10 yrs
            </p>
          </div>
        </button>

        <button className="w-full bg-white/95 backdrop-blur-sm hover:bg-white rounded-2xl p-6 flex items-center gap-4 shadow-2xl active:scale-95 transition-all border-4 border-transparent hover:border-pink-300">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
            👧
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-xl font-bold text-gray-900">Sofia</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
              <Baby className="w-4 h-4 text-pink-500" />
              Anak • 7 yrs
            </p>
          </div>
        </button>

        {/* Guest tile - visually distinct */}
        <button className="w-full bg-white/70 backdrop-blur-sm hover:bg-white/90 rounded-2xl p-6 flex items-center gap-4 shadow-xl active:scale-95 transition-all border-2 border-dashed border-white/50">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
            🧑
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-xl font-bold text-gray-900">Guest</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
              <Users className="w-4 h-4 text-gray-500" />
              Limited access
            </p>
          </div>
        </button>
      </div>

      {/* Current status indicator */}
      <div className="mt-12 text-center">
        <p className="text-teal-100 text-sm">
          Kasalukuyang gumagamit: <span className="font-semibold text-white">Sofia</span>
        </p>
      </div>
    </div>
  );
}

export function ProfileSwitcherScreenBad() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Unclear header */}
      <div className="px-3 py-2 bg-gray-200 border-b border-gray-300">
        <h1 className="text-sm font-normal text-gray-700">Select User</h1>
      </div>

      {/* Content - poor layout */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        {/* Cramped profile options */}
        <div className="space-y-2">
          <div className="bg-yellow-200 rounded p-2 flex items-center gap-2 border border-yellow-400">
            <div className="w-6 h-6 bg-yellow-400 rounded-full text-xs flex items-center justify-center">
              M
            </div>
            <span className="text-xs text-gray-800">Maria Santos (Parent)</span>
            <span className="ml-auto text-[9px] bg-yellow-400 px-1 rounded">PIN</span>
          </div>
          
          <div className="bg-blue-200 rounded p-2 flex items-center gap-2 border border-blue-400">
            <div className="w-6 h-6 bg-blue-400 rounded-full text-xs flex items-center justify-center">
              M
            </div>
            <span className="text-xs text-gray-800">Miguel (Child, 10)</span>
          </div>
          
          <div className="bg-pink-200 rounded p-2 flex items-center gap-2 border border-pink-400">
            <div className="w-6 h-6 bg-pink-400 rounded-full text-xs flex items-center justify-center">
              S
            </div>
            <span className="text-xs text-gray-800">Sofia (Child, 7)</span>
            <span className="ml-auto text-[9px] bg-green-400 px-1 rounded">Active</span>
          </div>
          
          <div className="bg-gray-200 rounded p-2 flex items-center gap-2 border border-gray-400">
            <div className="w-6 h-6 bg-gray-400 rounded-full text-xs flex items-center justify-center">
              G
            </div>
            <span className="text-xs text-gray-800">Guest User</span>
          </div>
        </div>

        {/* Multiple confusing buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="h-8 bg-blue-500 text-white text-xs rounded">
            Select
          </button>
          <button className="h-8 bg-green-500 text-white text-xs rounded">
            Switch
          </button>
          <button className="h-8 bg-purple-500 text-white text-xs rounded">
            Choose
          </button>
          <button className="h-8 bg-orange-500 text-white text-xs rounded">
            OK
          </button>
        </div>

        {/* Cluttered additional options */}
        <div className="mt-4 space-y-1">
          <button className="w-full h-7 bg-gray-300 text-gray-700 text-[10px] rounded">
            Add New User
          </button>
          <button className="w-full h-7 bg-gray-300 text-gray-700 text-[10px] rounded">
            Edit Profiles
          </button>
          <button className="w-full h-7 bg-gray-300 text-gray-700 text-[10px] rounded">
            Settings
          </button>
        </div>

        {/* Status info - poor visibility */}
        <p className="text-[9px] text-gray-400 mt-4 text-center">
          Current: Sofia | Last switched: 2h ago | Total profiles: 4
        </p>

        {/* Technical warning */}
        <div className="mt-4 bg-red-50 border border-red-200 p-2 rounded">
          <p className="text-[10px] text-red-600 leading-tight">
            WARNING: Switching user profiles will terminate current session and clear temporary cache. 
            Unsaved data may be lost.
          </p>
        </div>
      </div>
    </div>
  );
}
