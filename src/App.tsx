import React, { useEffect, useState } from 'react';
import { useUserSearchResults } from './hooks/useUserSearchResult';
import { UserRow } from './UserRow';
import { UserRecord } from './types';

/**
 * The Search API only allows you to get the first 1000 records; whenever we encounter a result
 * set of more than 1000, we simply set it to 1000 since we can't fetch past that in the result
 * set.
 * 
 * @returns 
 */
const guardedRecordLimit = (args: {
  recordCount: number
}) => {
  if (args.recordCount > 1000) {
    return 1000
  }
  return args.recordCount
}

function App() {
  const [input, setInput] = useState(``)
  const [jumpToPageInput, setJumpToPageInput] = useState(``)
  const [page, setPage] = useState(0)
  const userSearchResults = useUserSearchResults({
    q: input,
    page,
  })
  const totalUsers = !!userSearchResults ? 
    guardedRecordLimit({
      recordCount: userSearchResults.total_count
    })
  : 0
  const pageCount = (!!userSearchResults && !!userSearchResults.items) ? Math.ceil(totalUsers / 3) : 1
  const results = (!!userSearchResults && !!userSearchResults.items) ? userSearchResults.items : []

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Just assume that, when the user enters a new search, they want to go to the first page
    setPage(1)
  }

  const prevPageHandler = (e: any) => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const nextPageHandler = (e: any) => {
    if (page < pageCount) {
      setPage(page + 1)
    }
  }

  const jumpToPageHandler = () => {
    const pageNum = parseInt(jumpToPageInput)
    setPage(pageNum)
  }

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // When deleting search text, assume the current results are no longer relevant
    if (e.target.value.length < input.length) {
      setPage(0)
    }
    setInput(e.target.value)
  }

  const jumpToPageInputIsValid = () => {
    return !isNaN(parseInt(jumpToPageInput)) && (parseInt(jumpToPageInput) > 0 && parseInt(jumpToPageInput) <= pageCount)
  }

  return (
    <div>
      <h1>Github User Search demo</h1>
      <form onSubmit={submitHandler}>
        <label>
          User query: 
          <input type="text" onChange={searchInputHandler} value={input}/>
        </label>
        <input type="submit" value="Search"/>
      </form>
      <div>
        {results.length > 0 ?
          results.map((result: UserRecord) => {
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
      {results.length > 0 ? <p>Page {page} out of {pageCount}</p> : null}
      {results.length > 0 ? 
        <div>
          <input placeholder="Jump-to page..." onChange={e => setJumpToPageInput(e.target.value)}/>
          <button onClick={e => jumpToPageHandler()} disabled={!jumpToPageInputIsValid()}>Go!</button>
        </div>
      : null}
      <button onClick={prevPageHandler}>Prev</button>
      <button onClick={nextPageHandler}>Next</button>
    </div>
  );
}

export default App;
