const fetch = require("node-fetch");
const { parseStringPromise } = require("xml2js");

async function getYoutubeTranscriptText(videoId, lang = "en") {
  const html = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    },
  }).then((res) => res.text());

  const apiKey = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];
  if (!apiKey) throw new Error("Could not find INNERTUBE_API_KEY");

  const playerData = await fetch(
    `https://www.youtube.com/youtubei/v1/player?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        context: {
          client: { clientName: "ANDROID", clientVersion: "20.10.38" },
        },
        videoId,
      }),
    }
  ).then((res) => res.json());

  const tracks =
    playerData?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
  if (!tracks) throw new Error("No captions found for this video");

  const track = tracks.find((t) => t.languageCode === lang) || tracks[0];
  if (!track) throw new Error(`No captions for language: ${lang}`);

  const xml = await fetch(track.baseUrl).then((res) => res.text());
  const parsed = await parseStringPromise(xml);

  const captionNodes =
    parsed?.transcript?.text || parsed?.timedtext?.body?.[0]?.p;
  if (!captionNodes) throw new Error("No caption text nodes found in XML");

  // Collect and join text
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

  return allText;
}

module.exports = getYoutubeTranscriptText;
