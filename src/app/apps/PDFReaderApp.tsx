import { useState } from 'react';
import { X, FileText, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { useT } from '../../context/LanguageContext';

interface PDFReaderAppProps {
    onClose: () => void;
}

export function PDFReaderApp({ onClose }: PDFReaderAppProps) {
    const { t } = useT();
    const [page, setPage] = useState(1);
    const [zoom, setZoom] = useState(100);
    const totalPages = 5;

    return (
        <div className="h-full w-full bg-gray-900 flex flex-col z-50 fixed inset-0">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white">
                        <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-gray-100 font-medium text-sm truncate max-w-[150px]">
                        Science_Homework.pdf
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 bg-gray-700 rounded-lg p-1">
                        <button
                            onClick={() => setZoom(Math.max(50, zoom - 10))}
                            className="p-1 hover:bg-gray-600 rounded text-gray-300"
                        >
                            <ZoomOut className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-gray-300 w-12 text-center">{zoom}%</span>
                        <button
                            onClick={() => setZoom(Math.min(200, zoom + 10))}
                            className="p-1 hover:bg-gray-600 rounded text-gray-300"
                        >
                            <ZoomIn className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-red-500/20 rounded-full text-red-400 hover:text-red-300 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Toolbar - Mobile Zoom & Pagination */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white disabled:opacity-30 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-gray-300 text-sm font-medium w-16 text-center">
                        {page} / {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white disabled:opacity-30 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Document Viewer (Mocked) */}
            <div className="flex-1 overflow-auto bg-gray-900 p-4 md:p-8 flex justify-center custom-scrollbar">

                {/* Mock PDF Page */}
                <div
                    className="bg-white shadow-2xl transition-all duration-200 transform origin-top w-full max-w-2xl"
                    style={{
                        height: '1000px', // Standard proportion
                        scale: `${zoom / 100}`
                    }}
                >
                    <div className="p-12 h-full flex flex-col">
                        <h1 className="text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-4">
                            Photosynthesis Overview
                        </h1>

                        <div className="space-y-6 text-gray-800 text-lg leading-relaxed flex-1">
                            {page === 1 ? (
                                <>
                                    <p>
                                        Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water.
                                    </p>
                                    <div className="w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 my-8">
                                        [ Diagram of a Leaf ]
                                    </div>
                                    <p>
                                        Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a byproduct.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-gray-400 italic text-center mt-20">
                                        [ Page {page} content placeholder ]
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="text-center text-sm text-gray-400 pt-8 border-t border-gray-200">
                            Page {page}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
