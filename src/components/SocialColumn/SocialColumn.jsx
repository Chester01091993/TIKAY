import React from 'react';
import './SocialColumn.module.css';

const SocialColumn = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/tikay_cafeteria',
      icon: 'fab fa-instagram',
      color: '#E4405F'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/tikaycafeteria',
      icon: 'fab fa-facebook-f',
      color: '#1877F2'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@tikay_cafeteria',
      icon: 'fab fa-tiktok',
      color: '#000000'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@tikaycafeteria',
      icon: 'fab fa-youtube',
      color: '#FF0000'
    }
  ];

  return (
    <div className="socialColumn">
      {socialLinks.map((social, index) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="socialLink"
          style={{ '--social-color': social.color }}
          title={social.name}
        >
          <i className={social.icon}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialColumn; 