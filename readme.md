# open-read-later.js
> A JavaScript implementation of the [Open Read-Later specification](https://github.com/jdormit/open-read-later)

The Open Read-Later specification defines a file format for storing read-later lists in a cross-application, user-friendly way. [Check out the specification](https://github.com/jdormit/open-read-later) to learn more. This library implements the specification, providing a straightforward API to parse Open Read-Later files, create new read-later list objects, and add, update, query, and delete links from these objects.

## Installation
`open-read-later.js` is available on npm:

```
$ npm install open-read-later
```

## API
The core of the library involves creating and manipulating two types of objects: `LinkEntry` objects and `ReadLaterList` objects.

`LinkEntry` objects are defined as:

```typescript
{
    url: string,
    title: string,
    tags?: string[]
}
```

`ReadLaterList` objects are defined as:

```typescript
{
    links: LinkEntry[],
    addLink: (link: LinkEntry) => ReadLaterList,
    getLink: (url: string) => LinkEntry,
    updateLink: (url: string, newLink: LinkEntry) => ReadLaterList,
    removeLink: (url: string) => ReadLaterList,
    toString: () => string
}
```

For the most part, `ReadLaterList` object methods are self-explanatory. It is important to note that the `addLink`, `updateLink`, and `removeLink` methods return a new `ReadLaterList` rather than mutating the existing one. This means they can be chained:

```javascript
const myReadLaterList = newReadLaterList()
    .addLink({ url: 'http://example.com', title: 'Example' })
    .addLink({ url: 'https://github.com', title: 'GitHub'})
    .updateLink('https://github.com', { url: 'https://github.com', title: 'GitHub', tags: [ 'open source', 'code'] })
    .removeLink('http://example.com');
```

The `toString` method returns the `ReadLaterList` as an Open Read-Later-formatted `string`.

The `open-read-later` module exposes two functions for creating new `ReadLaterList` objects: `parseReadLaterList` and `newReadLaterList`.

`parseReadLaterList` is defined as:

```typescript
parseReadLaterList: (listText: string) => ReadLaterList
```

The `listText` is a `string` in the Open Read-Later format. `parseReadLaterList` returns a new `ReadLaterList` containing the links specified in the `listText`.

`newReadLaterList` is defined as:

```typescript
newReadLaterList: () => ReadLaterList
```

`newReadLaterList` returns an empty `ReadLaterList`.
