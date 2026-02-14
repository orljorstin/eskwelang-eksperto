import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

interface PlaceholderScreenProps {
    title: string;
    description?: string;
}

export function PlaceholderScreen({ title, description = "This feature is coming soon!" }: PlaceholderScreenProps) {
    const navigate = useNavigate();

    return (
        <div className="h-full bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white/50">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Construction className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Under Construction</h2>
                <p className="text-gray-500 max-w-xs mx-auto">
                    {description}
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-8 px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}
