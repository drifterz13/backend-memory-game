import RankModel from "./model";
import { TRank } from "./types";

export async function getRanks(): Promise<TRank[]> {
  return RankModel.find();
}

export async function postRank(params: {
  name: string;
  time_spent: number;
}): Promise<TRank> {
  return RankModel.create({ name: params.name, time_spent: params.time_spent });
}
