import styles from "./RegisterPage.module.css"
import { useFormik } from "formik";
import { RegistrationSchema } from "../../form-schemas"
import { useState } from "react"
import useAuthContext from "../../context/AuthContextProvider";
import { Progress } from '@chakra-ui/react'
import { useRouter } from "next/router";

function RegisterPage() {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const { signUpWithGoogle, signUpWithEmailAndPassword } = useAuthContext()
    const router = useRouter()

    const handleDirectLoginPage = () =>  {
        router.push("/login")
    }

    const handleGoogleSignup = async () => {
        setIsSubmitting(true)
        try {
            const { error, user } = await signUpWithGoogle("/search")
            setIsSubmitting(false)
            if (error) {
                // TODO: Show a toast message
                console.log(error)
            } else {
                actions.resetForm()
            }
        } catch(err) {
            setIsSubmitting(false)
            console.log(err)
        }
    }

    const handleRegistration = async (values, actions) => {
        setIsSubmitting(true)
        try {
            const { email, password } = values;
            const { error, user } = await signUpWithEmailAndPassword({email, password}, "/search")
            setIsSubmitting(false)
            if (error) {
                // TODO: Show a toast message
                console.log(error)
            } else {
                actions.resetForm()
            }
        } catch (err) {
            setIsSubmitting(false)
            console.log(err)
        }
    }

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: RegistrationSchema,
        onSubmit: handleRegistration
    })

  return (
  <>
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
            <form action="" className={styles["login__form"]} onSubmit={handleSubmit}>
                <div className={styles["form__input-area"]}>
                    <div className={styles["form__input-names-container"]}>
                        <div className={styles["form__input-container"]}>
                            <label htmlFor="firstname"
                            className={`${styles["form__name-input-label"]} ${errors.firstname && touched.firstname && styles["form__input-label-error"]}`}
                            >İsim</label>
                            <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstname}
                            type="text"
                            className={`${styles["form__input-name"]} ${errors.firstname && touched.firstname && styles["form__input-error"]}`}
                            placeholder="İsminiz"
                            id="firstname" />
                            {errors.firstname && touched.firstname && <p className={styles["form__name-input-error-p"]}>{errors.firstname}</p>}
                        </div>
                        <div className={styles["form__input-container"]}>
                            <label htmlFor="lastname"
                            className={`${styles["form__name-input-label"]} ${errors.lastname && touched.lastname && styles["form__input-label-error"]}`}
                            >Soyisim</label>
                            <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastname}
                            type="text"
                            className={`${styles["form__input-name"]} ${errors.lastname && touched.lastname && styles["form__input-error"]}`}
                            placeholder="Soyisminiz"
                            id="lastname" />
                            {errors.lastname && touched.lastname && <p className={styles["form__name-input-error-p"]}>{errors.lastname}</p>}
                        </div>
                    </div>
                    <div className={styles["form__input-container"]}>
                        <label htmlFor="username"
                        className={`${styles["form__input-label"]} ${errors.username && touched.username && styles["form__input-label-error"]}`}
                        >Kullanıcı Adı</label>
                        <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        type="text"
                        className={`${styles["form__input"]} ${errors.username && touched.username && styles["form__input-error"]}`}
                        placeholder="Kullanıcı adınız"
                        id="username" />
                        {errors.username && touched.username && <p className={styles["form__input-error-p"]}>{errors.username}</p>}
                    </div>
                    <div className={styles["form__input-container"]}>
                        <label htmlFor="email"
                        className={`${styles["form__input-label"]} ${errors.email && touched.email && styles["form__input-label-error"]}`}
                        >Email</label>
                        <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        type="email"
                        className={`${styles["form__input"]} ${errors.email && touched.email && styles["form__input-error"]}`}
                        placeholder="Email adresiniz"
                        id="email"/>
                        {errors.email && touched.email && <p className={styles["form__input-error-p"]}>{errors.email}</p>}
                    </div>
                    <div className={`${styles["form__input-container"]} ${errors.password && touched.password && styles["password__error"]}`}>
                        <label htmlFor="password"
                        className={`${styles["form__input-label"]} ${errors.password && touched.password && styles["form__input-label-error"]}`}
                        >Şifre</label>
                        <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        type="password"
                        className={`${styles["form__input"]} ${errors.password && touched.password && styles["form__input-error"]}`}
                        placeholder="Şifreniz"
                        id="password" />
                        {errors.password && touched.password && <p className={styles["form__input-error-p"]}>{errors.password}</p>}
                    </div>
                    <div className={`${styles["form__input-container"]} `}>
                        <label htmlFor="confirmPassword"
                        className={`${styles["form__input-label"]} ${errors.confirmPassword && touched.confirmPassword && styles["form__input-label-error"]}`}
                        >Şifre Tekrar</label>
                        <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        type="password"
                        className={`${styles["form__input"]} ${errors.confirmPassword && touched.confirmPassword && styles["form__input-error"]}`}
                        placeholder="Şifrenizin tekrarı"
                        id="confirmPassword" />
                        {errors.confirmPassword && touched.confirmPassword && <p className={styles["form__input-error-p"]}>{errors.confirmPassword}</p>}
                    </div>
                    <p className={styles["form__prompt-login"]}>Zaten bir hesabınız var mı? <button onClick={handleDirectLoginPage} className={styles["form__login-cta"]}>Giriş yapın</button></p>
              </div>
              {isSubmitting ?
                    <Progress
                    isIndeterminate
                    height="1rem"
                    width="100%"
                    marginBottom="2rem"
                    />
                :
                <button disabled={isSubmitting} className={styles["form__button"]} type="submit">
                    Kayıt Olun</button>
                }
            </form>
            <div className={styles["or__container"]}>
                <span>Ya da</span>
            </div>
            {isSubmitting ?
                    <Progress
                    isIndeterminate
                    height="1rem"
                    width= "60%"
                    marginBottom="2rem"
                    />
                :
            <div className={styles["google-signin"]}>
                <button onClick={() => handleGoogleSignup()}>Google ile kayıt olun</button>
            </div>
            }
        </div>
    </div>
    </>)
}

export default RegisterPage