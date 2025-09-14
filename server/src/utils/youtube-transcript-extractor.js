const fetch = require("node-fetch");
const { parseStringPromise } = require("xml2js");

async function getYoutubeTranscriptText(videoId, lang = "en") {
  try {
    // Validate input
    if (!videoId || typeof videoId !== 'string') {
      throw new Error("Valid video ID is required");
    }

    // Clean video ID (remove any extra parameters)
    const cleanVideoId = videoId.replace(/[^a-zA-Z0-9_-]/g, '');
    if (cleanVideoId.length !== 11) {
      throw new Error("Invalid YouTube video ID format");
    }

    // Fetch video page to get API key
    const html = await fetch(`https://www.youtube.com/watch?v=${cleanVideoId}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      timeout: 10000
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch video page: ${res.status}`);
      }
      return res.text();
    });

    // Extract API key
    const apiKeyMatch = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/);
    if (!apiKeyMatch || !apiKeyMatch[1]) {
      throw new Error("Could not find YouTube API key");
    }
    const apiKey = apiKeyMatch[1];

    // Get player data
    const playerData = await fetch(
      `https://www.youtube.com/youtubei/v1/player?key=${apiKey}`,
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        },
        body: JSON.stringify({
          context: {
            client: { 
              clientName: "ANDROID", 
              clientVersion: "20.10.38" 
            },
          },
          videoId: cleanVideoId,
        }),
        timeout: 10000
      }
    ).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch player data: ${res.status}`);
      }
      return res.json();
    });

    // Get caption tracks
    const tracks = playerData?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
      throw new Error("No captions available for this video");
    }

    // Find preferred language track
    const track = tracks.find((t) => t.languageCode === lang) || tracks[0];
    if (!track || !track.baseUrl) {
      throw new Error(`No captions available for language: ${lang}`);
    }

    // Fetch transcript XML
    const xml = await fetch(track.baseUrl, {
      timeout: 10000
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch transcript: ${res.status}`);
      }
      return res.text();
    });

    // Parse XML
    const parsed = await parseStringPromise(xml);
    const captionNodes = parsed?.transcript?.text || parsed?.timedtext?.body?.[0]?.p;
    
    if (!captionNodes || !Array.isArray(captionNodes)) {
      throw new Error("No caption text found in transcript");
    }

    // Extract and clean text
    const allText = captionNodes
      .map((entry) => {
        if (entry._) return entry._; // direct text
        if (Array.isArray(entry.s)) {
          return entry.s.map((s) => (s._ ? s._ : "")).join(" ");
        }
        return "";
      })
      .filter(Boolean) // remove empty
      .join(" ") // join into one string
      .replace(/\s+/g, " ") // clean up extra spaces
      .trim();

    if (!allText || allText.length === 0) {
      throw new Error("No text content found in transcript");
    }

    return allText;
  } catch (error) {
    console.error("YouTube transcript extraction error:", error.message);
    throw new Error(`Failed to extract YouTube transcript: ${error.message}`);
  }
}

module.exports = getYoutubeTranscriptText;
