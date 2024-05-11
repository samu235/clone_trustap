import Link from 'next/link'
import style from './BarMenu.module.css'
const BarMenu = () => {
    
     return <div className={style.container}>
        <Link href="/create-transaction">Create Transaction</Link>
        <Link href="/transaction">Mis Transaction</Link>
     </div>
}
export default BarMenu