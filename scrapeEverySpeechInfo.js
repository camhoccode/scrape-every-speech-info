const axios = require("axios");
const cheerio = require("cheerio");
const functions = require("./functions");
const fs = require("fs");
const colors = require("colors");

// const request = ("request-promise");

let allSpeechLinks = [];

// const url =
//   "https://archive.org/details/audio?query=podcast+meditation&and%5B%5D=collection%3A%22podcasts%22&and%5B%5D=languageSorter%3A%22English%22&and%5B%5D=mediatype%3A%22audio%22&and%5B%5D=subject%3A%22meditation%22&and%5B%5D=subject%3A%22spirituality%22&and%5B%5D=subject%3A%22sermon%22&and%5B%5D=subject%3A%22unitarian+universalist%22&and%5B%5D=subject%3A%22spiritual+awakening+radio%22&and%5B%5D=subject%3A%22james+bean%22&and%5B%5D=subject%3A%22sant+mat%22&and%5B%5D=subject%3A%22surat+shabd+yoga%22&and%5B%5D=subject%3A%22santmat%22&and%5B%5D=subject%3A%22Meditation%22&and%5B%5D=subject%3A%22spiritual+podcasts%22&and%5B%5D=subject%3A%22inner+light+and+sound%22&and%5B%5D=subject%3A%22science+of+spirituality%22&and%5B%5D=subject%3A%22love%22&and%5B%5D=subject%3A%22science+of+the+soul%22&and%5B%5D=subject%3A%22sant+mat+satsang+podcasts%22&and%5B%5D=subject%3A%22hope+and+light%2C+the+beloved+community%22&and%5B%5D=subject%3A%22God%22&and%5B%5D=subject%3A%22path+of+the+masters%22&and%5B%5D=subject%3A%22Sant+Mat+Satsang+Podcasts%22&and%5B%5D=subject%3A%22Spiritual+Awakening+Radio%22&and%5B%5D=subject%3A%22soul+travel%22&and%5B%5D=subject%3A%22Santmat%22&and%5B%5D=subject%3A%22Spirituality%22&and%5B%5D=subject%3A%22consciousness%22&sort=-week&page=2";

async function crawlAllLinkSpeech(url) {
  const res = await axios.get(url);
  const html = await res.data;
  const $ = await cheerio.load(html);
  await $("div.C234 > div > a").each((idex, element) => {
    // get all the speech links if not contain 'ambient' in the title
    const link = "https://archive.org" + $(element).attr("href");
    allSpeechLinks.push(link);
  });
  console.log(
    `Success crawl ${allSpeechLinks.length} links from current page.`.yellow,
  );
}

const allData = [];
async function loopEachPage(urlFinal) {
  // crawl all speech links from one page
  await crawlAllLinkSpeech(urlFinal);

  //extract the info of each speech link input
  for (let i = 0; i < allSpeechLinks.length; i++) {
    // for (let i = 0; i <= 3; i++) {
    const result = await functions.getAudioLinkDown(allSpeechLinks[i]);
    await allData.push(result);
    console.log(`Success speech info number ${i + 1} in current page`);
  }
  allSpeechLinks = [];
  // console.log(allData);
}

async function crawlAllPage() {
  for (let i = 1; i <= 8; i++) {
    console.log(`Starting page number ${i}.`.green);
    const urlFinal =
      "https://archive.org/details/audio?query=podcast+meditation&and%5B%5D=collection%3A%22podcasts%22&and%5B%5D=languageSorter%3A%22English%22&and%5B%5D=mediatype%3A%22audio%22&and%5B%5D=subject%3A%22meditation%22&and%5B%5D=subject%3A%22spirituality%22&and%5B%5D=subject%3A%22sermon%22&and%5B%5D=subject%3A%22unitarian+universalist%22&and%5B%5D=subject%3A%22spiritual+awakening+radio%22&and%5B%5D=subject%3A%22james+bean%22&and%5B%5D=subject%3A%22sant+mat%22&and%5B%5D=subject%3A%22surat+shabd+yoga%22&and%5B%5D=subject%3A%22santmat%22&and%5B%5D=subject%3A%22Meditation%22&and%5B%5D=subject%3A%22spiritual+podcasts%22&and%5B%5D=subject%3A%22inner+light+and+sound%22&and%5B%5D=subject%3A%22science+of+spirituality%22&and%5B%5D=subject%3A%22love%22&and%5B%5D=subject%3A%22science+of+the+soul%22&and%5B%5D=subject%3A%22sant+mat+satsang+podcasts%22&and%5B%5D=subject%3A%22hope+and+light%2C+the+beloved+community%22&and%5B%5D=subject%3A%22God%22&and%5B%5D=subject%3A%22path+of+the+masters%22&and%5B%5D=subject%3A%22Sant+Mat+Satsang+Podcasts%22&and%5B%5D=subject%3A%22Spiritual+Awakening+Radio%22&and%5B%5D=subject%3A%22soul+travel%22&and%5B%5D=subject%3A%22Santmat%22&and%5B%5D=subject%3A%22Spirituality%22&and%5B%5D=subject%3A%22consciousness%22&sort=-week&page=" +
      i;
    await loopEachPage(urlFinal);
    console.log(`Done for page number ${i}.`.green);
  }
}

async function saveToJson(array) {
  const outJSON = await JSON.stringify(array);
  await fs.writeFile("output.json", outJSON, function (err) {
    if (err) throw err;
    console.log("Output saved to output.json");
  });
  console.log("Done crawling for the filter");
}

async function main() {
  try {
    await crawlAllPage();
    await saveToJson(allData);
  } catch (er) {
    console.error(er);
  }
}

main();
