import Image from "next/image";
import styles from "./page.module.css";
import MyChat from "../components/chat/MyChat";
import StripeCard from "@/components/pay/StripeCard";

export default function Home() {
  return (
    <main className={styles.main}>
      {/*<MyChat />*/}
      <StripeCard/>
    </main>
  );
}
