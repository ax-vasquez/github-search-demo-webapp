import { useEffect, useState } from "react"
import axios from "axios"
import { UserRecord } from "../types"

export const useFollowersForUser = (args: {
    username: string,
}) => {
    const [userRecords, setUserRecords] = useState([] as UserRecord[])

    useEffect(() => {
        axios.get(`https://axv-github-user-search-demo.herokuapp.com/user/followers?username=${args.username}`)
            .then(res => {
                if (res.data.error) {
                    console.error(`Encountered error while fetching followers for '${args.username}': `, res.data.error)
                } else {
                    setUserRecords(res.data.data)
                }
            })
    }, [])

    return userRecords
}
