export default function SkeletonCard() {
    return (
        <div className="card animate-pulse">
            <div className="w-full h-48 bg-gray-100" />
            <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-100 rounded" />
                <div className="h-3 w-2/3 bg-gray-100 rounded" />
                <div className="flex gap-2">
                    <div className="h-5 w-14 bg-gray-100 rounded-full" />
                    <div className="h-5 w-10 bg-gray-100 rounded-full" />
                </div>
            </div>
        </div>
    );
}
