import { buildSchema } from "graphql";

export default buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        creator: String!
        postTo: String!
        createdAt: String!
        updatedAt: String!
    }

    input postInputData {
        title: String!
        content: String!
        creator: String!
        postTo: String!
    }
   
    type PostData {
        posts: [Post!]!
        totalPosts: Int!
    }

    type rootMutation {
      createPost(postInput: postInputData): Post! 
      updatePost(id: ID!, postInput: postInputData): Post!
      deletePost(id: ID!): Boolean 
    }

    type RootQuery {
        posts(page: Int): PostData!
        post(id: ID!): Post!
    }

    schema {
       query: RootQuery
       mutation: rootMutation
    }
`);
