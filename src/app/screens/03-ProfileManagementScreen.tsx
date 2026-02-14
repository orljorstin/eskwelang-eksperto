import { useState } from 'react';
import { User, UserPlus, Edit, Crown, Baby, Users, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export function ProfileManagementScreenGood() {
  const { user, profiles, updateProfile } = useApp();
  const navigate = useNavigate();

  const [editingProfile, setEditingProfile] = useState<any | null>(null);
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [editAge, setEditAge] = useState<number | ''>('');

  // Combine parent (user) and child profiles
  const allProfiles = [
    {
      id: user?.id || 'parent',
      name: user?.full_name || 'Parent',
      role: 'parent',
      avatar: '👩',
      age: null as number | null
    },
    ...profiles
  ];

  const handleEditClick = (profile: any) => {
    // Parent profile editing might be restricted or handled differently
    if (profile.role === 'parent') {
      // For now, prevent editing parent here or just show name
      // alert("Parent profile editing coming soon.");
      return;
    }
    setEditingProfile(profile);
    setEditName(profile.name);
    setEditAvatar(profile.avatar);
    setEditAge(profile.age || '');
  };

  const handleSave = async () => {
    if (!editingProfile) return;

    try {
      await updateProfile({
        ...editingProfile,
        name: editName,
        avatar: editAvatar,
        age: editAge === '' ? undefined : Number(editAge)
      });
      setEditingProfile(null);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

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

  const AVATARS = ['👶', '👦', 'ab', '👧', '👱', '😺', '🐶', '🦄', '🤖', '👾'];

  return (
    <div className="h-full bg-gray-50 flex flex-col relative">
      {/* Edit Modal */}
      {editingProfile && (
        <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Edit Profile</h3>
              <button onClick={() => setEditingProfile(null)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="p-6 space-y-4">
              {/* Avatar Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {AVATARS.map(char => (
                    <button
                      key={char}
                      onClick={() => setEditAvatar(char)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 flex-shrink-0 transition-all ${editAvatar === char ? 'border-teal-500 bg-teal-50 scale-110' : 'border-transparent bg-gray-100'
                        }`}
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>

              {/* Age Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 flex gap-3">
              <button
                onClick={() => setEditingProfile(null)}
                className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mga Profile</h1>
          <p className="text-sm text-gray-600 mt-1">I-manage ang family profiles</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Profile cards - clear grouping, consistent layout */}
        <div className="space-y-4 mb-6">
          {allProfiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-teal-300 transition-all shadow-sm group"
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
                    {profile.age ? ` • ${profile.age} years old` : ''}
                  </p>
                </div>

                {/* Action - clear, accessible */}
                {profile.role !== 'parent' && (
                  <button
                    onClick={() => handleEditClick(profile)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                  >
                    <Edit className="w-5 h-5 text-gray-600 group-hover:text-teal-600 transition-colors" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add new profile card - distinct visual */}
        <button
          onClick={() => navigate('/create-profile')}
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl p-4 flex items-center justify-center gap-3 shadow-lg active:scale-98 transition-all"
        >
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
