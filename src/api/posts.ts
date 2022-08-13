import axios from "axios";

import { IUser } from "./auth";

export interface ITweetPost {
  id: string;
  message: string;
  tags: string[];
  user: IUser;
  imageUrl?: string;
  likes: string[];
  retweet: number;
  comments: number;
  created: Date;
}

export interface IMetaData {
  total: number;
  max: number;
  current: number;
}

export const getPosts = async () =>
  axios
    .get<{ result: ITweetPost[]; metadata: IMetaData }>(
      "./mockdata/mockTweetPost.json"
    )
    .then(({ data }) => data);
