// import { Character } from '../../domain/types/characters';

export const getCharacters = async () => {
  const response = await fetch(`${process.env.BASE_API_URL}}/character`);

  const responseData = await response.json();

  return responseData.results;
};

export class CharactersApi {}
