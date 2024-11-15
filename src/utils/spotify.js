import fetch from 'node-fetch';
import querystring from 'querystring';
import redis from './redis';

const CLIENT_ID = import.meta.env["SPOTIFY_CLIENT_ID"];
const CLIENT_SECRET = import.meta.env["SPOTIFY_CLIENT_SECRET"];
const REDIRECT_URI = import.meta.env["SPOTIFY_REDIRECT_URI"];


const fetchTokens = async (code) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
  
  const data = await response.json();
  
  if (response.ok) {
    await redis.set('access_token', data.access_token);
    await redis.set('refresh_token', data.refresh_token);
    await redis.expire('access_token', data.expires_in); // Set expiry
  } else {
    return {error: "Failed to fetch access token"}
  }
};

const refreshAccessToken = async (refreshToken) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    await redis.set('access_token', data.access_token);
    await redis.expire('access_token', data.expires_in); // Set expiry
  } else {
    return {error: "Failed to refresh access token"}
  }
};


export const getCurrentlyPlayingTrack = async () => {
  let refreshed = false;

  const accessToken = await redis.get('access_token');
  const refreshToken = await redis.get('refresh_token');
  // Check
  if (!accessToken) {
    await refreshAccessToken(refreshToken);
    refreshed = true
  }
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return { error: 'No track currently playing' };
  }

  const data = await response.json();
  if (response.ok) {
    return {refreshedToken: refreshed, data: data};
  } else {
    return {refreshedToken: refreshed, error: "Failed to retreive playing songs (Are you logged in?)"};
  }
};

export const getAuthUrl = () => {
  return `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user-read-currently-playing`;
};

export const handleAuthRedirect = async (code) => {
  await fetchTokens(code);
  return { success: true, message: "You've set up the Spotify, you don't need to do this again." };
};
