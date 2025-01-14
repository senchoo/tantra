import React from 'react';

const TelegramButton = () => {
  return (
    <a 
      href="https://t.me/@Sabik042" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="fixed bottom-6 left-6 bg-[#229ED9] hover:bg-[#1E8BC3] text-white p-3 rounded-full shadow-lg transition-colors z-40 flex items-center justify-center"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.18-2.935 5.33-4.82c.23-.21-.054-.328-.355-.117l-6.584 4.147-2.84-.89c-.617-.194-.628-.617.136-.913l11.054-4.27c.51-.194.955.118.795.913z"/>
      </svg>
    </a>
  );
};

export default TelegramButton;