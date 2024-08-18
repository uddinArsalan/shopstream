"use client"
import React from 'react';
import { useApp } from '../context/AppProvider';

export default function Avatar() {
    const { userProfile } = useApp();
    let initialsName = '';
    if (userProfile?.name) {
      initialsName = userProfile.name.split(' ').map(str => str.charAt(0)).join('');
    }
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium text-gray-600">
        {initialsName}
      </div>
    );
  };