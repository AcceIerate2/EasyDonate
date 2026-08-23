import { useState } from 'react'
import './App.css'
import SearchResult from './components/searchResult'

function App() {
    const [results, setResults] = useState([])

    function search(event) {
      const text = event.target.value 
      if (text == "") {
          setResults([])
        return
      } 

      setResults([
        {id: 1, username: text, image: "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-9B6BE8CC77C81D8ED7C2249F426DA75D-Png-Background/150/150/AvatarHeadshot/Webp/noFilter", hasProfile: true},
      ])
    }

  return (
    <div id='Container'>
      <h1 id='Title'>EasyDonation</h1>
      <textarea id="Username" placeholder="Roblox Username" onInput={search}></textarea>

      <div id='SearchResults'>
        {results.map(user => (<SearchResult key={user.id} username={user.username} image={user.image} hasProfile={user.hasProfile}/>))}
      </div>
    </div>
  )
}

export default App