export const HeroVideo = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <video autoPlay loop muted className="w-full h-full object-cover">
                <source src="/path/to/your/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}