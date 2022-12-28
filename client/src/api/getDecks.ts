import { API_URL } from "./config";

export type TypeDeck = {
  title: string;
  _id: string;
};
// couple the typedeck to the get request.  We are returning an array of decks
// we need to use the promise here because getDecks returns a promise
export async function getDecks(): Promise<TypeDeck[]> {
  const response = await fetch(`${API_URL}/decks`);
  return response.json();
}
