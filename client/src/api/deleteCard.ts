import { API_URL } from "./config";
import { TypeDeck } from "./getDecks";

export async function deleteCard(
  deckId: string,
  index: number
): Promise<TypeDeck> {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
    method: "DELETE",
  });
  return response.json();
}
