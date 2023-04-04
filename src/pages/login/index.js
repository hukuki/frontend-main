import styles from "./LoginPage.module.css"
import { useFormik } from "formik"
import { Spinner } from "../../components/base/Spinner"
import { LoginSchema } from "../../form-schemas"
import { useRef, useState } from "react"
import useAuthContext from "../../context/AuthContextProvider"
import { useRouter } from "next/router"
import {
    Progress,
    AlertDialog,
    useDisclosure,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogFooter,
    Button
 } from '@chakra-ui/react'

function LoginPage() {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const { signInWithGoogle, signInWithEmailAndPasswordFirebase } = useAuthContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [alertMessage, setAlertMessage] = useState(null)
    const cancelRef = useRef()
    const router = useRouter()


    const handleDirectRegisterPage = () => {
        router.push("/register")
    }

    const handleGoogleLogin = async () => {
        setIsSubmitting(true)
        try {
            const { error, user } = await signInWithGoogle(null)
            console.log(error)
            setIsSubmitting(false)
            if (error) {
                // TODO: Show a toast message
                console.log(error)
                setAlertMessage(error.message)
                onOpen()
            }
        } catch (err) {
            setIsSubmitting(false)
            setAlertMessage(err.message)
            onOpen()
            console.log(err)
        }
    }

    const handleLogin = async (values, actions) => {
        setIsSubmitting(true)
        try {
            const { email, password } = values
            const { error, user } = await signInWithEmailAndPasswordFirebase({email, password}, "/search")
            setIsSubmitting(false)
            if (error) {
                // TODO: Show a toast message
                console.log(error)
                setAlertMessage(error.message)
                onOpen()
            } else  {
                actions.resetForm()
            }
        } catch (err) {
            console.log(err)
            setAlertMessage(err.message)
            onOpen()
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
    <>
    <AlertDialog
     isOpen={isOpen}
     isCentered={true}
     leastDestructiveRef={cancelRef}
     onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='3rem' fontWeight='600'>
              Hata
            </AlertDialogHeader>
            <AlertDialogBody fontSize="2rem">
                {alertMessage}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button borderRadius="1.2rem" fontSize="2.5rem" fontFamily="Poppins, sans-serif" py="2.5rem" px="1.5rem" ref={cancelRef} onClick={onClose}>
                Geri
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
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
                    <div className={`${styles["form__input-container"]} ${errors.email && touched.email && styles["form__input-container-error"]}`}>
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
                    <div className={`${styles["form__input-container"]} ${errors.password && touched.password && styles["form__input-container-error"]}`}>
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
                    <p className={styles["form__prompt-register"]}>Hesabınız yok mu? <span onClick={handleDirectRegisterPage} className={styles["form__register-cta"]}>Hesap oluşturun</span></p>
              </div>
              {isSubmitting ?
                    <Progress
                    isIndeterminate
                    height="1rem"
                    width="100%"
                    marginBottom="2rem"
                    />
              : <button
                disabled={isSubmitting}
                className={`${styles["form__button"]} button`}
                type="submit">
                    {isSubmitting ? <Spinner /> : "Giriş Yapın"}
                </button>
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
                /> :
            <div className={styles["google-signin"]}>
                <button onClick={() => handleGoogleLogin()}>Google ile giriş yapın</button>
            </div>
            }
        </div>
    </div>
    </>
  )
}

export default LoginPage