import React from "react";
import {
  FaceBook,
  Twitter,
  Instagram,
  TikTok,
  YouTube,
  WhatsApp,
} from "../../utils/Icons";

const SocialMedia = () => {
  const icons = [
    {
      id: 1,
      to: "https://facebook.com",
      icon: FaceBook,
      label: "Facebook",
    },
    {
      id: 2,
      to: "https://twitter.com",
      icon: Twitter,
      label: "Twitter",
    },
    {
      id: 3,
      to: "https://instagram.com",
      icon: Instagram,
      label: "Instagram",
    },
    {
      id: 4,
      to: "https://tiktok.com",
      icon: TikTok,
      label: "TikTok",
    },
    {
      id: 5,
      to: "https://youtube.com",
      icon: YouTube,
      label: "YouTube",
    },
    {
      id: 6,
      to: "https://whatsapp.com",
      icon: WhatsApp,
      label: "WhatsApp",
    },
  ];

  return (
    <div className="flex items-center justify-center my-2">
      <div className="flex space-x-4">
        {icons.map((item) => (
          <a
            key={item.id}
            href={item.to}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-secondary-color transition-colors duration-300"
            aria-label={item.label}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
