export interface IJoke {
    id: string;
    joke: string;
    status: number;
}
export interface IJokeChuck {
    categories: [];
    created_at: string;
    icon_url: string;
    id: string;
    updated_at: string;
    url: string;
    value: string;
}

export interface IJokeResult {
    joke: string;
    resultado: Result;
    date: any;
}

type Result = 1 | 2 | 3;