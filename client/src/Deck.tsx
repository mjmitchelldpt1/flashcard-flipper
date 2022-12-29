import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createCard } from "./api/createCard";
import { deleteCard } from "./api/deleteCard";
import { getDeck } from "./api/getDeck";
import { TypeDeck } from "./api/getDecks";
import "./Deck.css";
const Deck = () => {
  const [deck, setDeck] = useState<TypeDeck | undefined>();
  const [text, setText] = useState<string>("");
  const [cards, setCards] = useState<string[]>([]);
  // useparams allow us to grab deckID from the react router dom rather than trying to prop drill
  const { deckId } = useParams();

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDeck();
  }, [deckId]);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    // we use this naming convention to prevent server collisiion
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
  }

  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  }

  return (
    <div className="Deck">
      <h1>{deck?.title}</h1>
      <ul className="cards">
        {cards.map((card, index) => (
          <li className="cards" key={index}>
            <button onClick={() => handleDeleteCard(index)}>X</button>
            {card}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="card-title">Card Text</label>
        <input
          id="card-title"
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />
        <button className="">Create Card</button>
      </form>
    </div>
  );
};

export default Deck;
