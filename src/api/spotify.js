import axios from 'axios';

const CLIENT_ID = 'TU_CLIENT_ID'; // Reemplaza con tu Client ID de Spotify
const CLIENT_SECRET = 'TU_CLIENT_SECRET'; // Reemplaza con tu Client Secret de Spotify
const BASE_URL = 'https://api.spotify.com/v1';

export const getAccessToken = async () => {
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
  return response.data.access_token;
};

export const searchSongs = async (query) => {
  const token = await getAccessToken();
  const response = await axios.get(`${BASE_URL}/search`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: query,
      type: 'track',
    },
  });
  return response.data.tracks.items;
};