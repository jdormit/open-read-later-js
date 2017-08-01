interface LinkEntry
    { url: string
    , title: string
    , tags?: string[]
    }

interface ReadLaterList
    { links: LinkEntry[]
//    , addLink: (link: LinkEntryConfig) => ReadLaterList
//    , removeLink: (url: string) => ReadLaterList
//    , getLink: (url: string) => LinkEntry
//    , updateLink: (url: string, newLink: LinkEntryConfig) => ReadLaterList
//    , toString: () => string
    }

type LinkEntryConfig = LinkEntry;

const createReadLaterList = (linkEntries: LinkEntry[]): ReadLaterList => ({links: linkEntries});

const createLinkEntry = ({url, title, tags}: LinkEntryConfig): LinkEntry =>
    typeof tags === 'undefined' ? {url, title} : {url, title, tags};

export { ReadLaterList
       , LinkEntry
       , createLinkEntry
       , createReadLaterList
       }
