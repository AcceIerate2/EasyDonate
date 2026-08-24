import { useState, useRef } from "react";
import "./App.css";
import SearchResult from "./components/searchResult";

function getIndexById(dict, id) {
  for (const [i, userData] of dict.entries()) {
    if (userData.id == id) {
      return i;
    }
  }
}

function App() {
  const [results, setResults] = useState([]);
  const typingTimer = useRef(null);

  function toggleContinueBtnVisibility(toggle) {
    const button = document.getElementById("continueBtn");
    button.style.visibility = (toggle && "visible") || "hidden";
  }

  function search() {
    const textbox = document.getElementById("Username");
    const text = textbox.value;
    console.log(text);

    clearTimeout(typingTimer.current);

    typingTimer.current = setTimeout(function () {
      if (text == "" || text.length < 3) {
        setResults([]);
        toggleContinueBtnVisibility(false);
        return;
      }

      var ids = "";
      fetch("http://localhost:8080/api/getUser?username=" + text, {
        method: "POST",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (users) {
          console.log(users.data, users);

          if (!Array.isArray(users.data)) {
            return;
          }

          var newResults = [];
          users.data.sort(function (a, b) {
            if (a.name.toLowerCase() == text.toLowerCase()) {
              return -1;
            }

            if (b.name.toLowerCase() == text.toLowerCase()) {
              return -1;
            }

            return 0;
          });

          for (const userData of users.data) {
            const user = {
              id: userData.id,
              username: userData.name,
              hasProfile: true,
            };

            newResults.push(user);
            ids = ids + userData.id + ",";
          }

          var url = "http://localhost:8080/api/fetchAvatarHeadshot?ids=" + ids;
          fetch(url)
            .then(function (response) {
              return response.json();
            })
            .then(function (imageResponses) {
              for (const userImageData of imageResponses.data) {
                newResults[
                  getIndexById(newResults, userImageData.targetId)
                ].image = userImageData.imageUrl;
                setResults(newResults);
              }
            })
            .catch(function (error) {
              console.error("Failed To Fetch ImageUrl", error);
            });
        })
        .catch(console.warn);
    }, 400);
  }

  function continueToNext() {
    return 0;
  }

  return (
    <div id="Container">
      <h1 id="Title">Select A Recipient</h1>
      <textarea
        id="Username"
        placeholder="Roblox Username"
        onChange={search}
      ></textarea>

      <button id="continueBtn" onClick={continueToNext}>
        Continue
      </button>

      <div id="SearchResults">
        {results.map((user) => (
          <SearchResult
            key={user.id}
            username={user.username}
            image={user.image}
            hasProfile={user.hasProfile}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
