import axios from 'axios';

const CLIENT_ID = '30e57165574d4388860532e27daa550e'; // Reemplaza con tu Client ID de Spotify
const CLIENT_SECRET = 'b4cc481c0da34c1ea906eca7f9350204'; // Reemplaza con tu Client Secret de Spotify
const BASE_URL = 'https://api.spotify.com/v1';

let cachedToken = null;
let tokenExpirationTime = null;

export const getAccessToken = async () => {
  const currentTime = Date.now();

  // Reutilizar el token si aún es válido
  if (cachedToken && tokenExpirationTime && currentTime < tokenExpirationTime) {
    console.log('Usando token en caché:', cachedToken);
    return cachedToken;
  }

  try {
    console.log('Solicitando token de acceso...');
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
      }
    );

    cachedToken = response.data.access_token;
    tokenExpirationTime = currentTime + response.data.expires_in * 1000; // Guardar tiempo de expiración
    console.log('Token de acceso obtenido:', cachedToken);
    return cachedToken;
  } catch (error) {
    console.error('Error al obtener el token de acceso:', error.response?.data || error.message);
    throw new Error('No se pudo obtener el token de acceso. Verifica tus credenciales.');
  }
};

export const searchSongs = async (query) => {
  try {
    const tokensearch = await getAccessToken();
    console.log('Buscando canciones con el token:', tokensearch);
    const response = await axios.get(`${BASE_URL}/search`, {
      headers: {
        Authorization: `Bearer ${tokensearch}`,
      },
      params: {
        q: query,
        type: 'track',
      },
    });
    console.log('Resultados de búsqueda:', response.data.tracks.items);
    return response.data.tracks.items;
  } catch (error) {
    console.error('Error al buscar canciones:', error.response?.data || error.message);
    throw new Error('No se pudieron buscar canciones. Verifica tu conexión o el token.');
  }
};
export const fetchFeaturedPlaylists = async (playlist) => {
  try {
    const tokenplay = await getAccessToken();
    console.log('Usando token para obtener playlists destacadas:', tokenplay);

    const response = await axios.get(`${BASE_URL}/browse/featured-playlists`, {
      headers: {
        Authorization: `Bearer ${tokenplay}`,
      },
    });

    console.log('Respuesta completa de la API:', response.data);

    if (response.data && response.data.playlists) {
      console.log('Playlists destacadas obtenidas:', response.data.playlists.items);
      return response.data.playlists.items;
    } else {
      console.error('No se encontraron playlists en la respuesta:', response.data);
      throw new Error('No se encontraron playlists destacadas.');
    }
  } catch (error) {
    if (error.response?.status === 404) {
      console.error('Error 404: El endpoint no fue encontrado. Verifica la URL o la disponibilidad regional.');
    } else if (error.response?.status === 401) {
      console.error('Error 401: Token inválido o expirado. Verifica el token.');
    } else {
      console.error('Error al obtener playlists destacadas:', error.response?.data || error.message);
    }
    throw new Error('No se pudieron obtener las playlists destacadas.');
  }
};
export const fetchNewReleases = async () => {
  try {
    const tokennew = await getAccessToken();
    console.log('Usando token para obtener nuevos lanzamientos:', tokennew);

    const response = await axios.get(`${BASE_URL}/browse/new-releases`, {
      headers: {
        Authorization: `Bearer ${tokennew}`,
      },
    });

    console.log('Nuevos lanzamientos obtenidos:', response.data.albums.items);
    return response.data.albums.items;
  } catch (error) {
    console.error('Error al obtener nuevos lanzamientos:', error.response?.data || error.message);
    throw new Error('No se pudieron obtener los nuevos lanzamientos.');
  }
};