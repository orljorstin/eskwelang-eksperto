import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useWakeLock } from '../../hooks/useWakeLock';
import { PinModal } from '../components/PinModal';
import { ScreenPinningGuide } from '../components/ScreenPinningGuide';
import { Play, Pause, Square, BookOpen, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Types for the session
type SessionStatus = 'setup' | 'guide' | 'running' | 'paused' | 'completed' | 'summary';

export function SessionScreen() {
    const { user, profiles } = useApp();
    const navigate = useNavigate();
    const { requestLock, releaseLock, isLocked } = useWakeLock();

    // Session State
    const [status, setStatus] = useState<SessionStatus>('setup');
    const [selectedProfileId, setSelectedProfileId] = useState<string>('');
    const [duration, setDuration] = useState<number>(25); // Minutes
    const [subject, setSubject] = useState<string>('Math');

    // Timer State
    const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
    const [interruptions, setInterruptions] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Safety
    const [showPinModal, setShowPinModal] = useState(false);
    const [pendingAction, setPendingAction] = useState<'stop' | 'exit' | null>(null);

    // Initial Setup
    useEffect(() => {
        if (profiles.length > 0 && !selectedProfileId) {
            setSelectedProfileId(profiles[0].id);
        }
    }, [profiles]);

    // Wake Lock & Visibility Tracking
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && status === 'running') {
                setInterruptions(prev => prev + 1);
                // Optional: Play sound or pause?
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [status]);

    // Timer Logic
    useEffect(() => {
        if (status === 'running') {
            requestLock();
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        completeSession();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            releaseLock();
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            releaseLock();
        };
    }, [status]);

    const handleStartClick = () => {
        // Show pinning guide first
        setStatus('guide');
    };

    const startSession = () => {
        setTimeLeft(duration * 60);
        setInterruptions(0);
        setStatus('running');
    };

    const togglePause = () => {
        if (status === 'running') setStatus('paused');
        else if (status === 'paused') setStatus('running');
    };

    const handleStopRequest = () => {
        setPendingAction('stop');
        setShowPinModal(true);
    };

    const handlePinSuccess = () => {
        if (pendingAction === 'stop') {
            setStatus('summary'); // Or just go back?
        }
        setShowPinModal(false);
        setPendingAction(null);
    };

    const completeSession = () => {
        setStatus('completed');
        // Save session logic here
    };

    // Format time mm:ss
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const selectedProfile = profiles.find(p => p.id === selectedProfileId);

    // --- RENDER HELPERS ---

    if (status === 'setup') {
        return (
            <div className="h-full bg-gray-50 flex flex-col p-6">
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-200 rounded-full">
                        <XCircle className="w-6 h-6 text-gray-400" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Start Session</h1>
                </div>

                <div className="space-y-6">
                    {/* Profile Selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {profiles.filter(p => p.role === 'child').map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => setSelectedProfileId(p.id)}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${selectedProfileId === p.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white'
                                        }`}
                                >
                                    <div className="text-2xl">{p.avatar}</div>
                                    <span className="text-xs font-semibold">{p.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Duration Slider */}
                    <div className="bg-white p-5 rounded-xl border-2 border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-4">Duration (Minutes)</label>
                        <div className="text-center text-4xl font-bold text-teal-600 mb-4">
                            {duration} <span className="text-base text-gray-400 font-normal">min</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="120"
                            step="5"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-600"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>5m</span>
                            <span>2h</span>
                        </div>
                    </div>

                    {/* Start Button */}
                    <button
                        onClick={handleStartClick}
                        disabled={!selectedProfileId}
                        className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white text-xl font-bold rounded-xl shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Play className="w-6 h-6 fill-current" />
                        Start Focus
                    </button>
                </div>
            </div>
        );
    }

    if (status === 'guide') {
        return (
            <div className="h-full bg-gray-50">
                <ScreenPinningGuide
                    onComplete={startSession}
                    onCancel={() => setStatus('setup')}
                />
            </div>
        );
    }

    if (status === 'running' || status === 'paused') {
        const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

        return (
            <div className="h-full bg-slate-900 text-white flex flex-col relative overflow-hidden">
                <PinModal
                    isOpen={showPinModal}
                    onClose={() => setShowPinModal(false)}
                    onSuccess={handlePinSuccess}
                    title="End Session?"
                    description="Enter PIN to stop the timer early."
                />

                {/* Progress Bar Background */}
                <div
                    className="absolute bottom-0 left-0 h-2 bg-teal-500 transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                />

                {/* Header */}
                <div className="p-6 flex justify-between items-center z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl">
                            {selectedProfile?.avatar}
                        </div>
                        <div>
                            <h2 className="font-bold">{selectedProfile?.name}</h2>
                            <p className="text-xs text-slate-400">{subject}</p>
                        </div>
                    </div>
                    {interruptions > 0 && (
                        <div className="flex items-center gap-1 text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                            <AlertTriangle className="w-3 h-3" />
                            {interruptions}
                        </div>
                    )}
                </div>

                {/* Timer Display */}
                <div className="flex-1 flex flex-col items-center justify-center z-10 space-y-8">
                    <div className="text-center">
                        <div className="text-[5rem] font-bold font-mono tracking-tighter leading-none">
                            {formatTime(timeLeft)}
                        </div>
                        <p className="text-slate-400 mt-2 font-medium tracking-widest text-sm uppercase">
                            {status === 'paused' ? 'Session Paused' : 'School Mode Active'}
                        </p>
                    </div>

                    {/* Alowed Apps Grid (Mock Data) */}
                    <div className="w-full max-w-md px-6">
                        <p className="text-slate-500 text-xs font-bold uppercase mb-4 text-center">Allowed Tools</p>
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { name: 'Classroom', icon: '📚', color: 'bg-green-500' },
                                { name: 'Browser', icon: '🌐', color: 'bg-blue-500' },
                                { name: 'Calculator', icon: '🔢', color: 'bg-orange-500' },
                                { name: 'Dictionary', icon: '📖', color: 'bg-purple-500' },
                            ].map((app) => (
                                <button key={app.name} className="flex flex-col items-center gap-2 group">
                                    <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-active:scale-95 transition-transform`}>
                                        {app.icon}
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium">{app.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="p-8 pb-12 flex items-center justify-center gap-8 z-10">
                    <button
                        onClick={togglePause}
                        className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                    >
                        {status === 'paused' ? <Play className="w-8 h-8 fill-current" /> : <Pause className="w-8 h-8 fill-current" />}
                    </button>

                    <button
                        onClick={handleStopRequest}
                        className="w-14 h-14 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-full flex items-center justify-center transition-all backdrop-blur-sm border-2 border-red-500/50"
                    >
                        <Square className="w-6 h-6 fill-current" />
                    </button>
                </div>

                {/* Wake Lock Indicator - subtle */}
                {isLocked && (
                    <div className="absolute bottom-4 right-4 text-[10px] text-slate-600">
                        Screen Active
                    </div>
                )}
            </div>
        );
    }

    if (status === 'completed' || status === 'summary') {
        return (
            <div className="h-full bg-teal-600 text-white flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-2">Great Job!</h1>
                <p className="text-teal-100 mb-8">You focused for {duration} minutes.</p>

                <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
                    <div className="bg-white/10 p-4 rounded-xl">
                        <p className="text-xs text-teal-200 uppercase">Interruptions</p>
                        <p className="text-2xl font-bold">{interruptions}</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl">
                        <p className="text-xs text-teal-200 uppercase">Subject</p>
                        <p className="text-2xl font-bold truncate">{subject}</p>
                    </div>
                </div>

                <button
                    onClick={() => {
                        setStatus('setup');
                        navigate('/dashboard');
                    }}
                    className="w-full max-w-xs py-4 bg-white text-teal-700 font-bold rounded-xl shadow-lg active:scale-95 transition-all"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return null;
}
