function SearchResult({ username, image, hasProfile }) {
  function onClicked() {
    console.log("Clicked");
  }

  return (
    <button onClick={onClicked} id="SearchResultBtn">
      <img id="SearchResultPfp" src={image}></img>
      <p id="SearchResultUsername">{username}</p>
      <p id="SignedStatus">
        {hasProfile ? "Custom Donations" : "Game Passes only"}
      </p>
    </button>
  );
}

export default SearchResult;
