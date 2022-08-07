
class MarvelService{
    _apiKey = 'apikey=53d76e0bf30ef11565a02e316c5318d7';
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'

    getResource = async (url) => {
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(`Oops, error ${res.status}! Try again later`);
        }

        return res.json();
    }

    getAllCharacters = async () => {
        let res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._sortedDataChar); // таким образом, каждый item будет сам вызывать функцию и подставляться в качестве аргумента
    }

    getCharacter = async (id) => {
        let res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._sortedDataChar(res.data.results[0]);
    }

    _sortedDataChar(res){
        return {
            id: res.id,
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            name: res.name,
            descr: res.description,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items
        };
    }
}

export default MarvelService;