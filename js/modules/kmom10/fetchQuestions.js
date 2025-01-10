/**
 * Hantera ordlistan och tillhandahålla slumpmässiga ord för spelet.
 * - Laddar ord från en extern JSON-fil.
 * - Hämtar ett slumpmässigt ord från listan.
 * @module kmom06/manageWords
 * @returns {object} Funktioner för att hantera ordlistan.
 */
const wordManager = (() => {
    let words = []
    let isLoaded = false

    /**
     * Hämtar ord från en JSON-fil och lagrar dem i en lista.
     * Funktionen hämtar ord från filen `words.json`, sparar dem i variabeln `words`,
     * och markerar att orden har laddats.
     * @async
     * @function
     * @returns {Promise<void>} Laddar ordlistan.
     */
    async function fetchWords() {
        const response = await fetch('./data/words.json')
        words = await response.json()
        isLoaded = true
        console.log('Word list:', words)
    }

    /**
     * Hämtar ett slumpmässigt ord från ordlistan.
     * Funktionen kontrollerar om ordlistan är laddad, laddar den vid behov,
     * och returnerar ett slumpmässigt ord från listan.
     * @async
     * @function
     * @returns {Promise<string>} Ett slumpmässigt ord från ordlistan 'word'.
     */
    async function getRandomWord() {
        if (!isLoaded) await fetchWords()
        const randomIndex = Math.floor(Math.random() * words.length)
        return words[randomIndex]
    }

    return {
        getRandomWord
    }
})()

export { wordManager }
