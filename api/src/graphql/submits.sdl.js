export const schema = gql`
  type Submit {
    id: Int!
    title: String!
    body: String!
    createdAt: DateTime!
  }

  type Query {
    submits: [Submit!]!
    submit(id: Int!): Submit
  }

  input CreateSubmitInput {
    title: String!
    body: String!
  }

  input UpdateSubmitInput {
    title: String
    body: String
  }

  type Mutation {
    createSubmit(input: CreateSubmitInput!): Submit!
    updateSubmit(id: Int!, input: UpdateSubmitInput!): Submit!
    deleteSubmit(id: Int!): Submit!
  }
`
