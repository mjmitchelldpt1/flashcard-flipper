import { useState, useEffect } from "react";
import { BrowserRouter, Link, Router, Routes } from "react-router-dom";
import { createDeck } from "./api/createDeck";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks } from "./api/getDecks";
import "./App.css";
import { TypeDeck } from "./api/getDecks";

function App() {
  const [title, setTitle] = useState<string>("");
  const [decks, setDecks] = useState<TypeDeck[]>([]);

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const data = await createDeck(title);
    setTitle("");
    setDecks([...decks, data]);
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  return (
    <div className="container">
      <div className="App">
        <h1 className="">The Flippening</h1>
        <ul className="decks">
          {decks.map((deck) => (
            <li className="" key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
              {deck.title}
              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </li>
          ))}
        </ul>
        <form className="" onSubmit={handleCreateDeck}>
          <label htmlFor="deck-title">Deck Title</label>
          <input
            id="deck-title"
            type="text"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <button className="">Create Deck</button>
        </form>
      </div>
    </div>
  );
}

export default App;
