"use client";

import Button from "@/components/ui/Button";
import confirmTransactionService from "@/services/trasaction/confirmTransactionService";
import getTransactionBySlugService from "@/services/trasaction/getTransactionBySlugService";
import { getUserSelect } from "@/store/user/selectors";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function YourLink() {
  const { slug } = useParams();
  const [transaction, setTrasaction] = useState(null);
  const userId = useSelector(getUserSelect)?.userId;
  const router = useRouter();
  useEffect(() => {
    if (slug) {
      getTransactionBySlugService(slug).then(data => {
        console.log(data);
        setTrasaction(data);
      })
    }
  }, [slug])

  const send = () => {
    confirmTransactionService({
      idUserBuller: transaction?.idUserBuller || userId,
      idUserSeller: transaction?.idUserSeller || userId,
      id: transaction?.id
    }).then(result => {
      if (result?.id == transaction?.id){
        router.push(`/transaction/${transaction?.id}`)
      }
    })
  }
  if (transaction?.error) {
    return <h1>enlace no valido</h1>
  }
  return <div>
    <h1>Nueva transacción</h1>
    <h2>{transaction?.name}</h2>
    <p>price:{transaction?.price}€</p>
    {transaction?.iduserSeller && <p>Vendido por: {transaction?.iduserSeller}</p>}
    {transaction?.idUserBuller && <p>Comprador: {transaction?.idUserBuller}</p>}
    {transaction?.iduserSeller && <p>¿quieres comprarlo?</p>}
    {transaction?.idUserBuller && <p>¿quieres venderlo? </p>}
    <Button onClick={send}>SI</Button>
  </div>

}