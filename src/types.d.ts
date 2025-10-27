export interface Movie {
id: number;
title: string;
poster_path: string | null;
release_date: string;
overview?: string;
}


export interface Genre {
id: number;
name: string;
}