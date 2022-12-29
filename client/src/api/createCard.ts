import { API_URL } from "./config";
import { TypeDeck } from "./getDecks";

export async function createCard(
  deckId: string,
  text: string
): Promise<TypeDeck> {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
