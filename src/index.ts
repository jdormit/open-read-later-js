import { pipe } from './util';

interface LinkEntry
    { url: string
    , title: string
    , tags?: string[]
    }

type LinkEntryConfig = LinkEntry;

interface ReadLaterList
    { links: LinkEntry[]
//    , addLink: (link: LinkEntryConfig) => ReadLaterList
//    , removeLink: (url: string) => ReadLaterList
//    , getLink: (url: string) => LinkEntry
//    , updateLink: (url: string, newLink: LinkEntryConfig) => ReadLaterList
    }

const createLinkEntry = ({url, title, tags}: LinkEntryConfig): LinkEntry =>
    typeof tags === 'undefined' ? {url, title} : {url, title, tags};

const parseColonDelimitedFields = (fields: string[]): any =>
    fields.reduce((fieldsObj, field) =>
                  pipe( f => /^(.+?):\s?(.+)$/.exec(f)
                      , ([_, key, val]) => ({ [key.trim()]: val.trim(), ...fieldsObj})
                      )(field)
                 , {}
                 );

// TODO handle tags parsing
const parseLinkEntry = (linkEntryText: string): LinkEntry =>
    pipe( text => text.split('\n')
          , parseColonDelimitedFields
          , createLinkEntry
        )(linkEntryText);

const createReadLaterList = (linkEntries: LinkEntry[]): ReadLaterList => ({links: linkEntries});

const parseReadLaterList = (readLaterText: string): ReadLaterList =>
    pipe( text => text.split('---')
        , entries => entries.map(entry => entry.trim())
        , parseReadLaterListEntries([])
        , createReadLaterList
        )(readLaterText);

type parseReadLaterListEntries = (entries: LinkEntry[]) => (entryTexts: string[]) => LinkEntry[];
const parseReadLaterListEntries: parseReadLaterListEntries = entries => entryTexts =>
{
    if (entryTexts.length === 0) {
        return entries;
    } else {
        const [first, ...rest] = entryTexts;
        return parseReadLaterListEntries([...entries, parseLinkEntry(first)])(rest);
    }
};

export { parseReadLaterList };
