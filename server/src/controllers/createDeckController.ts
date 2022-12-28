import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createDeckController(req: Request, res: Response) {
  {
    //takes req.body in thundercloud to give newDeck to pass whatever title is given
    const newDeck = new Deck({ title: req.body.title });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
  }
}
