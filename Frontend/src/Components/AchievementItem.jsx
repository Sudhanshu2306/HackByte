import React from 'react';

const AchievementItem = ({ achievement }) => {
  const { name, description, current, target, iconType } = achievement;
  const progress = (current / target) * 100;
  
  const getIconContent = (type) => {
    switch(type) {
      case 'explorer':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.25-3.25a1 1 0 112 0 1 1 0 01-2 0zm0-9.5a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
          </svg>
        );
      case 'mentor':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        );
      case 'expert':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  const getIconBackground = (type) => {
    switch(type) {
      case 'explorer': return 'bg-blue-100';
      case 'mentor': return 'bg-green-100';
      case 'expert': return 'bg-orange-100';
      default: return 'bg-gray-100';
    }
  };
  
  const getProgressColor = (type) => {
    switch(type) {
      case 'explorer': return 'bg-[#F4BE4F]'; // gold
      case 'mentor': return 'bg-[#5BBE88]'; // green
      case 'expert': return 'bg-[#FF7A59]'; // orange
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="mb-4 p-3 border border-gray-100 rounded-lg">
      <div className="flex">
        <div className={`w-12 h-12 rounded-lg ${getIconBackground(iconType)} mr-3 flex items-center justify-center`}>
          {getIconContent(iconType)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
            <div className="text-xs text-gray-500">{current}/{target}</div>
          </div>
          <div className="h-[6px] rounded-[3px] bg-[#eeeeee]">
            <div 
              className={`h-[6px] rounded-[3px] ${getProgressColor(iconType)}`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementItem;