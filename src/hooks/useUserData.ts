import { useEffect, useState } from "react"
import axios from "axios"
import { UserRecord } from "../types"

export const useUserData = (args: {
    username: string,
    setRateLimitErrorHandler: (e: string) => void
}) => {
    const [userData, setUserData] = useState({} as any)

    useEffect(() => {
        axios.get(`https://axv-github-user-search-demo.herokuapp.com/user?username=${args.username}`)
            .then(res => {
                if (res.data.error) {
                    console.error(`Encountered error while fetching data for '${args.username}': `, res.data.error)
                    args.setRateLimitErrorHandler(res.data.error)
                } else {
                    setUserData(res.data)
                }
            })
    }, [args.username])

    return userData
}
