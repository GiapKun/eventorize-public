"use client";
import { FaShareAlt } from "react-icons/fa";

const ShareButton: React.FC = () => {
    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "Event Title",
                    text: "Check out this awesome event!",
                    url: window.location.href
                })
                .then(() => console.log("Successfully shared"))
                .catch((error) => console.log("Error sharing", error));
        } else {
            alert("Sharing not supported in this browser");
        }
    };

    return (
        <button
            className="flex items-center gap-2 px-4 py-2 border rounded-lg border-[#388E3C] bg-gray-100 hover:bg-[#388E3C] text-[#388E3C] hover:text-white transition-colors"
            onClick={handleShare}
        >
            <FaShareAlt />
            <span>Share</span>
        </button>
    );
};

export default ShareButton;
