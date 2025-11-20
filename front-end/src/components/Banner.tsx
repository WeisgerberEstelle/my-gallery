interface BannerProps {
    image: string;
    height?: string;
    overlayOpacity?: string;
    title?: string;
    children?: React.ReactNode;
}

export default function Banner({
    image,
    height = "h-48 md:h-64",
    overlayOpacity = "bg-black/20",
    title,
    children,
}: BannerProps) {
    return (
        <div className={`relative w-full ${height} mb-10`}>
            <img src={image} alt="banner" className="absolute inset-0 w-full h-full object-cover" />

            <div className={`absolute inset-0 ${overlayOpacity}`} />

            {(title || children) && (
                <div className="relative z-10 flex items-center justify-center h-full">
                    {children ? (
                        children
                    ) : (
                        <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
                            {title}
                        </h1>
                    )}
                </div>
            )}
        </div>
    );
}
