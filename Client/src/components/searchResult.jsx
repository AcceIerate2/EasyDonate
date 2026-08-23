function SearchResult({username, image, hasProfile}) {
    console.log(username, image)
    return (
        <button id='SearchResultBtn'>
            <img id='SearchResultPfp' src={image}></img>
            <p id='SearchResultUsername'>{username}</p>
            <p id="SignedStatus">{hasProfile ? "Custom Donations" : "Game Passes only"}</p>
        </button>
    )
}

export default SearchResult