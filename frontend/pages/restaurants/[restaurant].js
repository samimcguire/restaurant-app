import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";

export default function Restaurant() {
  const router = useRouter()
  return (
    <h1>Restaurant Page {router.query.restaurant}</h1>
  );
}
