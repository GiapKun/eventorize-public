'use client';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import both heart icons

const LikeButton: React.FC = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="like">
      {liked ? (
        <FaHeart
          onClick={toggleLike}
          style={{ color: 'red', cursor: 'pointer', fontSize: '24px' }} 
        />
      ) : (
        <FaRegHeart
          onClick={toggleLike}
          style={{ color: 'gray', cursor: 'pointer', fontSize: '24px' }} 
        />
      )}
    </div>
  );
};

export default LikeButton;
