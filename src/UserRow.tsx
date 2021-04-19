import React, { useState } from "react"
import { useStarredReposForUser } from "./hooks/useStarredReposForUser"
import { useUserData } from "./hooks/useUserData"
import { UserRecord } from "./types"

/**
 * A note on rate limits:
 * 
 * In order to alleviate issues with hitting the unauthenticated rate limit (~80 requests per minute),
 * the result set of these UserRecords has to be fairly small. Each record fires 2 requests, meaning a 
 * result set of 3 records will fire 6 requests per page (the search API has a separate rate limit
 * that doesn't factor in here), which makes it really easy to hit the rate limit in normal use.
 * 
 * When the rate limit is encountered, this component will replace the data it usually displays with
 * a simple string saying the rate limit was encountered.
 * 
 * @param props 
 * @returns 
 */
export const UserRow = (props: {
    userRecord: UserRecord
}) => {
    const [rateLimitError, setRateLimitError] = useState(null as unknown as string)
    const {
        login,
        avatar_url
    } = props.userRecord

    const userData = useUserData({
        username: login,
        setRateLimitErrorHandler: setRateLimitError
    })
    const starredRepos = useStarredReposForUser({
        username: login,
        setRateLimitErrorHandler: setRateLimitError
    })

    return (
        <div className="user-result-row" onClick={() => window.open(userData.html_url)}>
            <div>
                <img className="user-avatar" src={avatar_url}/>
                <h3 className="text-center mt-2">{login}</h3>
                <p className="text-center w-24 text-xs italic text-gray-500">{!!userData.location ? userData.location : `-`}</p>
            </div >
            {!!rateLimitError ?
                <div className="flex-1 text-center">
                    <p className="mt-8 italic text-gray-500">Uh oh! You've been rate limited... try again soon.</p>
                </div>
            :
                <div className="flex-1">
                    <table className="ml-8 float-left table w-2/3">
                        <thead>
                            <tr>
                                <th className="w-24"/>
                                <th className=""/>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td className="text-blue-600">{!!userData.name ? userData.name : (
                                    <p className="italic">unset</p>
                                )}</td>
                            </tr>
                            <tr>
                                <td>Bio</td>
                                <td className="text-blue-600">{!!userData.bio ? userData.bio : (
                                    <p className="italic">unset</p>
                                )}</td>
                            </tr>
                            <tr>
                                <td>Company</td>
                                <td className="text-blue-600">{!!userData.company ? userData.company : (
                                    <p className="italic">unset</p>
                                )}</td>
                            </tr>
                            <tr>
                                <td>Twitter</td>
                                <td className="text-blue-600">{!!userData.twitter_username ? userData.twitter_username : (
                                    <p className="italic">unset</p>
                                )}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex-1 mt-4">
                        <table className="float-right table-fixed">
                            <thead>
                                <tr>
                                    <th className="w-1/2"/>
                                    <th className="w-1/4"/>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Followers</td>
                                    <td>{!!userData.followers ? userData.followers : 0}</td>
                                </tr>
                                <tr>
                                    <td>Following</td>
                                    <td>{!!userData.following ? userData.following : 0}</td>
                                </tr>
                                <tr>
                                    {/* Even though we could paginate and get the full list, that would significantly increase the requests per page
                                    - just not checking for more than 100 for the sake of a lighter request footprint */}
                                    <td>Stars</td>
                                    <td>{starredRepos.length === 100 ? `100+` : starredRepos.length}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

