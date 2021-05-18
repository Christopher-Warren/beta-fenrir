import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const StatsSchema = new mongoose.Schema({
  visits: {
    type: Number,
  },
  charactersCreated: {
    type: Number,
  },
  battlesWon: {
    type: Number,
  },
  bossesKilled: {
    type: Number,
  },
  deaths: {
    type: Number,
  },
  gameBeaten: {
    type: Number,
  },
});

export default mongoose.models.Stats || mongoose.model("Stats", StatsSchema);
