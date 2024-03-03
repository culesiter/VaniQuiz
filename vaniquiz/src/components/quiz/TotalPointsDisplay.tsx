"use client";
import React from 'react';
import { useSelector } from 'react-redux';

const TotalPointsDisplay: React.FC = () => {
  // Access the total points state from the Redux store
  const totalPoints = useSelector((state: { points: { points: number } }) => state.points.points);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg p-4 mt-4">
      <h2 className="text-lg font-semibold leading-6 text-gray-900">Total Points</h2>
      <p className="mt-1 max-w-2xl text-sm text-gray-500">You have earned {totalPoints} points.</p>
    </div>
  );
};

export default TotalPointsDisplay;