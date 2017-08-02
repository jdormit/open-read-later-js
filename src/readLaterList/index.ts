import { pipe
       } from '../util';
import { validateReadLaterList
       } from '../validator';

interface LinkEntry
    { url: string
    , title: string
    , tags?: string[]
    }

interface ReadLaterList
    { links: LinkEntry[]
    , addLink: (link: LinkEntryConfig) => ReadLaterList
    , removeLink: (url: string) => ReadLaterList
    , getLink: (url: string) => LinkEntry
    , updateLink: (url: string, newLink: LinkEntryConfig) => ReadLaterList
    , toString: () => string
    }

type LinkEntryConfig = LinkEntry;

const linkEntryToString = (linkEntry: LinkEntry): string =>
    typeof linkEntry.tags === 'undefined'
    ? `url: ${linkEntry.url}
title: ${linkEntry.title}`
    : `url: ${linkEntry.url}
title: ${linkEntry.title}
tags: ${linkEntry.tags.join(', ')}`

const newReadLaterList = () => createReadLaterList([]);

const createReadLaterList = (linkEntries: LinkEntry[]): ReadLaterList =>
    ({ links: linkEntries
     , addLink: function(link: LinkEntryConfig): ReadLaterList {
         return pipe( createLinkEntry
                    , linkEntry => createReadLaterList([...this.links, linkEntry])
                    , validateReadLaterList
                    )(link);
     }
     , removeLink: function(url: string): ReadLaterList {
         return createReadLaterList(this.links.filter(link => link.url !== url));
     }
     , getLink: function(url: string): LinkEntry {
         return this.links.filter(link => link.url === url)[0];
     }
     , updateLink: function(url: string, newLink: LinkEntryConfig): ReadLaterList {
         return pipe( url => this.links.filter(link => link.url !== url)
                    , otherLinks => [createLinkEntry(newLink), ...otherLinks]
                    , links => createReadLaterList(links)
                    , validateReadLaterList
                    )(url);
     }
     , toString: function(): string {
         return this.links.map(linkEntryToString).join('\n---\n');
     }
     });

const createLinkEntry = ({url, title, tags}: LinkEntryConfig): LinkEntry =>
    typeof tags === 'undefined' ? {url, title} : {url, title, tags};

export { ReadLaterList
       , LinkEntry
       , createLinkEntry
       , createReadLaterList
       , newReadLaterList
       }
