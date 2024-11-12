import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

interface SocialLinks {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
}

interface OrganizerProps {
    name: string;
    img: string;
    description: string;
    socialLinks: SocialLinks;
}

const Organizer: React.FC<OrganizerProps> = ({name, img, description, socialLinks}) => {

    return (
        <div className="mt-5">
            <h3 className="text-2xl md:text-4xl font-bold">Organized by</h3>
            <div className="organizer items-start lg:items-center gap-4 p-4 border border-gray-200 bg-gray-100 rounded-lg mt-8">
            <div className="flex lg:flex-row">
                <Image
                    className="rounded-full bg-black"
                    src={img}
                    alt={name}
                    width={80}
                    height={80}
                    layout="fixed"
                    objectFit="cover"
                    unoptimized
                />
                <div className="organizer-name text-xl font-bold content-center ml-5">{name}</div>

            </div>
            <div className="organizer-info">
                <div className="organizer-description text-gray-600 mt-2">
                    {description}
                </div>
                <div className="social-links flex space-x-4 mt-4">
                    {socialLinks.facebook && (
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} className="text-blue-600" size="2x" />
                        </a>
                    )}
                    {socialLinks.twitter && (
                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} className="text-blue-400" size="2x" />
                        </a>
                    )}
                    {socialLinks.linkedin && (
                        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} className="text-blue-700" size="2x" />
                        </a>
                    )}
                    {socialLinks.instagram && (
                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className="text-pink-600" size="2x" />
                        </a>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Organizer;
