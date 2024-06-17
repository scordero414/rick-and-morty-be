import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Character {
    id: ID!
    name: String!
    status: Status!
    species: String!
    type: String
    gender: Gender!
    origin: String
    location: String
    image: String!
  }

  enum Status {
    Alive
    Dead
    Unknown
  }

  enum Gender {
    Female
    Male
    Genderless
    Unknown
  }

  type User {
    id: ID!
    username: String!
    createdAt: String!
    updatedAt: String!
  }

  type UserCharacter {
    id: ID!
    userId: Int!
    characterId: Int!
    isFavorite: Boolean
    deletedAt: String
    createdAt: String!
    character: Character # Relationship to Character
    comments: [Comment!] # UserCharacter has many Comments
  }

  type Comment {
    id: ID!
    userCharacterId: Int!
    commentText: String!
    timestamp: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    commentsByUserCharacter(userCharacterId: Int): [Comment!]!
    charactersByUser(userId: Int!, status: Status, species: String, gender: Gender, name: String): [UserCharacter!] 
  }

  type Mutation {
    createUser(username: String): User!
    addComment(
      userCharacterId: Int!
      commentText: String!
    ): Comment!

    changeCharacterFavorite(
      userCharacterId: Int!
      isFavorite: Boolean!
    ): Boolean!

    softDeleteUserCharacter(
      userCharacterId: Int!
    ): Boolean!
  }
`);

export default schema;
