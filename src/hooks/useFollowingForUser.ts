import { useEffect, useState } from "react"
import axios from "axios"
import { UserRecord } from "../types"

export const useFollowingForUser = (args: {
    username: string,
}) => {
    const [userRecords, setUserRecords] = useState([] as UserRecord[])

    useEffect(() => {
        axios.get(`https://axv-github-user-search-demo.herokuapp.com/user/following?username=${args.username}`)
            .then(res => {
                if (res.data.error) {
                    console.error(`Encountered error while fetching users followed by '${args.username}': `, res.data.error)
                } else {
                    setUserRecords(res.data.data)
                }
            })
    }, [])

    return userRecords
}
