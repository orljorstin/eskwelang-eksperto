import { useState } from 'react';
import { X, Search, ChevronLeft, ChevronRight, RotateCw, ShieldAlert } from 'lucide-react';
import { useT } from '../../context/LanguageContext';

interface BrowserAppProps {
    onClose: () => void;
}

export function BrowserApp({ onClose }: BrowserAppProps) {
    const { t } = useT();
    const [url, setUrl] = useState('https://www.wikipedia.org');
    const [inputUrl, setInputUrl] = useState('wikipedia.org');
    const [isLoading, setIsLoading] = useState(false);

    // Simple validation and URL formatting
    const handleNavigation = (e: React.FormEvent) => {
        e.preventDefault();

        let newUrl = inputUrl.trim();
        if (!newUrl) return;

        // Basic check for safe URLs (in a real app, this would check against a whitelist)
        if (!newUrl.startsWith('http')) {
            newUrl = `https://${newUrl}`;
        }

        setIsLoading(true);
        setUrl(newUrl);
        setInputUrl(newUrl.replace('https://', '').replace('http://', ''));
    };

    return (
        <div className="h-full w-full bg-gray-50 flex flex-col z-50 fixed inset-0">
            {/* Header / Toolbar */}
            <div className="bg-white border-b border-gray-200 px-2 py-3 shadow-sm flex flex-col gap-2 relative z-10">

                {/* Top Row: Title, Close button */}
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                            🌐
                        </div>
                        <span className="font-semibold text-sm text-gray-700">Safe Browser</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Bar */}
                <div className="flex items-center gap-2 px-1">
                    <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-30">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-30" disabled>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setIsLoading(true)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-500' : ''}`} />
                    </button>

                    {/* Address Bar */}
                    <form onSubmit={handleNavigation} className="flex-1 relative">
                        <div className="absolute left-3 top-2.5 flex items-center pointer-events-none">
                            <ShieldAlert className="w-4 h-4 text-green-500" />
                        </div>
                        <input
                            type="text"
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            className="w-full bg-gray-100 border-none rounded-full py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                            placeholder="Search or enter web address"
                        />
                    </form>
                </div>
            </div>

            {/* Browser Content Viewport */}
            <div className="flex-1 bg-white relative">
                {/* Note: In a real PWA context, iframes are heavily restricted by the X-Frame-Options of the target site. 
                    Many sites (like Google) refuse to load in an iframe. 
                    Wikipedia is usually permissive for demonstration purposes. */}
                <iframe
                    src={url}
                    className="w-full h-full border-none"
                    title="Browser Viewport"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                    onLoad={() => setIsLoading(false)}
                />

                {/* Info Overlay for restricted sites (Simulation) */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm z-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
