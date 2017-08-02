import { pipe } from '../util';
import { ReadLaterList } from '../readLaterList';

const validateReadLaterList = (readLaterList: ReadLaterList): ReadLaterList | never =>
    pipe( validateUniqueUrls
        )(readLaterList);

interface urlCount
    { [url: string]: number
    }

const validateUniqueUrls = (readLaterList: ReadLaterList): ReadLaterList | never =>
{
    const urlCounts: urlCount = readLaterList.links.reduce((urlCount, linkEntry) => typeof urlCount[linkEntry.url] === 'undefined' ? {...urlCount, [linkEntry.url]: 1} : {...urlCount, [linkEntry.url]: urlCount[linkEntry.url] + 1}, {});
    const repeatedUrls: string[] = Object.keys(urlCounts).filter(url => urlCounts[url] > 1);
    if (repeatedUrls.length > 0) {
        throw new Error(`List validation failed due to non-unique urls: ${repeatedUrls}`);
    } else {
        return readLaterList;
    }
}

export { validateReadLaterList
       }
