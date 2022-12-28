import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Deck from "./models/Deck";
import { config } from "dotenv";

config();
const PORT = 5000;
const app = express();

app.use(cors());
// express pulls in ability to call JSON body in thunder client via EXPRESS MIDDLEWARE FUNCTION
app.use(express.json());

app.get("/decks", async (req: Request, res: Response) => {
  // call data from mongoDB custom decks
  const decks = await Deck.find();
  //return data back to user
  res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
  //takes req.body in thundercloud to give newDeck to pass whatever title is given
  const newDeck = new Deck({ title: req.body.title });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on PORT ${PORT}`);
  app.listen(PORT);
});
