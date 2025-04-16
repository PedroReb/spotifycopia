import axios from 'axios';

const CLIENT_ID = '30e57165574d4388860532e27daa550e'; // Reemplaza con tu Client ID de Spotify
const CLIENT_SECRET = 'b4cc481c0da34c1ea906eca7f9350204'; // Reemplaza con tu Client Secret de Spotify
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