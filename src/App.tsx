import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useUserSearchResults } from './hooks/useUserSearchResult';
import { UserRow } from './UserRow';

function App() {
  const [input, setInput] = useState(``)
  const [page, setPage] = useState(0)
  const userSearchResults = useUserSearchResults({
    q: input,
    page,
  })

  const searchHandler = (e: any) => {
    // Just assume that, when the user enters a new search, they want to go to the first page
    setPage(1)
  }

  return (
    <div>
      <h1>Github User Search demo</h1>
      <input type="text" placeholder="User query..." onChange={e => setInput(e.target.value)}/>
      <button onClick={searchHandler}>Search</button>
      {userSearchResults.length > 0 ?
        userSearchResults.map(result => {
          return (
            <UserRow 
              userRecord={result}
            />
          )
        })
      :
        <div>
          <p>Nothing yet!</p>
        </div>
      }
    </div>
  );
}

export default App;
