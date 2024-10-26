import React from 'react';
import SingleEliminationBracket from './SingleEliminationBracket';

const BracketView = ({ participants }) => {
  return (
    <div className="bracket-view">
      <h2>Tournament Bracket</h2>
      <SingleEliminationBracket participants={participants} />
    </div>
  );
};

export default BracketView;

