import { Character, User, UserCharacter, Comment } from '../../db/models';

export const resolvers = {
  Query: {
    commentsByUserCharacter: async ({
      userCharacterId,
    }: {
      userCharacterId: number;
    }) => {
      return await Comment.findAll({ where: { userCharacterId } });
    },
    charactersByUser: async ({ userId }: { userId: number }) => {
      try {
        const userWithCharactersAndComments = await UserCharacter.findAll({
          where: { userId },
          include: [
            {
              model: Character,
              as: 'character',
            },
          ],
        });

        return userWithCharactersAndComments;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },

  Mutation: {
    createUser: async ({ username }: { username: string }) => {
      const user = await User.create({ username });
      return user;
    },
    addComment: async (
      _: any,
      { userCharacterId, commentText, timestamp }: any
    ) => {
      const comment = await Comment.create({
        userCharacterId,
        commentText,
        timestamp,
      });
      return comment;
    },
  },
};
