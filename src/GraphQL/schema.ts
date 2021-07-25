import { buildSchema } from "graphql";

export default buildSchema(`
    type Product {
        _id: ID!
        title: String!
        price: String!
        description: String!
        imageUrl: String!
        userId: String!
        createdAt: String!
        updatedAt: String!
    }

    input ProductInputData {
        title: String!
        price: String!
        description: String!
        imageUrl: String!
        userId:String!
    }
  
    type RootQuery {
        hello: String
    } 
    
    type RootMutation {
      createProduct(productInput: ProductInputData): Product!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
`);
