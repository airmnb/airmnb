import * as airmnb from "./config.airmnb";
import * as airmombaby from "./config.airmombaby";

function getConfig(key){
  switch (key) {
    case "china":
    case "airmnb":
    case "airmnb.com":
    case "www.airmnb.com":
      return airmnb.config;
    case "oversea":
    case "airmombaby":
    case "airmombaby.com":
    case "www.airmombaby.com":
      return airmombaby.config;
    default:
      return airmombaby.config;
  }
}

const siteName = process.env.SITE_NAME;
console.log('Site name:', siteName);

export const config = getConfig(siteName);

console.log('config', config);
