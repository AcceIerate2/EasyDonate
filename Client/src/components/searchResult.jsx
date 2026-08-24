function SearchResult({ id, username, image, hasProfile, callback }) {
  function onClicked() {
    callback(id);
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
