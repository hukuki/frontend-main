import Head from "next/head";
import Hero from "../components/hero.tsx";
import styles from "./HomePage.module.css";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles.container}>
        <svg className={styles["container__background-svg"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill-opacity="1" d="M0,64L80,90.7C160,117,320,171,480,165.3C640,160,800,96,960,96C1120,96,1280,160,1360,192L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        <nav className={styles.navbar}>
          <div className={styles["navbar__logo"]}>
            DeepLex
          </div>
          <ul className={styles["navbar__items"]}>
            <li className={styles["navbar__item"]}>Neden DeepLex</li>
            <li className={styles["navbar__item"]}>Takım</li>
            <button className={styles["navbar__login-button"]}>
            Giriş Yap
          </button>
          </ul>

        </nav>
        <div className={styles["content"]}>
          <div className={styles["content__text"]}>
            <h1 className={styles["content__header"]}>
              Döküman aramanın
            </h1>
            <h1 className={styles["content__sub"]}>kısa yolu</h1>
            <p className={styles["content__description"]}>DeepLex, legal döküman arama sürecinizi hızlandırarak verimliliğinizi artırır. Yapay zeka modelimiz ile işinize yarayan dökümanları bulmanız artık çok daha kolay</p>
            <button className={styles["content__button"]}>
              DeepLex'i Dene
            </button>
          </div>
          <div className={styles["content__image"]}>
            <Image />
          </div>
        </div>
        <div className={styles.footer}>
          &copy; 2023. All rights reserved.
        </div>
      </main>
    </>
  );
}
