"use client";

import React, { useEffect, useState } from "react";
import Layout from "./layout";
import { Button } from "@/components/_ui/atoms/buttons";

export default function Latihan2() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [clickSpeed, setClickSpeed] = useState(0);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
  }, [timeLeft, gameActive]);

  const startGame = () => {
    setCount(0);
    setTimeLeft(10);
    setGameActive(true);
    setClickSpeed(0);
  };

  const endGame = () => {
    setGameActive(false);
    if (count > highScore) {
      setHighScore(count);
    }
    setClickSpeed((count / 10).toFixed(2));
  };

  const handleClick = () => {
    if (gameActive) {
      setCount(count + 1);
    }
  };

  return (
    <Layout>
      <div className="text-center">
        <h2 className="mb-4">⚡ Speed Clicker Challenge</h2>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <h5>Clicks</h5>
                <h1>{count}</h1>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-danger text-white">
              <div className="card-body">
                <h5>Time Left</h5>
                <h1>{timeLeft}s</h1>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white">
              <div className="card-body">
                <h5>High Score</h5>
                <h1>{highScore}</h1>
              </div>
            </div>
          </div>
        </div>

        {!gameActive ? (
          <div>
            <Button
              type="button"
              className="btn-success btn-lg mb-3"
              onClick={startGame}
              style={{ width: "300px", height: "100px", fontSize: "2rem" }}
            >
              🚀 START GAME
            </Button>
            {clickSpeed > 0 && (
              <div className="alert alert-info">
                Your speed: {clickSpeed} clicks/second
              </div>
            )}
          </div>
        ) : (
          <Button
            type="button"
            className="btn-primary btn-lg"
            onClick={handleClick}
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              fontSize: "4rem",
              animation: "pulse 0.5s infinite",
            }}
          >
            CLICK!<br />
            💥
          </Button>
        )}

        <style jsx>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>
      </div>
    </Layout>
  );
}
