export class PlayList {
    id: string;
    name: string;
    songs: Array<string>;
    tint: string;

    constructor(id: string, name: string, songs: Array<string>, tint: string) {
        this.id = id;
        this.name = name;
        this.songs = songs;
        this.tint = tint;
    }
}

export class Song {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

export const AllSongs = [
    new Song('1', 'Song 1'),
    new Song('2', 'Song 2'),
    new Song('3', 'Song 3'),
    new Song('4', 'Song 4'),
    new Song('5', 'Song 5'),
    new Song('6', 'Song 6'),
    new Song('7', 'Song 7'),
    new Song('8', 'Song 8'),
    new Song('9', 'Song 9'),
    new Song('10', 'Song 10'),
]

export const PlayLists = [
    new PlayList('1', 'PlayList 1', ['1', '3', '5'], 'orange'),
    new PlayList('2', 'PlayList 2', ['2', '7'], 'yellow'),
    new PlayList('3', 'PlayList 3', ['8'], 'green')
];
