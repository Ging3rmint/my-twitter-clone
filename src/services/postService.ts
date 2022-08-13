import Service from "./Service";
import { ITweetPost } from "api/posts";

interface IPostService {
  posts: ITweetPost[];
}

class PostService extends Service<IPostService> {
  constructor() {
    super();

    this.context = {
      posts: [],
    };
  }

  setPost(posts: ITweetPost[]) {
    this.context.posts = posts;
  }
}

export const postService = new PostService();
