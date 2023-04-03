import styles from "./LoginPage.module.css"
import { useFormik } from "formik"
import { Spinner } from "../../components/base/Spinner"
import { LoginSchema } from "../../form-schemas"
import { useRouter } from "next/router"
import { auth, googleAuthProvider } from "../../utils/firebase/firebase"
import { signInWithPopup } from "firebase/auth"
import { useState } from "react"

function LoginPage() {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleGoogleLogin = async () => {
        setIsSubmitting(true)
        try {
            const res = await signInWithPopup(auth, googleAuthProvider)
            const registerRes = await fetch("/api/google-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(res)
            })
            const data = await registerRes.json()
        } catch (err) {
            // TODO: Show a toast message for error
            console.log(err)
            setIsSubmitting(false)
        }
    }

    const handleLogin = async (values, actions) => {
        setIsSubmitting(true)
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setIsSubmitting(false)
            actions.resetForm()
        } catch (err) {
            // TODO: Show an error toast message
            console.log(err)
            setIsSubmitting(false)
        }
    }

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: handleLogin
    })

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
            <form action="" className={styles["login__form"]} onSubmit={handleSubmit} autoComplete="off">
                <div className={styles["form__input-area"]}>
                    <div className={styles["form__input-container"]}>
                        <label
                        className={`${styles["form__input-label"]} ${errors.email && touched.email && styles["form__input-label-error"]}`}
                        htmlFor="email"
                        >E-posta</label>
                        <input
                        className={`${styles["form__input"]} ${errors.email && touched.email && styles["form__input-error"]}`}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        placeholder="Email adresinizi veya kullanıcı adınızı giriniz"
                        id="email" />
                        {errors.email && touched.email && <p className={styles["form__input-error-p"]}>{errors.email}</p>}
                    </div>
                    <div className={styles["form__input-container"]}>
                        <label
                        htmlFor="password"
                        className={`${styles["form__input-label"]} ${errors.password && touched.password && styles["form__input-label-error"]}`}>
                            Şifre
                            </label>
                        <input
                        className={`${styles["form__input"]} ${errors.password && touched.password && styles["form__input-error"]}`}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        placeholder="Şifrenizi giriniz"
                        id="password" />
                        {errors.password && touched.password && <p className={styles["form__input-error-p"]}>{errors.password}</p>}
                    </div>
              </div>
                <button
                disabled={isSubmitting}
                className={`${styles["form__button"]} button`}
                type="submit">
                    {isSubmitting ? <Spinner /> : "Giriş Yapın"}
                </button>
            </form>
            <div className={styles["or__container"]}>
                <span>Ya da</span>
            </div>
            <div className={styles["google-signin"]}>
                <button onClick={() => handleGoogleLogin()}>Google ile giriş yapın</button>
            </div>
        </div>
    </div>
  )
}

export default LoginPage