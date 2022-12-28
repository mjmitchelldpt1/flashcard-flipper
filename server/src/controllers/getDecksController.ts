import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function getDecksController(req: Request, res: Response) {
  {
    // call data from mongoDB custom decks
    const decks = await Deck.find();
    //return data back to user
    res.json(decks);
  }
}
