import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
  title: String,
  //cards should be a mongoose model array
  cards: [String],
});

const DeckModel = mongoose.model("Deck", DeckSchema);

export default DeckModel;
