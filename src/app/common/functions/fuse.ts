import Fuse, { type IFuseOptions } from 'fuse.js';
type SearchConfig<T = string> = {
    searchTerm: T | undefined;
    maxResults: number;
    showAllIfEmpty?: boolean;
    tranform: (label: string) => string;
}

type AllOptionalExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type SearchConfigParams<T = string> = AllOptionalExcept<SearchConfig<T>, 'searchTerm'>;



export function searchWithFuse<T extends Record<string, string>>(items: T[], options: SearchConfigParams, keys: (keyof T)[]): T[] {

    const { showAllIfEmpty, searchTerm, maxResults } = options;

    if (!searchTerm && showAllIfEmpty) return items;
    if (!searchTerm) return [];

    const trimmedTerm = searchTerm.toLocaleLowerCase().trim();

    const fuseOptions: IFuseOptions<T> = {
        keys: keys as string[],
        threshold: 0.3,
        isCaseSensitive: false,
        distance: 100,
    }
    let results: T[];

    if (trimmedTerm.length <= 2) {
        results = items.filter(item => keys.some(key => item[key].toLocaleLowerCase().trim() === trimmedTerm))
    } else {
        const fuse = new Fuse(items, fuseOptions);
        results = fuse.search(trimmedTerm).map(result => result.item);
    }

    return results.slice(0, maxResults);
}