import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Restaurant() {
  const router = useRouter()
  return (
    <h1>Dynamic Restaurant Page {router.query.restaurant}</h1>
  )
}
