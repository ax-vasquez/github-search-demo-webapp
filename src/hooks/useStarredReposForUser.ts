import { useEffect, useState } from "react"
import axios from "axios"
import { UserRecord } from "../types"

export const useStarredReposForUser = (args: {
    username: string,
    setRateLimitErrorHandler: (e: string) => void
}) => {
    const [userData, setUserData] = useState([] as UserRecord[])

    useEffect(() => {
        axios.get(`https://axv-github-user-search-demo.herokuapp.com/user/repos/starred?username=${args.username}`)
            .then(res => {
                if (res.data.error) {
                    console.error(`Encountered error while fetching starred repos for '${args.username}': `, res.data.error)
                    args.setRateLimitErrorHandler(res.data.error)
                } else {
                    setUserData(res.data.data)
                }
            })
    }, [args.username])

    return userData
}
