"use client";

import getTransactionByIdService from "@/services/trasaction/getTransactionByIdService";
import nameState from "@/utils/nameState";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function Transaction() {
    const { id } = useParams()
    const [transaction, setTrasaction] = useState(null)
    const router = useRouter();
    useEffect(() => {
        getTransactionByIdService(id).then(e => {
            console.log("result", e)
            if (e?.id == id) setTrasaction(e)
        })
    }, [id])
    return <div>
        <div>
            <p>name:{transaction?.name}</p>
            <p>datatime:{transaction?.datatime}</p>
            <p>Comprador:{transaction?.idUserBuller}</p>
            <p>Vendedor:{transaction?.iduserSeller}</p>
            <p>Precio:{transaction?.price}</p>
            <p>Estado:{nameState(transaction?.state)}</p>
        </div>
        { transaction?.state == 1 && <div><button onClick={()=>router.push(`/your_link_copy/${transaction?.uuid}`)}>Ir a link</button></div>}
    </div>



}