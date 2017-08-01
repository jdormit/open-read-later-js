import { pipe } from './util';
import { validateReadLaterList } from './validator';

export interface LinkEntry
    { url: string
    , title: string
    , tags?: string[]
    }

type LinkEntryConfig = LinkEntry;

export interface ReadLaterList
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
                      , ([_, key, val]) => ({ ...fieldsObj, [key.trim()]: val.trim() })
                      )(field)
                 , {}
                 );

const parseLinkEntry = (linkEntryText: string): LinkEntry =>
    pipe( text => text.split('\n')
        , parseColonDelimitedFields
        , ({tags, ...fields}) => typeof tags === 'undefined' ? fields : {...fields, tags: tags.split(',').map(tag => tag.trim())}
        , createLinkEntry
        )(linkEntryText);

const createReadLaterList = (linkEntries: LinkEntry[]): ReadLaterList => ({links: linkEntries});

const parseReadLaterList = (readLaterText: string): ReadLaterList =>
    pipe( text => text.split('---')
        , entries => entries.map(entry => entry.trim())
        , entryTexts => entryTexts.reduce((acc, entryText) => [...acc, parseLinkEntry(entryText)], [])
        , createReadLaterList
        , validateReadLaterList
        )(readLaterText);

export { parseReadLaterList };
