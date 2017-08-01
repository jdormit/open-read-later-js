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
    ({url, title, tags});

const parseColonDelimitedFields = (fields: string[]): any =>
    fields.reduce((fieldsObj, field) =>
                  pipe( f => /^(.+):\s?(.+)$/.exec(f)
                      , ([key, val]) => ({ [key]: val, ...fieldsObj})
                      )(field)
                 , {}
                 );

// TODO handle tags parsing
const parseLinkEntry = (linkEntryText: string): LinkEntry =>
    pipe( text => text.split('\n')
          , parseColonDelimitedFields
          , ({url, title, tags}) => createLinkEntry({url, title, tags})
        )(linkEntryText);

const createReadLaterList = (...linkEntries: LinkEntry[]): ReadLaterList => ({links: linkEntries});

const parseReadLaterList = (readLaterText: string): ReadLaterList =>
    pipe( text => text.split('---')
        , entries => entries.map(entry => entry.trim())
        , parseReadLaterListEntries
        , createReadLaterList
        )(readLaterText);

type parseReadLaterListEntries = (entryTexts: string[]) => (entries: LinkEntry[]) => LinkEntry[];
const parseReadLaterListEntries: parseReadLaterListEntries = entryTexts => entries =>
{
    if (entryTexts.length === 0) {
        return entries;
    } else {
        const [first, ...rest] = entryTexts;
        return parseReadLaterListEntries(rest)([...entries, parseLinkEntry(first)]);
    }
};

export { parseReadLaterList };
