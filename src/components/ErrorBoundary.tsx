import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: undefined });
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                    <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 text-center animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="text-red-500" size={40} />
                        </div>

                        <h1 className="text-2xl font-black text-slate-900 mb-2">Hoppla!</h1>
                        <p className="text-slate-500 font-medium mb-8">
                            Ein unerwarteter Fehler ist aufgetreten. Aber keine Sorge, wir sind gleich wieder für Sie da.
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-95 transition-all shadow-lg shadow-slate-900/10"
                            >
                                <RefreshCw size={20} />
                                Seite neu laden
                            </button>

                            <button
                                onClick={this.handleReset}
                                className="w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-200 active:scale-95 transition-all"
                            >
                                <Home size={20} />
                                Zur Startseite
                            </button>
                        </div>

                        {import.meta.env.DEV && this.state.error && (
                            <div className="mt-8 p-4 bg-slate-50 rounded-xl text-left overflow-auto max-h-32">
                                <p className="text-[10px] font-mono text-red-400 leading-tight">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
