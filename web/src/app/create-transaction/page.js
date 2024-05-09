"use client";
import React, { useEffect, useState } from 'react';
import styles from './create-trasaction.module.css'
import BoxSelect from '@/components/ui/BoxSelect';
import { useSelector } from 'react-redux';
import { getUserSelect } from '@/store/user/selectors';
import newTransactionService from '../../services/trasaction/newTransactionService'
import { useRouter } from 'next/navigation'

export default function CreateTrasaction() {
  const [actionSelect, setActionSelect] = useState(null)
  const [price, setPrice] = useState('')
  const [name, setName] = useState('')
  const userId = useSelector(getUserSelect)?.userId
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!actionSelect) return;

    let idUserBuller = null;
    let idUserSeller = null;

    if (actionSelect === 'seller') {
      idUserSeller = userId;
    } else {
      idUserBuller = userId
    }

    const result = await newTransactionService({
      idUserBuller,
      idUserSeller,
      price,
      name
    })
    console.log("result", result)
    if (result?.status === "ok" && result?.uuid) {
      router.push(`${process.env.NEXT_PUBLIC_CLIENT_URL}/your_link_copy/${result?.uuid}`)
    }
  };

  return <div className={styles.container}>
    <h3>Soy</h3>
    <div className={styles.containerBox}>
      <BoxSelect id='buller' title='Comprador' setSelect={setActionSelect} isSelect={actionSelect} >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
      </BoxSelect>
      <BoxSelect id='seller' title='Vendedor' setSelect={setActionSelect} isSelect={actionSelect} >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"  viewBox="0 0 16 16">
          <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5" />
        </svg>
      </BoxSelect>
    </div >
    <form onSubmit={handleSubmit}>
      <div className={styles.form_group}>
        <input className={styles.form_input} type="text" value={price} placeholder="Precio" onChange={e => setPrice(e.target.value)} pattern="^\d+(\.\d{1,2})" required />
      </div>
      <div className={styles.form_group}>
        <input className={styles.form_input} type="text" value={name} placeholder="nombre" onChange={e => setName(e.target.value)} required />
      </div>
      <button type="submit">Continual</button>
    </form>
  </div >

}