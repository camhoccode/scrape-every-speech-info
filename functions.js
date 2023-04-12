const axios = require("axios");
const cheerio = require("cheerio");
// const request = require("request-promise");

async function getAudioLinkDown(url) {
  const allInfo = [];
  const res = await axios.get(url);
  const html = await res.data;
  const $ = await cheerio.load(html);

  // find the link MP3
  const rawResult = await $(
    "#maincontent > div > input.js-play8-playlist",
  ).attr("value");
  const sourcesArray = await JSON.parse(rawResult)[0].sources;
  const sources = await sourcesArray[0].file;
  const linkMP3 = await ("https://archive.org" + sources);

  // add the topics to an array
  const topics = [];
  await $("div.row.metadata-list > dl:nth-child(3) > dd > a").each((i, e) =>
    topics.push($(e).text()),
  );

  // add the title
  const title = await $("h1.item-title > span").text();

  // insert into the array
  await allInfo.push({
    title: title,
    keyword: topics,
    linkMP3: linkMP3,
  });
  return allInfo;
}

// export the function
module.exports = {
  getAudioLinkDown,
};

// getAudioLinkDown("https://archive.org/details/AmbientSoundbathPodcast");
