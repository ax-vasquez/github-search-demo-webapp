import React, { useEffect } from "react"
import { useFollowersForUser } from "./hooks/useFollowersForUser"
import { useFollowingForUser } from "./hooks/useFollowingForUser"
import { UserRecord } from "./types"

export const UserRow = (props: {
    userRecord: UserRecord
}) => {
    const {
        login
    } = props.userRecord

    console.log(`RENDERING: `, login)

    const followers = useFollowersForUser({
        username: login
    })
    const following = useFollowingForUser({
        username: login
    })

    return (
        <div key={login}>
            <h3>{login}</h3>
            <div>
                <h4>Follower count: </h4>
                <p>{0}</p>
            </div>
            <div>
                <h4>Following count: </h4>
                <p>{0}</p>
            </div>
        </div>
    )
}
