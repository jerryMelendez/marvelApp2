
export interface Character{
    id?: number;
    name?: string;
    description?: string;
    modified?: string;
    resourceURI?: string;
    series?: object;
    stories?: object;
    thumbnail?: any;
    urls?: any[];
    events?: object;
    comics?: any;
    photoUrl?: string;
}

export interface Comic{
    id?: number;
    title?: string;
    description?: string;
    modified?: string;
    resourceURI?: string;
    series?: object;
    stories?: object;
    thumbnail?: any;
    urls?: any[];
    events?: object;
    characters?: any;
    photoUrl?: string;
}