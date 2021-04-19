import { useEffect, useState } from "react"
import axios from "axios"
import { UserRecord } from "../types"

export const useUserSearchResults = (args: {
    q: string,
    page: number,
}) => {
    const [userRecords, setUserRecords] = useState([] as UserRecord[])

    useEffect(() => {
        if (args.q.length > 0 && args.page !== 0) {
            axios.get(`https://axv-github-user-search-demo.herokuapp.com/users?query=${args.q}&page=${args.page}&per_page=3`)
                .then(res => {
                    setUserRecords(res.data.items)
                })
        }
    }, [args.page])

    return userRecords
}
