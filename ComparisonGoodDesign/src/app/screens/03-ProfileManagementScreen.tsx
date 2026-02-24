import { useState } from 'react';
import { User, UserPlus, Edit2, Crown, Baby, Users } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  role: 'parent' | 'child' | 'guest';
  age?: number;
  avatar: string;
}

export function ProfileManagementScreenGood() {
  const [profiles] = useState<Profile[]>([
    { id: '1', name: 'Maria Santos', role: 'parent', avatar: '👩', age: 35 },
    { id: '2', name: 'Miguel', role: 'child', avatar: '👦', age: 10 },
    { id: '3', name: 'Sofia', role: 'child', avatar: '👧', age: 7 },
  ]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'parent': return <Crown className="w-4 h-4 text-amber-500" />;
      case 'child': return <Baby className="w-4 h-4 text-blue-500" />;
      case 'guest': return <Users className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'parent': return 'Magulang';
      case 'child': return 'Anak';
      case 'guest': return 'Guest';
      default: return role;
    }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Mga Profile</h1>
        <p className="text-sm text-gray-600 mt-1">I-manage ang family profiles</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Profile cards - clear grouping, consistent layout */}
        <div className="space-y-4 mb-6">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-teal-300 transition-all shadow-sm"
            >
              <div className="flex items-center gap-4">
                {/* Avatar - large, clear */}
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                  {profile.avatar}
                </div>

                {/* Info - well aligned */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {getRoleIcon(profile.role)}
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {profile.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getRoleLabel(profile.role)}
                    {profile.age && ` • ${profile.age} years old`}
                  </p>
                </div>

                {/* Action - clear, accessible */}
                <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors">
                  <Edit2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add new profile card - distinct visual */}
        <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl p-4 flex items-center justify-center gap-3 shadow-lg active:scale-98 transition-all">
          <UserPlus className="w-6 h-6" />
          <span className="text-lg font-semibold">Magdagdag ng Profile</span>
        </button>

        {/* Helper text */}
        <div className="mt-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
          <p className="text-sm text-teal-900">
            <span className="font-medium">💡 Tip:</span> Gumawa ng profile para sa bawat taong gumagamit ng phone.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProfileManagementScreenBad() {
  const [profiles] = useState([
    { id: '1', name: 'Maria Santos', role: 'parent' },
    { id: '2', name: 'Miguel', role: 'child' },
    { id: '3', name: 'Sofia', role: 'child' },
  ]);

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Poor header */}
      <div className="px-3 py-2 bg-gray-200">
        <h1 className="text-base font-normal text-gray-700">Profile List</h1>
      </div>

      {/* Content - cramped, poor alignment */}
      <div className="flex-1 px-3 py-3 overflow-y-auto">
        {/* Cramped profile items */}
        <div className="space-y-2">
          {profiles.map((profile, index) => (
            <div
              key={profile.id}
              className="bg-gray-50 rounded p-2 border border-gray-300 flex items-center gap-2"
            >
              {/* Tiny avatar */}
              <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center text-xs">
                {index + 1}
              </div>
              
              {/* Misaligned text */}
              <div className="flex-1">
                <p className="text-sm text-gray-800">{profile.name}</p>
                <p className="text-[10px] text-gray-500">{profile.role}</p>
              </div>

              {/* Multiple small buttons - unclear purpose */}
              <button className="px-2 py-1 bg-blue-500 text-white text-[10px] rounded">
                Edit
              </button>
              <button className="px-2 py-1 bg-gray-400 text-white text-[10px] rounded">
                View
              </button>
            </div>
          ))}
        </div>

        {/* Add button - poor placement, unclear */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 h-8 bg-green-500 text-white text-xs rounded">
            + Add
          </button>
          <button className="flex-1 h-8 bg-blue-500 text-white text-xs rounded">
            New
          </button>
        </div>

        {/* Overcrowded additional options */}
        <div className="mt-4 space-y-1">
          <button className="w-full h-7 bg-purple-400 text-white text-xs rounded">
            Import Profiles
          </button>
          <button className="w-full h-7 bg-orange-400 text-white text-xs rounded">
            Export Data
          </button>
          <button className="w-full h-7 bg-pink-400 text-white text-xs rounded">
            Sync Accounts
          </button>
          <button className="w-full h-7 bg-indigo-400 text-white text-xs rounded">
            Manage Settings
          </button>
        </div>

        {/* Technical jargon help text */}
        <div className="mt-4 bg-gray-100 p-2 rounded text-[10px] text-gray-600 leading-tight">
          Note: User profile management interface. Create, read, update, delete operations available. 
          Maximum 10 profiles per device instance. Sync functionality requires network connectivity.
        </div>
      </div>
    </div>
  );
}
