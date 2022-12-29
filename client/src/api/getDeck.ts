import { API_URL } from "./config";
import { TypeDeck } from "./getDecks";

export async function getDeck(deckId: string): Promise<TypeDeck> {
  const response = await fetch(`${API_URL}/decks/${deckId}`);
  return response.json();
}
