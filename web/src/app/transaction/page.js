'use client'
import ListTransaction from "@/components/ui/ListTransaction"
import getTransactionAllService from "@/services/trasaction/getTransactionAllService"
import { getUserSelect } from "@/store/user/selectors"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [pageControl, setPageControl] = useState({ currentPage: 0 })
    const {userId, admin} = useSelector(getUserSelect)
    const feching = useRef(false)
    const fecthData = () => {
        if (feching.current) return;
        feching.current = true;
        getTransactionAllService({
            userId:admin?null:userId,
            page: pageControl?.currentPage + 1,
            sizePage: 15
        }).then(e => {
            setTransactions([...transactions, ...e?.resultados])
            setPageControl({
                totalPages: e?.totalPages,
                currentPage: e?.page
            })
            feching.current = false;
        })
    }
    useEffect(() => {
        if (userId) {
            fecthData()
        }
    }, [userId])

    const handleScroll = () => {

        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight / 2
            && userId && pageControl?.totalPages > pageControl?.currentPage
        ) {
            fecthData()
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
    if (!transactions) return null;
    return <ListTransaction transactions={transactions} />
}
