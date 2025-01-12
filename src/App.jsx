import React, { useState, useEffect } from "react";

import rock from "./assets/rock-emoji.png";
import paper from "./assets/paper-emoji.png";
import scissors from "./assets/scissors-emoji.png";

const App = () => {
  const [score, setScore] = useState(() => {
    const storedScore = JSON.parse(localStorage.getItem("score"));
    return storedScore || { wins: 0, losses: 0, ties: 0 };
  });
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [result, setResult] = useState("");
  const [resultDetail, setResultDetail] = useState("");
  const [moves, setMoves] = useState({ playerMove: "", computerMove: "" });

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
  }, [score]);

  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1500);
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying]);

  const playGame = (playerMove) => {
    const computerMove = pickComputerMove();
    let gameResult = "";
    let detail = "";

    if (playerMove === "scissors") {
      if (computerMove === "rock") {
        gameResult = "You lose.";
        detail = "Rock beats scissors";
      } else if (computerMove === "paper") {
        gameResult = "You win.";
        detail = "Scissors beats Paper";
      } else {
        gameResult = "Tie.";
      }
    } else if (playerMove === "paper") {
      if (computerMove === "rock") {
        gameResult = "You win.";
        detail = "Paper beats Rock";
      } else if (computerMove === "paper") {
        gameResult = "Tie.";
      } else {
        gameResult = "You lose.";
        detail = "Scissors beats Paper";
      }
    } else if (playerMove === "rock") {
      if (computerMove === "rock") {
        gameResult = "Tie.";
      } else if (computerMove === "paper") {
        gameResult = "You lose.";
        detail = "Paper beats Rock";
      } else {
        gameResult = "You win.";
        detail = "Rock beats Scissors";
      }
    }

    setScore((prevScore) => {
      const updatedScore = { ...prevScore };
      if (gameResult === "You win.") {
        updatedScore.wins += 1;
      } else if (gameResult === "You lose.") {
        updatedScore.losses += 1;
      } else if (gameResult === "Tie.") {
        updatedScore.ties += 1;
      }
      return updatedScore;
    });

    setResult(gameResult);
    setResultDetail(detail);
    setMoves({ playerMove, computerMove });
  };

  const pickComputerMove = () => {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) return "rock";
    if (randomNumber < 2 / 3) return "paper";
    return "scissors";
  };

  const resetScore = () => {
    setScore({ wins: 0, losses: 0, ties: 0 });
    localStorage.removeItem("score");
  };

  return (
    <div className="main">
      <h1>Rock Paper Scissors</h1>

      <p className="score">
        Wins: <span className="wins">{score.wins}</span>, Losses:{" "}
        <span className="losses">{score.losses}</span>, Ties:{" "}
        <span className="ties">{score.ties}</span>
      </p>

      {result && (
        <p>
          <span className="user">You</span> <sub>[{moves.playerMove}]</sub>
          <img
            src={`/${moves.playerMove}-emoji.png`}
            alt={moves.playerMove}
            width="40"
            height="40"
          />
          <img
            src={`/${moves.computerMove}-emoji.png`}
            alt={moves.computerMove}
            width="40"
            height="40"
          />{" "}
          <sub>[{moves.computerMove}]</sub>{" "}
          <span className="computer">Computer</span>
        </p>
      )}

      <p className="result">{result}</p>
      <p>{resultDetail}</p>

      <div className="game-button">
        <button className="move-button" onClick={() => playGame("rock")}>
          <img src={rock} className="move-icon" />
        </button>
        <button className="move-button" onClick={() => playGame("paper")}>
          <img src={paper} className="move-icon" />
        </button>
        <button className="move-button" onClick={() => playGame("scissors")}>
          <img src={scissors} className="move-icon" />
        </button>
      </div>
      <p>Pick a move</p>
      <div className="button-reset-container">
        <button
          className="auto-play-button"
          onClick={() => setIsAutoPlaying((prev) => !prev)}
        >
          {isAutoPlaying ? "Stop Auto Play" : "Start Auto Play"}
        </button>
        <button className="reset-score-button" onClick={resetScore}>
          Reset Score
        </button>
      </div>
    </div>
  );
};

export default App;
