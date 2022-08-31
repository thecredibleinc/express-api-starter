import enUs from "./locales/en-us";
import logger from "../logger.util"

let locale = {};


export const setLocale = function (lan) {
    try {
        switch (lan) {
            case "en-us":
                locale = enUs;
                break;
            default:
                locale = enUs;
                break;
        }
        return true;
    } catch (err) {
        logger.error(`Error in setting up locales : ${JSON.stringify(err.message)}`);
        return false;
    }
};

export function localization (key) {
    return locale[key] ? locale[key] : "";
}



// set up lang manually
setLocale("en-us");