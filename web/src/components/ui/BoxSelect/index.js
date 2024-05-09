"use client";
import CircleCheck from '../CircleCheck'
import styles from './BoxSelect.module.css'

const BoxSelect = ({ title, setSelect, isSelect, id,children }) => {

    return <div
        className={`${styles.container} `}
        onClick={()=>setSelect(id)}
    >
        <CircleCheck isSelect={isSelect === id} ></CircleCheck>
        {children}
        <span>{title}</span>
        
    </div>
}

export default BoxSelect