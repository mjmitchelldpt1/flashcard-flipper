import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Deck from "./models/Deck";
import { config } from "dotenv";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardController } from "./controllers/createCardController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardController } from "./controllers/deleteCardController";

config();
const PORT = 5000;
const app = express();

app.use(cors());
// express pulls in ability to call JSON body in thunder client via EXPRESS MIDDLEWARE FUNCTION
app.use(express.json());
//moved logic to a controller to clean up the code.  Built here first then transitioned over.
//each takes a controller function but the argument is passed in the CONTROLLER, and just exported here without controller(argument)
app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardController);
app.delete("/decks/:deckId/cards/:index", deleteCardController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on PORT ${PORT}`);
  app.listen(PORT);
});
