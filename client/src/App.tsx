import { useState, useEffect } from "react";
import "./App.css";

type TypeDeck = {
  title: string;
  _id: string;
};

function App() {
  const [title, setTitle] = useState<string>("");
  const [decks, setDecks] = useState<TypeDeck[]>([]);

  async function fetchDecks() {
    const response = await fetch("http://localhost:5000/decks");
    const data = await response.json();
    setDecks(data);
  }
  useEffect(() => {
    fetchDecks();
  }, [decks]);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTitle("");
  }
  return (
    <div className="App">
      <h1 className="">The Flippening</h1>
      <ul className="decks">
        {decks.map((deck) => (
          <li className="" key={deck._id}>
            <button className="">X</button>
            {deck.title}
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
  );
}

export default App;
