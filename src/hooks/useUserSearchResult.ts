import { useEffect, useState } from "react"
import axios from "axios"
import { UserRecord } from "../types"

export const useUserSearchResults = (args: {
    q: string,
    page: number,
    setSearchRateLimited: (val: any) => void
}) => {
    const [searchResponse, setSearchResponse] = useState({} as any)

    useEffect(() => {
        if (args.q.length > 0 && args.page !== 0) {
            axios.get(`https://axv-github-user-search-demo.herokuapp.com/users?query=${args.q}&page=${args.page}&per_page=3`)
                .then(res => {
                    console.log(`USER SEARCH RES: `, res)
                    if(res.data.error && res.data.error.includes(`API rate limit`)) {
                        args.setSearchRateLimited(true)
                    }
                    setSearchResponse(res.data)
                })
        }
    }, [args.page])

    return searchResponse
}
