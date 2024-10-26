import React, { useState, useEffect } from 'react';

const SingleEliminationBracket = ({ participants }) => {
  // State to track rounds and matchups
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    generateBracket(participants);
  }, [participants]);

  // Function to initialize bracket rounds
  const generateBracket = (participantsList) => {
    let currentRound = participantsList.map(participant => ({ name: participant, winner: false }));
    const generatedRounds = [currentRound];

    // Generate subsequent rounds until one winner remains
    while (currentRound.length > 1) {
      currentRound = Array(Math.ceil(currentRound.length / 2)).fill(null).map((_, index) => {
        return { match: [currentRound[index * 2] || null, currentRound[index * 2 + 1] || null], winner: null };
      });
      generatedRounds.push(currentRound);
    }
    setRounds(generatedRounds);
  };

  // Function to select the winner of a match and update state
  const selectWinner = (roundIndex, matchIndex, winnerIndex) => {
    const updatedRounds = [...rounds];
    updatedRounds[roundIndex][matchIndex].winner = winnerIndex;
    setRounds(updatedRounds);
  };

  return (
    <div className="bracket-container">
      {rounds.map((round, roundIndex) => (
        <div key={roundIndex} className="bracket-round">
          {round.map((match, matchIndex) => (
            <div key={matchIndex} className="bracket-match">
              {match.match ? (
                <>
                  {match.match.map((team, teamIndex) => (
                    <div
                      key={teamIndex}
                      className={`bracket-team ${match.winner === teamIndex ? 'winner' : ''}`}
                      onClick={() => selectWinner(roundIndex, matchIndex, teamIndex)}
                    >
                      {team ? team.name : 'TBD'}
                    </div>
                  ))}
                </>
              ) : (
                <div className="bracket-team placeholder">Waiting</div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SingleEliminationBracket;

