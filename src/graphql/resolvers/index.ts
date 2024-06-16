import sequelize, { Op } from 'sequelize';
import { Character, User, UserCharacter, Comment } from '../../db/models';
import { Gender, Status } from '../../domain/types/characters';
import logExecutionTime from '../../decorators/log-excecution-time';

// export const resolvers = {
//   Query: {
//     commentsByUserCharacter: async ({
//       userCharacterId,
//     }: {
//       userCharacterId: number;
//     }) => {
//       return await Comment.findAll({ where: { userCharacterId } });
//     },
//     charactersByUser: async ({
//       userId,
//       ...args
//     }: {
//       userId: number;
//       status?: Status;
//       species?: string;
//       gender?: Gender;
//       name?: string;
//     }) => {
//       try {
//         const userWithCharactersAndComments = await UserCharacter.findAll({
//           where: { userId },
//           include: [
//             {
//               model: Character,
//               as: 'character',
//               where: {
//                 ...(args.status && { status: args.status }),
//                 ...(args.species && { species: args.species }),
//                 ...(args.name && {
//                   [Op.and]: [
//                     sequelize.where(
//                       sequelize.fn('lower', sequelize.col('name')),
//                       'LIKE',
//                       '%' + args.name.toLowerCase() + '%'
//                     ),
//                     sequelize.where(
//                       sequelize.fn('upper', sequelize.col('name')),
//                       'LIKE',
//                       '%' + args.name.toUpperCase() + '%'
//                     ),
//                   ],
//                 }),
//                 ...(args.gender && { gender: args.gender }),
//               },
//             },
//           ],
//         });

//         return userWithCharactersAndComments;
//       } catch (err) {
//         console.error(err);
//         throw err;
//       }
//     },
//   },

//   Mutation: {
//     createUser: async ({ username }: { username: string }) => {
//       const user = await User.create({ username });
//       return user;
//     },
//     addComment: async (
//       _: any,
//       { userCharacterId, commentText, timestamp }: any
//     ) => {
//       const comment = await Comment.create({
//         userCharacterId,
//         commentText,
//         timestamp,
//       });
//       return comment;
//     },
//   },
// };

class Resolvers {
  @logExecutionTime()
  async commentsByUserCharacter({
    userCharacterId,
  }: {
    userCharacterId: number;
  }) {
    return await Comment.findAll({ where: { userCharacterId } });
  }

  @logExecutionTime()
  async charactersByUser({
    userId,
    ...args
  }: {
    userId: number;
    status?: Status;
    species?: string;
    gender?: Gender;
    name?: string;
  }) {
    try {
      const userWithCharactersAndComments = await UserCharacter.findAll({
        where: { userId },
        include: [
          {
            model: Character,
            as: 'character',
            where: {
              ...(args.status && { status: args.status }),
              ...(args.species && { species: args.species }),
              ...(args.name && {
                [Op.and]: [
                  sequelize.where(
                    sequelize.fn('lower', sequelize.col('name')),
                    'LIKE',
                    '%' + args.name.toLowerCase() + '%'
                  ),
                  sequelize.where(
                    sequelize.fn('upper', sequelize.col('name')),
                    'LIKE',
                    '%' + args.name.toUpperCase() + '%'
                  ),
                ],
              }),
              ...(args.gender && { gender: args.gender }),
            },
          },
        ],
      });

      return userWithCharactersAndComments;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @logExecutionTime()
  async createUser({ username }: { username: string }) {
    const user = await User.create({ username });
    return user;
  }

  @logExecutionTime()
  async addComment({ userCharacterId, commentText, timestamp }: any) {
    const comment = await Comment.create({
      userCharacterId,
      commentText,
      timestamp,
    });
    return comment;
  }
}

// Usage
const resolvers = new Resolvers();

export default resolvers;
