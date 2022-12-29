import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createCardController(req: Request, res: Response) {
  {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    //when people create a new card it's going to be on the deck body
    if (!deck) return res.status(400).send("No deck of this ID exists");
    const { text } = req.body;
    deck.cards.push(text);
    await deck.save();
    res.json(deck);
  }
}
