'use client'
import { useRouter } from 'next/navigation'
import styles from './style.module.css'
const ListTransaction = ({ transactions }) => {
    return <div className={styles?.containerAll}>
        {transactions?.map(t => {
            return <Transaction transaction={t} key={t?.id}/>
        })}
    </div>
}

const Transaction = ({ transaction }) => {
    const router = useRouter()
    return <div
    className={styles?.containerTransaction}
    onClick={()=>router.push(`/transaction/${transaction?.id}`)}
    >
        <h3>{transaction?.name}</h3>
        <span>id:{transaction?.id}</span>
        <span>vendedor{transaction?.iduserSeller}</span>
        <span>Comprador:{transaction?.idUserBuller}</span>
        
        <span>price:{transaction?.price}</span>
    </div>
}

export default ListTransaction