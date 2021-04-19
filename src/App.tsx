import React, { useEffect, useState } from 'react';
import { useUserSearchResults } from './hooks/useUserSearchResult';
import { UserRow } from './UserRow';
import { UserRecord } from './types';
import './index.css';

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
  const results = (!!userSearchResults && !!userSearchResults.items && page !== 0) ? userSearchResults.items : []

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
    <div className="app-container">
      <header>
        <h1>Github User Search demo</h1>
      </header>
      <div className="m-8">
        This tool utilizes the GitHub search API (through <code>octokit</code>) and demonstrates <b>unauthenticated</b> searching.
        When using this tool, it's very likely you'll hit a rate limit either with the Search API (which has a rate limit of 10
        requests per minute) and/or the core API requests (which has a rate limit of 80 requests per minute). The result set per page is small to reduce
        the number of requests needed per page, but it's still possible to run into the rate limits by executing searches in rapid-succession,
        or switching through pages too quickly. In short, this is for demonstration purposes, only.
      </div>
      <div>
        <form onSubmit={submitHandler} className="text-center">
          <label>
            User query: 
            <input type="text" onChange={searchInputHandler} value={input}/>
          </label>
          <input type="submit" value="Search" className="search-button"/>
        </form>
        <div className="space-y-4 m-4">
          {results.length > 0 ?
            results.map((result: UserRecord) => {
              return (
                <UserRow 
                  key={result.login}
                  userRecord={result}
                />
              )
            })
          :
            null
          }
        </div>
        {results.length > 0 ? 
          <div>
            <button className="float-left ml-8" onClick={prevPageHandler}>Prev</button>
            <button className="float-right mr-8" onClick={nextPageHandler}>Next</button>
            <div className="text-center">
              <input className="mr-4" placeholder="Jump-to page..." onChange={e => setJumpToPageInput(e.target.value)}/>
              <button className="jump-page-button" onClick={e => jumpToPageHandler()} disabled={!jumpToPageInputIsValid()}>Go!</button>
            </div>
          </div>
        : null}
        {results.length > 0 ? <p className="text-center m-4">Page {page} out of {pageCount}</p> : null}
      </div>
      
    </div>
  );
}

export default App;
