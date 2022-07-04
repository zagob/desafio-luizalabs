import { api } from "../services/axios";

export async function getCharactersAPI(
  orderByName: boolean,
  timestamp: number,
  generateHash: string
) {
  const result = await api.get(
    `/characters?orderBy=${
      orderByName ? "-name" : "name"
    }&ts=${timestamp}&apikey=${
      import.meta.env.VITE_PUBLIC_KEY
    }&hash=${generateHash}`
  );

  return result;
}

export async function getCharacterWithName(
  value: string,
  timestamp: number,
  generateHash: string
) {
  const result = await api.get(
    `/characters?name=${value}&ts=${timestamp}&apikey=${
      import.meta.env.VITE_PUBLIC_KEY
    }&hash=${generateHash}`
  );

  return result;
}

export async function getMoreCharacters(
  checkFilterOrderName: boolean,
  listPaginate: number,
  timestamp: number,
  generateHash: string
) {
  const result = await api.get(
    `/characters?orderBy=${
      checkFilterOrderName ? "-name" : "name"
    }&offset=${listPaginate}&ts=${timestamp}&apikey=${
      import.meta.env.VITE_PUBLIC_KEY
    }&hash=${generateHash}`
  );

  return result;
}

export async function getDetailCharacter(
  id: string | undefined,
  timestamp: number,
  generateHash: string
) {
  const result = await api.get(
    `/characters/${id}?ts=${timestamp}&apikey=${
      import.meta.env.VITE_PUBLIC_KEY
    }&hash=${generateHash}`
  );

  return result;
}

export async function getDetailCharacterOfComic(
  id: string | undefined,
  timestamp: number,
  generateHash: string
) {
  const result = await api.get(
    `/characters/${id}/comics?orderBy=-onsaleDate&limit=10&ts=${timestamp}&apikey=${
      import.meta.env.VITE_PUBLIC_KEY
    }&hash=${generateHash}`
  );

  return result;
}
