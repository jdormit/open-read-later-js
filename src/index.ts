interface LinkEntry {
    url: string,
    title: string,
    tags?: string[]
}

type LinkEntryConfig = LinkEntry;

interface ReadLaterList {
    links: LinkEntry[]
}

const createLinkEntry = ({url, title, tags}: LinkEntryConfig): LinkEntry => ({url, title, tags});

const createReadLaterList = (...linkEntries: LinkEntry[]): ReadLaterList => ({links: linkEntries});
