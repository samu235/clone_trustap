"use client";

import Modal from 'react-modal';
import StripeCard from "@/components/pay/StripeCard";
import Button from "@/components/ui/Button";
import getTransactionByIdService from "@/services/trasaction/getTransactionByIdService";
import { getUserSelect } from "@/store/user/selectors";
import nameState from "@/utils/nameState";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import createPaymentIntentService from '@/services/pay/createPaymentIntentService';



export default function Transaction() {
    const { id } = useParams()
    const [transaction, setTrasaction] = useState(null)
    const [clientSecret, setClientSecret] = useState(null)
    const router = useRouter();
    const userId = useSelector(getUserSelect)?.userId
    useEffect(() => {
        getTransactionByIdService(id).then(e => {
            if (e?.id == id) setTrasaction(e)
        })
    }, [id])
    const initProcesPay = () => {
        // TOOD seria conveniente no estar creando transacciones si ya estaban cradas, seria mejor hacer un guardado de esta en bbdd y recuperarla si existe
        createPaymentIntentService(transaction?.id).then(result => {
            console.log("result", result)
            if (result?.clientSecret) {
                setClientSecret(result?.clientSecret)
            }
        })

    }
    return <div>
        <div>
            <p>name:{transaction?.name}</p>
            <p>datatime:{transaction?.datatime}</p>
            <p>Comprador:{transaction?.idUserBuller}</p>
            <p>Vendedor:{transaction?.iduserSeller}</p>
            <p>Precio:{transaction?.price}</p>
            <p>Estado:{nameState(transaction?.state)}</p>
        </div>
        {transaction?.state == 1 && <div><Button onClick={() => router.push(`/your_link_copy/${transaction?.uuid}`)}>Ir a link</Button></div>}
        {transaction?.state == 2 &&
            transaction?.iduserSeller === userId &&
            <div><Button onClick={initProcesPay}>Pagar</Button></div>}


        <Modal
            isOpen={clientSecret}
            /*onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}*/
            contentLabel="pay"
        >
            <StripeCard clientSecret={clientSecret} close={() => setClientSecret(null)} idTrasaction={transaction?.id} />
        </Modal>
    </div>



}