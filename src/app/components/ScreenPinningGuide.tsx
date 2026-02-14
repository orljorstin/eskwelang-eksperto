import { Pin, Smartphone, Check, X } from 'lucide-react';

interface ScreenPinningGuideProps {
    onComplete: () => void;
    onCancel: () => void;
}

export function ScreenPinningGuide({ onComplete, onCancel }: ScreenPinningGuideProps) {
    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in slide-in-from-bottom-4">
            <div className="flex-1 p-8 flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                    <Pin className="w-10 h-10 text-teal-600" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Lock this App
                </h1>

                <p className="text-gray-600 mb-8 max-w-xs">
                    To keep your child focused and safe, please <strong>Pin</strong> or <strong>Guided Access</strong> this app before handing over the device.
                </p>

                {/* Instructions Grid */}
                <div className="grid gap-4 w-full max-w-sm text-left">
                    <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-blue-500">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Smartphone className="w-4 h-4 text-blue-500" /> Android
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Swipe up & hold to see recent apps → Tap app icon → Select <strong>"Pin"</strong>.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-gray-500">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Smartphone className="w-4 h-4 text-gray-500" /> iOS (iPad/iPhone)
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Triple-click the side button to start <strong>Guided Access</strong>.
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3.5 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onComplete}
                        className="flex-[2] py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Check className="w-5 h-5" />
                        I've Pinned It
                    </button>
                </div>
            </div>
        </div>
    );
}
