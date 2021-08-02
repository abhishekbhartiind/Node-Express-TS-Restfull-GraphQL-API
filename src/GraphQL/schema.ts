import { buildSchema } from "graphql";

export default buildSchema(`
    type testData {
        text: String!,
        views: Int!
    }
    type RootQuery {
        hello: testData!
    }
    schema {
        query: RootQuery
    }
`);
