import React from 'react';

interface BlueScreenProps {
    error: string | object | null;
    onReset: () => void;
}

export const BlueScreen: React.FC<BlueScreenProps> = ({ error, onReset }) => {
    const errorMessage = typeof error === 'string' ? error : JSON.stringify(error, null, 2);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 m-0 font-mono text-white bg-blue-800">
            <div className="w-full max-w-4xl">
                <div className="mb-8">
                    <span className="inline-block px-2 mb-4 font-bold text-blue-800 bg-gray-300">
                        ERROR
                    </span>
                </div>

                <div className="mb-8">
                    <p className="text-xl">Error details:</p>
                    <pre className="p-4 mt-2 overflow-x-auto text-yellow-300 whitespace-pre-wrap bg-blue-900 border border-blue-700">
                        {errorMessage || "Unknown Error"}
                    </pre>
                </div>

                <div className="mt-12 text-center animate-pulse">
                    <button
                        onClick={onReset}
                        className="px-6 py-2 text-xl font-bold text-blue-800 transition-colors bg-white hover:bg-gray-200"
                    >
                        Press here to continue _
                    </button>
                </div>
            </div>
        </div>
    );
};
