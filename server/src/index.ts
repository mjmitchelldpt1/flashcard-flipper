import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";

const PORT = 5000;

const app = express();
// express pulls in ability to call JSON body in thunder client via EXPRESS MIDDLEWARE FUNCTION
app.use(express.json());

app.post("/decks", async (req: Request, res: Response) => {
  //takes req.body in thundercloud to give newDeck to pass whatever title is given
  console.log(req.body);
  const newDeck = new Deck({ title: req.body.title });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose
  .connect(
    "mongodb+srv://flashcardflipper:F3xghP6cb68HCxQP@cluster0.jryydw4.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`listening on PORT ${PORT}`);
    app.listen(PORT);
  });
