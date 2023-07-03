import styles from './RegisterPage.module.css';
import { useFormik } from 'formik';
import { RegistrationSchema } from '../../form-schemas';
import { useRef, useState } from 'react';
import useAuthContext from '../../context/AuthContextProvider';
import { Button } from '../../components/Button';
import LoginRegisterLayout from '../../components/LoginRegisterLayout';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Logo } from '../../components/Logo';
import clsx from 'clsx';

function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUpWithGoogle, signUpWithEmailAndPassword } = useAuthContext();
  const [alertMessage, setAlertMessage] = useState('');
  const cancelRef = useRef();

  const router = useRouter();

  const handleDirectLoginPage = () => {
    router.push('/login');
  };

  const handleGoogleSignup = async () => {
    setIsSubmitting(true);
    try {
      const { error, user } = await signUpWithGoogle('/search');
      setIsSubmitting(false);
      if (error) {
        // TODO: Show a toast message
        const message = convertFirebaseErrorCodeToMessage(error.code);
        setAlertMessage(message);
        onOpen();
        console.log(error);
      } else {
        router.push('/search');
      }
    } catch (err) {
      setIsSubmitting(false);
      const message = convertFirebaseErrorCodeToMessage(error.code);
      setAlertMessage(message);
      onOpen();
      console.log(err);
    }
  };

  const handleRegistration = async (values, actions) => {
    setIsSubmitting(true);
    try {
      const { email, password } = values;
      const { error, user } = await signUpWithEmailAndPassword({ email, password }, '/search');
      setIsSubmitting(false);
      if (error) {
        // TODO: Show a toast message
        const message = convertFirebaseErrorCodeToMessage(error.code);
        setAlertMessage(message);
        onOpen();
        console.log(error);
      } else {
        actions.resetForm();
        router.push('/search');
      }
    } catch (err) {
      setIsSubmitting(false);
      const message = convertFirebaseErrorCodeToMessage(error.code);
      setAlertMessage(message);
      onOpen();
      console.log(err);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegistrationSchema,
    onSubmit: handleRegistration,
  });

  return (
    <>
      <Head>
        <title>DeepLex | Register</title>
      </Head>
      <LoginRegisterLayout>
        <div className="flex flex-col">
          <Link href="/">
            <Logo className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-900 lowercase font-display text-3xl md:text-4xl" />
          </Link>
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-gray-900">Sign up for a free account</h2>
            <p className="mt-2 text-sm text-gray-700">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:underline">
                Sign in
              </Link>{' '}
              to your account.
            </p>
          </div>
        </div>
        <form action="" className="mt-10 grid grid-cols-1 gap-y-4 sm:gap-y-6" onSubmit={handleRegistration} autoComplete="off">
          <div className="sm:flex sm:gap-x-4 sm:space-y-0 space-y-4 sm:mb-0">
            <div className="sm:mb-0 mb-3">
              <label
                htmlFor="firstname"
                className={clsx('text-sm font-medium', errors.firstname && touched.firstname ? 'text-red-700' : 'text-gray-700')}
              >
                First Name
              </label>
              <input
                className={clsx(
                  'w-full mt-3 appearance-none rounded-md border bg-gray-50 px-3 py-2 text-gray-900 focus:bg-white focus:outline-none sm:text-sm',
                  errors.firstname && touched.firstname
                    ? 'border-red-200 placeholder-red-400'
                    : 'focus:border-blue-500 focus:ring-blue-500 border-gray-200 placeholder-gray-400'
                )}
                value={values.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
                type="firstname"
                placeholder="Enter your first name"
                id="firstname"
                name="firstname"
              />
              <p className={clsx('', errors.firstname && touched.firstname ? 'mt-2 block text-sm font-semibold text-red-400' : 'hidden')}>
                Please enter a valid name
              </p>
            </div>
            <div className="sm:mb-0 mb-3">
              <label
                htmlFor="lastname"
                className={clsx('text-sm font-medium', errors.lastname && touched.lastname ? 'text-red-700' : 'text-gray-700')}
              >
                Last Name
              </label>
              <input
                className={clsx(
                  'w-full mt-3 appearance-none rounded-md border bg-gray-50 px-3 py-2 text-gray-900 focus:bg-white focus:outline-none sm:text-sm',
                  errors.lastname && touched.lastname
                    ? 'border-red-200 placeholder-red-400'
                    : 'focus:border-blue-500 focus:ring-blue-500 border-gray-200 placeholder-gray-400'
                )}
                value={values.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
                type="lastname"
                placeholder="Enter your last name"
                id="lastname"
                name="lastname"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className={clsx('mb-3 block text-sm font-medium', errors.email && touched.email ? 'text-red-700' : 'text-gray-700')}
            >
              Email Address
            </label>
            <input
              className={clsx(
                'block w-full appearance-none rounded-md border  bg-gray-50 px-3 py-2 text-gray-900 focus:bg-white focus:outline-none sm:text-sm',
                errors.email && touched.email
                  ? 'border-red-200 placeholder-red-400'
                  : 'focus:border-blue-500 focus:ring-blue-500 border-gray-200 placeholder-gray-400'
              )}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              placeholder="Enter your email address"
              id="email"
              name="email"
            />
            <p className={clsx('', errors.email && touched.email ? 'mt-2 block text-sm font-semibold text-red-400' : 'hidden')}>
              Please enter a valid email address
            </p>
          </div>
          <div>
            <label
              htmlFor="password"
              className={clsx('mb-3 block text-sm font-medium', errors.password && touched.password ? 'text-red-700' : 'text-gray-700')}
            >
              Password
            </label>
            <input
              className={clsx(
                'block w-full appearance-none rounded-md border  bg-gray-50 px-3 py-2 text-gray-900 focus:bg-white focus:outline-none sm:text-sm',
                errors.password && touched.password
                  ? 'border-red-200 placeholder-red-400'
                  : 'focus:border-blue-500 focus:ring-blue-500 border-gray-200 placeholder-gray-400'
              )}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
            />
            <p className={clsx('', errors.password && touched.password ? 'mt-2 block text-sm font-semibold text-red-400' : 'hidden')}>
              A valid password should be at least 8 characters and at most 32 characters with at least 1 digit, 1 lower case letter, 1 upper case
              letter and 1 special character.
            </p>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className={clsx('mb-3 block text-sm font-medium', errors.password && touched.password ? 'text-red-700' : 'text-gray-700')}
            >
              Confirm Password
            </label>
            <input
              className={clsx(
                'block w-full appearance-none rounded-md border  bg-gray-50 px-3 py-2 text-gray-900 focus:bg-white focus:outline-none sm:text-sm',
                errors.confirmPassword && touched.confirmPassword
                  ? 'border-red-200 placeholder-red-400'
                  : 'focus:border-blue-500 focus:ring-blue-500 border-gray-200 placeholder-gray-400'
              )}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              placeholder="Enter your password again"
              id="confirmPassword"
              name="confirmPassword"
            />
            <p className={clsx('', errors.confirmPassword && touched.confirmPassword ? 'mt-2 block text-sm font-semibold text-red-400' : 'hidden')}>
              Passwords do not match
            </p>
          </div>
          <div>
            <Button type="submit" variant="solid" color="blue" className="w-full rounded-lg text-xl font-[400] mt-4">
              <span>
                Sign up <span>&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
        <div className="mt-4 flex gap-x-2 items-center">
          <div className="flex-1 h-0.5 bg-blue-500"></div>
          <span className="text-lg text-blue-700">OR</span>
          <div className="flex-1 h-0.5 bg-blue-500"></div>
        </div>
        <div className="mt-4 sm:mb-0">
          <Button onClick={() => handleGoogleSignup()} variant="solid" color="blue" className="w-full text-xl rounded-lg font-[400]">
            <span>Sign up with Google</span>
          </Button>
        </div>
      </LoginRegisterLayout>
    </>
    /*
    <>
      <AlertDialog isOpen={isOpen} isCentered={true} leastDestructiveRef={cancelRef} onClose={onClose} size="xl">
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="3rem" fontWeight="600">
              Hata
            </AlertDialogHeader>
            <AlertDialogBody fontSize="2rem">{alertMessage}</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                borderRadius="1.2rem"
                fontSize="2.5rem"
                fontFamily="Poppins, sans-serif"
                py="2.5rem"
                px="1.5rem"
                ref={cancelRef}
                onClick={onClose}
              >
                Geri
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <div className={styles.container}>
        <div className={styles['hero__container']}>
          <div className={styles['hero__content']}>
            <h1 className={styles['hero__header']}>Lorem ipsum</h1>
            <p className={styles['hero__text']}>
              {' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, atque doloribus natus molestias facere, odit ullam corporis impedit,
              quo veritatis error voluptates voluptatem? Pariatur, magni fugit. Blanditiis qui temporibus dolores. Iusto, totam repudiandae? Vel,
              velit, dignissimos ab, nesciunt cumque aperiam repellat delectus enim tempora rem quae beatae assumenda. Quos, hic nostrum. Quo
              molestias quod tempora, quos illo voluptas dignissimos exercitationem?{' '}
            </p>
          </div>
        </div>
        <div className={styles['form__container']}>
          <h3 className={styles['form__header']}>Kayıt Olun</h3>
          <form action="" className={styles['login__form']} onSubmit={handleSubmit}>
            <div className={styles['form__input-area']}>
              <div className={styles['form__input-names-container']}>
                <div className={styles['form__input-container']}>
                  <label
                    htmlFor="firstname"
                    className={`${styles['form__name-input-label']} ${errors.firstname && touched.firstname && styles['form__input-label-error']}`}
                  >
                    İsim
                  </label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                    type="text"
                    className={`${styles['form__input-name']} ${errors.firstname && touched.firstname && styles['form__input-error']}`}
                    placeholder="İsminiz"
                    id="firstname"
                  />
                  {errors.firstname && touched.firstname && <p className={styles['form__name-input-error-p']}>{errors.firstname}</p>}
                </div>
                <div className={styles['form__input-container']}>
                  <label
                    htmlFor="lastname"
                    className={`${styles['form__name-input-label']} ${errors.lastname && touched.lastname && styles['form__input-label-error']}`}
                  >
                    Soyisim
                  </label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                    type="text"
                    className={`${styles['form__input-name']} ${errors.lastname && touched.lastname && styles['form__input-error']}`}
                    placeholder="Soyisminiz"
                    id="lastname"
                  />
                  {errors.lastname && touched.lastname && <p className={styles['form__name-input-error-p']}>{errors.lastname}</p>}
                </div>
              </div>
              <div className={styles['form__input-container']}>
                <label
                  htmlFor="username"
                  className={`${styles['form__input-label']} ${errors.username && touched.username && styles['form__input-label-error']}`}
                >
                  Kullanıcı Adı
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  type="text"
                  className={`${styles['form__input']} ${errors.username && touched.username && styles['form__input-error']}`}
                  placeholder="Kullanıcı adınız"
                  id="username"
                />
                {errors.username && touched.username && <p className={styles['form__input-error-p']}>{errors.username}</p>}
              </div>
              <div className={styles['form__input-container']}>
                <label
                  htmlFor="email"
                  className={`${styles['form__input-label']} ${errors.email && touched.email && styles['form__input-label-error']}`}
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="email"
                  className={`${styles['form__input']} ${errors.email && touched.email && styles['form__input-error']}`}
                  placeholder="Email adresiniz"
                  id="email"
                />
                {errors.email && touched.email && <p className={styles['form__input-error-p']}>{errors.email}</p>}
              </div>
              <div className={`${styles['form__input-container']} ${errors.password && touched.password && styles['password__error']}`}>
                <label
                  htmlFor="password"
                  className={`${styles['form__input-label']} ${errors.password && touched.password && styles['form__input-label-error']}`}
                >
                  Şifre
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                  className={`${styles['form__input']} ${errors.password && touched.password && styles['form__input-error']}`}
                  placeholder="Şifreniz"
                  id="password"
                />
                {errors.password && touched.password && <p className={styles['form__input-error-p']}>{errors.password}</p>}
              </div>
              <div className={`${styles['form__input-container']} `}>
                <label
                  htmlFor="confirmPassword"
                  className={`${styles['form__input-label']} ${
                    errors.confirmPassword && touched.confirmPassword && styles['form__input-label-error']
                  }`}
                >
                  Şifre Tekrar
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  type="password"
                  className={`${styles['form__input']} ${errors.confirmPassword && touched.confirmPassword && styles['form__input-error']}`}
                  placeholder="Şifrenizin tekrarı"
                  id="confirmPassword"
                />
                {errors.confirmPassword && touched.confirmPassword && <p className={styles['form__input-error-p']}>{errors.confirmPassword}</p>}
              </div>
              <p className={styles['form__prompt-login']}>
                Zaten bir hesabınız var mı?{' '}
                <span onClick={handleDirectLoginPage} className={styles['form__login-cta']}>
                  Giriş yapın
                </span>
              </p>
            </div>
            {isSubmitting ? (
              <Progress isIndeterminate height="1rem" width="100%" marginBottom="2rem" />
            ) : (
              <button disabled={isSubmitting} className={styles['form__button']} type="submit">
                Kayıt Olun
              </button>
            )}
          </form>
          <div className={styles['or__container']}>
            <span>Ya da</span>
          </div>
          {isSubmitting ? (
            <Progress isIndeterminate height="1rem" width="60%" marginBottom="2rem" />
          ) : (
            <div className={styles['google-signin']}>
              <button onClick={() => handleGoogleSignup()}>Google ile kayıt olun</button>
            </div>
          )}
        </div>
      </div>
    </>
    */
  );
}

export default RegisterPage;
