import { pipe } from './util';
import { ReadLaterList
       , LinkEntry
       , createReadLaterList
       , createLinkEntry
       } from './readLaterList';
import { validateReadLaterList } from './validator';

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

const parseReadLaterList = (readLaterText: string): ReadLaterList =>
    pipe( text => text.split('---')
        , entries => entries.map(entry => entry.trim())
        , entryTexts => entryTexts.reduce((acc, entryText) => [...acc, parseLinkEntry(entryText)], [])
        , createReadLaterList
        , validateReadLaterList
        )(readLaterText);

export { parseReadLaterList
       , ReadLaterList
       };
