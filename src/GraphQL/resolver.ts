import Post from "../models/noSql/post";

const resolve = {
  createPost: async (args: any, req: any) => {
    const { title, content, creator, postTo } = args.postInput;

    // const existingPost = await Post.findOne({ _id: postTo });

    // if (existingPost) {
    //   const error = new Error("Already Post ");
    //   throw error;
    // }

    const post = new Post({
      title,
      content,
      creator,
      postTo,
    });

    const createdPost = await post.save();

    return { ...createdPost, _id: createdPost.id.toString() };
  },
  posts: async (args: any, req: any) => {
    let page = args.page;
    if (!page) {
      page = 1;
    }
    const perPage = 5;
    const totalPosts = await Post.find().countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate("creator");
    return {
      posts: posts.map((p: any) => {
        return {
          _id: p._id.toString(),
          title: p.title.toString(),
          content: p.content.toString(),
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        };
      }),
      totalPosts: totalPosts,
    };
  },
};

export default resolve;
