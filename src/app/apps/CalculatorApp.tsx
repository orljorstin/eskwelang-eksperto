import { useState } from 'react';
import { useT } from '../../context/LanguageContext';
import { X, Delete } from 'lucide-react';

interface CalculatorAppProps {
    onClose: () => void;
}

export function CalculatorApp({ onClose }: CalculatorAppProps) {
    const { t } = useT();
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');

    const handleNumber = (num: string) => {
        setDisplay(prev => prev === '0' ? num : prev + num);
    };

    const handleOperator = (op: string) => {
        if (display === 'Error') return;
        setEquation(prev => {
            // If already ends in operator, replace it
            if (/[+\-*/]$/.test(prev) && display === '0') {
                return prev.slice(0, -1) + op;
            }
            return prev + display + op;
        });
        setDisplay('0');
    };

    const calculate = () => {
        if (display === 'Error') return;
        try {
            // Safe eval using Function
            const result = new Function('return ' + equation + display)();
            // Format to max 8 decimal places to avoid long repeating decimals
            const formatted = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(8)).toString();
            setDisplay(formatted);
            setEquation('');
        } catch (e) {
            setDisplay('Error');
            setEquation('');
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setEquation('');
    };

    const handleDelete = () => {
        setDisplay(prev => {
            if (prev === 'Error' || prev.length === 1) return '0';
            return prev.slice(0, -1);
        });
    };

    const btnClass = "h-16 text-2xl font-semibold rounded-2xl active:scale-95 transition-all flex items-center justify-center";
    const numClass = `${btnClass} bg-gray-800 text-white hover:bg-gray-700`;
    const opClass = `${btnClass} bg-orange-500 text-white hover:bg-orange-600`;
    const actionClass = `${btnClass} bg-gray-600 text-white hover:bg-gray-500`;

    return (
        <div className="h-full w-full bg-gray-900 flex flex-col z-50 fixed inset-0">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                        🔢
                    </div>
                    <span className="text-white font-semibold">Calculator</span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* App Body */}
            <div className="flex-1 flex flex-col p-6 max-w-sm mx-auto w-full">

                {/* Display */}
                <div className="flex-1 flex flex-col justify-end items-end mb-6">
                    <div className="text-gray-400 text-xl min-h-[1.75rem] mb-1 font-mono tracking-wider">
                        {equation}
                    </div>
                    <div className={`text-white font-bold tracking-tighter w-full text-right ${display.length > 8 ? 'text-4xl' : 'text-6xl'} truncate`}>
                        {display}
                    </div>
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-4 gap-3">
                    {/* Row 1 */}
                    <button className={actionClass} onClick={handleClear}>AC</button>
                    <button className={actionClass} onClick={handleDelete}><Delete className="w-6 h-6" /></button>
                    <button className={actionClass} onClick={() => { }}></button>
                    <button className={opClass} onClick={() => handleOperator('/')}>÷</button>

                    {/* Row 2 */}
                    <button className={numClass} onClick={() => handleNumber('7')}>7</button>
                    <button className={numClass} onClick={() => handleNumber('8')}>8</button>
                    <button className={numClass} onClick={() => handleNumber('9')}>9</button>
                    <button className={opClass} onClick={() => handleOperator('*')}>×</button>

                    {/* Row 3 */}
                    <button className={numClass} onClick={() => handleNumber('4')}>4</button>
                    <button className={numClass} onClick={() => handleNumber('5')}>5</button>
                    <button className={numClass} onClick={() => handleNumber('6')}>6</button>
                    <button className={opClass} onClick={() => handleOperator('-')}>−</button>

                    {/* Row 4 */}
                    <button className={numClass} onClick={() => handleNumber('1')}>1</button>
                    <button className={numClass} onClick={() => handleNumber('2')}>2</button>
                    <button className={numClass} onClick={() => handleNumber('3')}>3</button>
                    <button className={opClass} onClick={() => handleOperator('+')}>+</button>

                    {/* Row 5 */}
                    <button className={`${numClass} col-span-2`} onClick={() => handleNumber('0')}>0</button>
                    <button className={numClass} onClick={() => {
                        if (!display.includes('.')) handleNumber('.');
                    }}>.</button>
                    <button className={opClass} onClick={calculate}>=</button>
                </div>
            </div>
        </div>
    );
}
