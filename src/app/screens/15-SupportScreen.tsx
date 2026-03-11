import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle, HelpCircle } from 'lucide-react';
import { useT } from '../../context/LanguageContext';

export function SupportScreen() {
    const navigate = useNavigate();
    const { t } = useT();
    const [openItem, setOpenItem] = useState<number | null>(0);

    const faqs = [
        {
            question: t('faq1Q'),
            answer: t('faq1A')
        },
        {
            question: t('faq2Q'),
            answer: t('faq2A')
        },
        {
            question: t('faq3Q'),
            answer: t('faq3A')
        },
        {
            question: t('faq4Q'),
            answer: t('faq4A')
        }
    ];

    return (
        <div className="h-full bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{t('helpSupport')}</h1>
                    <p className="text-sm text-gray-600">{t('questionsAndHelp')}</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">

                {/* Contact Support Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg mb-8">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-bold mb-1">{t('needHelp')}</h2>
                            <p className="text-blue-100 text-sm mb-4 max-w-[200px]">
                                {t('hereToHelp')}
                            </p>
                            <button className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                {t('chatSupport')}
                            </button>
                        </div>
                        <HelpCircle className="w-16 h-16 text-white/20" />
                    </div>
                </div>

                {/* FAQs */}
                <h3 className="font-bold text-gray-900 mb-4 px-1">{t('frequentlyAskedQuestions')}</h3>
                <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenItem(openItem === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-4 text-left"
                            >
                                <span className="font-semibold text-gray-800">{faq.question}</span>
                                {openItem === idx ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                            {openItem === idx && (
                                <div className="px-4 pb-4 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                                    <div className="pt-3">{faq.answer}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center text-xs text-gray-400">
                    Version 1.0.0 (BETA)
                </div>
            </div>
        </div>
    );
}
