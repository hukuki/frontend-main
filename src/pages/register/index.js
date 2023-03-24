import styles from "./RegisterPage.module.css"

function RegisterPage() {
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
            <h3 className={styles["form__header"]}>Kayıt Olun</h3>
            <form action="" className={styles["login__form"]}>
                <div className={styles["form__input-area"]}>
                    <div className={styles["form__input-names-container"]}>
                        <div className={styles["form__input-container"]}>
                            <label htmlFor="first_name" className={styles["form__name-input-label"]}>İsim</label>
                            <input type="text" className={styles["form__input-name"]} placeholder="İsminiz" id="first_name" />
                        </div>
                        <div className={styles["form__input-container"]}>
                            <label htmlFor="last_name" className={styles["form__name-input-label"]}>Soyisim</label>
                            <input type="text" className={styles["form__input-name"]} placeholder="Soyisminiz" id="last_name" />
                        </div>
                    </div>
                    <div className={styles["form__input-container"]}>
                        <label htmlFor="username" className={styles["form__input-label"]}>Kullanıcı Adı</label>
                        <input type="text" className={styles["form__input"]} placeholder="Kullanıcı adınız" id="username" />
                    </div>
                    <div className={styles["form__input-container"]}>
                        <label htmlFor="email" className={styles["form__input-label"]}>Email</label>
                        <input type="email" className={styles["form__input"]} placeholder="Email adresiniz" id="email" />
                    </div>
                    <div className={styles["form__input-container"]}>
                        <label htmlFor="password" className={styles["form__input-label"]}>Şifre</label>
                        <input type="password" className={styles["form__input"]} placeholder="Şifreniz" id="password" />
                    </div>
                    <div className={styles["form__input-container"]}>
                        <label htmlFor="password_confirm" className={styles["form__input-label"]}>Şifre Tekrar</label>
                        <input type="password" className={styles["form__input"]} placeholder="Şifrenizin tekrarı" id="password_confirm" />
                    </div>
              </div>
                <button className={styles["form__button"]} type="submit" class="button">Kayıt Olun</button>
            </form>
            <div className={styles["or__container"]}>
                <span>Ya da</span>
            </div>
            <div className={styles["google-signin"]}>
                <button>Google ile kayıt olun</button>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage