import styles from "./LoginPage.module.css"

function LoginPage() {
  return (
    <div className={styles.container}>
        <div className={styles["hero__container"]}>
            <div className={styles["hero__content"]}>
                <h1 className={styles["hero__header"]}>Lorem ipsum</h1>
                <p className={styles["hero__text"]}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, atque doloribus natus molestias facere, odit ullam corporis impedit, quo veritatis error voluptates voluptatem? Pariatur, magni fugit. Blanditiis qui temporibus dolores.
                Iusto, totam repudiandae? Vel, velit, dignissimos ab, nesciunt cumque aperiam repellat delectus enim tempora rem quae beatae assumenda. Quos, hic nostrum. Quo molestias quod tempora, quos illo voluptas dignissimos exercitationem? </p>
            </div>
        </div>
        <div className={styles["form__container"]}>
            <h3 className={styles["form__header"]}>Giriş Yapın</h3>
            <form action="" className={styles["login__form"]}>
                <div className={styles["form__input-area"]}>
                    <div className={styles["form__input-container"]}>
                        <label for="email" className={styles["form__input-label"]}>Email / Kullanıcı Adı</label>
                        <input type="email" className={styles["form__input"]} placeholder="Email adresinizi veya kullanıcı adınızı giriniz" id="email" />
                    </div>
                    <div className={styles["form__input-container"]}>
                        <label for="password" className={styles["form__input-label"]}>Şifre</label>
                        <input type="password" className={styles["form__input"]} placeholder="Şifrenizi giriniz" id="password" />
                    </div>
              </div>
                <button className={styles["form__button"]} type="submit" class="button">Giriş Yapın</button>
            </form>
            <div className={styles["or__container"]}>
                <span>Ya da</span>
            </div>
            <div className={styles["google-signin"]}>
                <button>Google ile giriş yapın</button>
            </div>
        </div>
    </div>
  )
}

export default LoginPage