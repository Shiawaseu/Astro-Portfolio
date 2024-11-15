import { getCurrentlyPlayingTrack } from '../../utils/spotify';
import fetch from "node-fetch"
import * as cheerio from "cheerio";


async function fetchSpotifyData(spotifyUrl) {
  if (!spotifyUrl) return null;
  try {
    const embedUrl = `https://open.spotify.com/embed${new URL(spotifyUrl).pathname}`;
    const embedResponse = await fetch(embedUrl);
    const embedBody = await embedResponse.text()
    const $ = cheerio.load(embedBody);

    const pageProps = $('#__NEXT_DATA__').html();
    if (!pageProps) {
      throw new Error('Failed to find pageProps!');
    }

    const pageJson = JSON.parse(pageProps);

    // New update to the embed page

    // For now resolutions are useless, but I'll keep the functionality if Spotify ever provides different resolutions.
    const entity = pageJson.props.pageProps.state.data.entity;
    const coverArt = entity.visualIdentity.image;

    let coverArtUrl = '';
    for (const art of coverArt) {
      if (art.maxWidth === 300 && art.maxHeight === 300) {
        coverArtUrl = art.url;
        break;
      }
    }

    if (!coverArtUrl && coverArt.length > 0) {
      coverArtUrl = coverArt[0].url;
    }

    if (!coverArtUrl) {
      throw new Error('Failed to find art url');
    }

    return coverArtUrl;
  } catch (error) {
    throw new Error(`Failed to fetch embed page ${error.message}`);
  }
}



export async function GET() {
    const featureEnabled = import.meta.env["SPOTIFY_ENABLED"];

    if (featureEnabled == "false") {
      return new Response(null, {
        status: 204
      });
    }

    const FetchResponse = await getCurrentlyPlayingTrack();
    if (FetchResponse && FetchResponse.error) {
      if (FetchResponse.error == "No track currently playing") {
        return new Response(null, {
          status: 204
        });
      }
      return new Response(JSON.stringify({ message: FetchResponse.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const trackData = FetchResponse.data;
    if (!trackData) {
      return new Response(JSON.stringify({ message: "Unknown error" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const artistName = trackData.item.artists[0].name;
    const trackName = trackData.item.name;
    const trackURL = trackData.item.external_urls.spotify;
    const startedTime = new Date(trackData.timestamp).toLocaleString();
    const songProgress = trackData.progress_ms

    const trackCover = await fetchSpotifyData(trackURL);
    const result = {
      refreshedToken: FetchResponse.refreshedToken,
      artistName,
      trackName,
      trackCover,
      startedTime,
      songProgress
    };
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }