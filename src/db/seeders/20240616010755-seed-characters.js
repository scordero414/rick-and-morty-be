require('dotenv').config();

const getCharacters = async () => {
  const response = await fetch(`${process.env.BASE_API_URL}/character`);

  console.log(response);

  const responseData = await response.json();
  console.log(responseData);

  return responseData.results
    .slice(0, 15)
    .map(
      ({ name, status, species, type, gender, origin, location, image }) => ({
        name,
        status,
        species,
        type,
        gender,
        origin: origin.name,
        location: location.name,
        image,
      })
    );
};

module.exports = {
  up: async (queryInterface) => {
    const charactersData = await getCharacters();
    await queryInterface.bulkInsert('characters', charactersData);

    const userId = await queryInterface.bulkInsert(
      'users',
      [{ username: 'root', createdAt: new Date(), updatedAt: new Date() }],
      { returning: true }
    );

    const charactersResult = await queryInterface.sequelize.query(
      'SELECT id FROM characters'
    );

    const charactersIds = charactersResult[0].map((record) => record.id); // Extract the IDs

    const userCharacterAssociations = charactersIds.map((characterId) => ({
      userId: userId,
      characterId: characterId,
      deletedAt: null,
      isFavorite: false,
      createdAt: new Date(),
    }));

    await queryInterface.bulkInsert(
      'user_characters',
      userCharacterAssociations
    );
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('characters', {}, {});
    await queryInterface.bulkDelete('users', {}, {});
    await queryInterface.bulkDelete('user_characters', {}, {});
  },
};
