import React from 'react';
import './WhatsAppButton.css';

const WHATSAPP_NUMBER = '923181292628';
const DEFAULT_MESSAGE = 'Hi AdsGeniusLab, I would like to know more about your services.';

interface WhatsAppButtonProps {
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ message = DEFAULT_MESSAGE }) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-floating-btn"
      title="Contact us on WhatsApp"
      aria-label="Contact us on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppButton;
