import React from "react"
import { useFollowersForUser } from "./hooks/useFollowersForUser"
import { useFollowingForUser } from "./hooks/useFollowingForUser"
import { UserRecord } from "./types"

export const UserRow = (props: {
    userRecord: UserRecord
}) => {
    const {
        login
    } = props.userRecord

    const followers = useFollowersForUser({
        username: login
    })
    const following = useFollowingForUser({
        username: login
    })

    return (
        <div className="flex p-8 space-x-4 bg-gray-200 z-10 rounded-md">
            <h3 className="flex-1">{login}</h3>
            <div className="flex-1">
                <h4>Followers: {followers.length === 100 ? `100+` : followers.length}</h4>
                <p></p>
            </div>
            <div className="flex-1">
                <h4>Following: {following.length === 100 ? `100+` : following.length}</h4>
            </div>
        </div>
    )
}
