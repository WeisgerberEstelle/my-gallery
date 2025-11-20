interface Props {
    message: string;
    onRetry?: () => void;
}

export default function ErrorBanner({ message, onRetry }: Props) {
    return (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center justify-between">
            <span>{message}</span>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-3 py-1 rounded-lg border border-red-200 hover:bg-red-100"
                >
                    Retry
                </button>
            )}
        </div>
    );
}
