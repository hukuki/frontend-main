import styles from "./LoginPage.module.css"

import { useFormik } from "formik"

import { Spinner } from "../../components/base/Spinner"

import { LoginSchema } from "../../form-schemas"

function LoginPage() {

    const handleLogin = async (values, actions) => {
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
        const data = await res.json();
        console.log(data)
        actions.setSubmitting(false);
        actions.resetForm()
    }

    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
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
                        <label for="password" className={styles["form__input-label"]}>Şifre</label>
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
                <button>Google ile giriş yapın</button>
            </div>
        </div>
    </div>
  )
}

export default LoginPage