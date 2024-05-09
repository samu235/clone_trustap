"use client";

import { useParams } from "next/navigation";

export default function YourLinkCopy() {
  const {slug} = useParams()
  const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/your_link/${slug}`
  return<div>
    <h1>comparte esta url</h1>
    <span>{url}</span>
  </div>

}