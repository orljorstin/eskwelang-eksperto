import { useState } from 'react';
import { X, Save, Plus, Trash2, Edit3 } from 'lucide-react';

interface NotesAppProps {
    onClose: () => void;
}

interface Note {
    id: string;
    title: string;
    content: string;
    date: Date;
}

export function NotesApp({ onClose }: NotesAppProps) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
    const [draftTitle, setDraftTitle] = useState('');
    const [draftContent, setDraftContent] = useState('');
    const [view, setView] = useState<'list' | 'edit'>('list');

    const handleCreateNew = () => {
        setDraftTitle('');
        setDraftContent('');
        setActiveNoteId(null);
        setView('edit');
    };

    const handleOpenNote = (note: Note) => {
        setDraftTitle(note.title);
        setDraftContent(note.content);
        setActiveNoteId(note.id);
        setView('edit');
    };

    const handleSave = () => {
        if (!draftTitle.trim() && !draftContent.trim()) {
            setView('list');
            return;
        }

        if (activeNoteId) {
            setNotes(notes.map(n =>
                n.id === activeNoteId
                    ? { ...n, title: draftTitle || 'Untitled', content: draftContent, date: new Date() }
                    : n
            ));
        } else {
            const newNote: Note = {
                id: Date.now().toString(),
                title: draftTitle || 'Untitled',
                content: draftContent,
                date: new Date()
            };
            setNotes([newNote, ...notes]);
        }
        setView('list');
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotes(notes.filter(n => n.id !== id));
    };

    return (
        <div className="h-full w-full bg-[#fdfbf7] flex flex-col z-50 fixed inset-0">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                        📝
                    </div>
                    <span className="text-gray-800 font-bold text-lg">My Notes</span>
                </div>
                <div className="flex items-center gap-3">
                    {view === 'edit' ? (
                        <button
                            onClick={handleSave}
                            className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 active:scale-95 transition-transform"
                        >
                            <Save className="w-4 h-4" /> Save
                        </button>
                    ) : (
                        <button
                            onClick={handleCreateNew}
                            className="bg-pink-500 text-white p-2 rounded-full shadow-md active:scale-95 transition-transform"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    )}

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto w-full relative">

                {/* List View */}
                {view === 'list' && (
                    <div className="p-6">
                        {notes.length === 0 ? (
                            <div className="h-48 flex flex-col items-center justify-center text-gray-400">
                                <Edit3 className="w-12 h-12 mb-3 opacity-20" />
                                <p>No notes yet.</p>
                                <button
                                    onClick={handleCreateNew}
                                    className="mt-4 text-pink-600 font-semibold"
                                >
                                    Create your first note!
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                {notes.map(note => (
                                    <div
                                        key={note.id}
                                        onClick={() => handleOpenNote(note)}
                                        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-all cursor-pointer group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-pink-400"></div>
                                        <h3 className="font-bold text-gray-800 mb-1 truncate pr-8">{note.title}</h3>
                                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                                            {note.content || 'Empty note...'}
                                        </p>

                                        <button
                                            onClick={(e) => handleDelete(note.id, e)}
                                            className="absolute top-3 right-3 p-1.5 text-gray-300 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Edit View */}
                {view === 'edit' && (
                    <div className="h-full flex flex-col p-6 max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Note Title..."
                            value={draftTitle}
                            onChange={(e) => setDraftTitle(e.target.value)}
                            className="text-2xl font-bold bg-transparent border-none outline-none mb-4 text-gray-800 placeholder-gray-300 w-full"
                        />
                        <textarea
                            placeholder="Start typing your ideas here..."
                            value={draftContent}
                            onChange={(e) => setDraftContent(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none resize-none text-gray-700 leading-relaxed text-lg placeholder-gray-300 w-full"
                            style={{
                                backgroundImage: 'linear-gradient(transparent, transparent 27px, #f0f0f0 27px, #f0f0f0 28px)',
                                backgroundSize: '100% 28px',
                                lineHeight: '28px'
                            }}
                        />
                    </div>
                )}

            </div>
        </div>
    );
}
