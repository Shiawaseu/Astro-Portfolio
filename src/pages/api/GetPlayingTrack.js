import { getCurrentlyPlayingTrack } from '../../utils/spotify';

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
    const trackItem = trackData.item
    const artist = trackItem.artists[0] // Main artist only

    const artistName = artist.name;
    const trackName = trackItem.name;

    const trackURL = trackItem.external_urls.spotify || null;
    const artistURL = artist.external_urls.spotify || null;
    const trackCover = (trackItem.album.images[0] ? trackItem.album.images[0].url : null);
    
    // const startedTime = new Date(trackData.timestamp).toLocaleString();
    const songProgress = trackData.progress_ms

    const result = {
      refreshedToken: FetchResponse.refreshedToken,
      artistName,
      artistURL,
      trackName,
      trackURL,
      trackCover,
      songProgress, // I will hopefully add some functionality for this
    };
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
