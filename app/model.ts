import mongoose, { Schema, Document } from "mongoose";
import { TRank } from "./types";

const RankSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    name: String,
    time_spent: Number,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<TRank & Document>("Rank", RankSchema);
