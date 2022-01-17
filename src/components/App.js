import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import api from "../services/api";
import "../styles/App.scss";

function App() {
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState("");
  const [userLetter, setUserLetter] = useState([]);
  const [word, setWord] = useState("");
  const [rightLetters, setRightLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  useEffect(() => {
    api().then((response) => {
      setWord(response);
    });
  }, []);

  const letter = /[a-zA-Z]/;

  console.log(word);
  //no funciona
  const wordLetters = word.split("");
  console.log(wordLetters);

  const renderWord = () => {
    return wordLetters.map((letter, index) => {
      // if (letter.includes(userLetter)) {
      //   rightLetters.push(letter);
      //   setRightLetters(rightLetters);
      // }
      return (
        <li key={index} className="letter">
          {letter.includes(userLetter) ? userLetter : ""}
        </li>
      );
    });
  };
  // para revisar
  const renderErrorLetters = () => {
    return !wordLetters.map((letter, index) => {
      return (
        <li key={index} className="letter">
          {letter.includes(userLetter) ? "" : userLetter}
        </li>
      );
    });
  };

  const handleClickBtn = () => {
    setNumberOfErrors(numberOfErrors + 1);
    console.log(numberOfErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleOnChange = (event) => {
    setLastLetter(event.target.value);

    if (letter.test(event.target.value)) {
      userLetter.push(event.target.value);
      setUserLetter(userLetter);
    }
    console.log(userLetter);
  };

  return (
    <div className="page">
      <header>
        <h1 className="header__title">Juego del ahorcado</h1>
      </header>
      <main className="main">
        <section>
          <button onClick={handleClickBtn}>Incrementar</button>
          <div className="solution">
            <h2 className="title">Solución:</h2>
            <ul className="letters">{renderWord()}</ul>
          </div>
          <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters"> {renderErrorLetters()}</ul>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <label className="title" htmlFor="last-letter">
              Escribe una letra:
            </label>
            <input
              autoComplete="off"
              className="form__input"
              maxLength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              value={lastLetter}
              onChange={handleOnChange}
            />
          </form>
        </section>
        <section className={"dummy error-" + numberOfErrors}>
          <span className="error-13 eye"></span>
          <span className="error-12 eye"></span>
          <span className="error-11 line"></span>
          <span className="error-10 line"></span>
          <span className="error-9 line"></span>
          <span className="error-8 line"></span>
          <span className="error-7 line"></span>
          <span className="error-6 head"></span>
          <span className="error-5 line"></span>
          <span className="error-4 line"></span>
          <span className="error-3 line"></span>
          <span className="error-2 line"></span>
          <span className="error-1 line"></span>
        </section>
      </main>
    </div>
  );
}

export default App;
