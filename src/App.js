import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
import Die from "./components/Die";

function App() {
  const [newDice, setNewDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);
  const button = tenzies ? "New Game" : "Roll";
  const [count, setCount] = useState(0);
  const words = tenzies ? "Your rolls : " : "";

  const dices = newDice.map((dice) => (
    <Die
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      handleClick={() => flipIsHeld(dice.id)}
    />
  ));

  useEffect(() => {
    const allHeld = newDice.every((die) => die.isHeld);
    const firstValue = newDice[0].value;
    const allValue = newDice.every((die) => die.value === firstValue);
    if (allHeld && allValue) {
      setTenzies(true);
      alert(`You Won!!!
You rolled the Dice ${count} times
      `);
    }
  }, [newDice]);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const numbers = [];
    for (let i = 0; i < 10; i++) {
      numbers.push(generateNewDice());
    }
    return numbers;
  }
  function rollDice() {
    setCount((prevCount) => prevCount + 1);
    if (tenzies) {
      setNewDice(allNewDice());
      setTenzies(false);
      setCount(0);
    } else {
      return setNewDice((prevNewDice) =>
        prevNewDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
    }
  }

  function flipIsHeld(id) {
    setNewDice((prevNewDice) =>
      prevNewDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main className="Tenzie">
      {tenzies && <Confetti />}
      <p className="Tenzie__title">Tenzies</p>
      <p className="Tenzie__text">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <p className="Tenzie__text">
        <strong>{words}</strong>
        {count}
      </p>
      <div className="Tenzie__layout">{dices}</div>
      <div onClick={rollDice} className="Tenzie__button">
        <a className="Tenzie__link">{button}</a>
      </div>
    </main>
  );
}

export default App;
