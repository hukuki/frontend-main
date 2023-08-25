import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useMemo } from 'react';
import useAuthContext from '../../context/AuthContextProvider';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { LoginSchema } from '../../form-schemas/index';
import { Logo } from '../../components/Logo';
import clsx from 'clsx';
import LoginLayout from '../../components/LoginRegisterLayout';
import { Button } from '../../components/Button';
import { Progress } from '@chakra-ui/react';
import { convertFirebaseErrorCodeToMessage } from '../../utils/alerts/convert_firebase_error';

function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signInWithGoogle, signInWithEmailAndPasswordFirebase } = useAuthContext();
  const [alertMessage, setAlertMessage] = useState(null);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      const { error, _ } = await signInWithGoogle(null);
      setIsSubmitting(false);
      if (error) {
        const message = convertFirebaseErrorCodeToMessage(error.code);
        setAlertMessage(message);
      } else {
        router.push('/search');
      }
    } catch (err) {
      setAlertMessage('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz');
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (values, actions) => {
    setIsSubmitting(true);
    try {
      const { email, password } = values;
      const { error, _ } = await signInWithEmailAndPasswordFirebase({ email, password }, '/search');
      setIsSubmitting(false);
      if (error) {
        const message = convertFirebaseErrorCodeToMessage(error.code);
        setAlertMessage(message);
      } else {
        actions.resetForm();
        router.push('/search');
      }
    } catch (err) {
      setAlertMessage('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz');
      setIsSubmitting(false);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: handleLogin,
  });

  const isAnyErrors = useMemo(() => {
    return !touched.email || errors.email || !touched.password || errors.password;
  }, [errors, touched]);

  return (
    <>
      <Head>
        <title>Giriş Yap - casevisor</title>
      </Head>
      <LoginLayout>
        <div className="flex flex-col">
          <Link href="/">
            <Logo
            //className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-900 lowercase font-display text-3xl md:text-4xl"
            />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">Hesabınıza giriş yapın.</h2>
            <p className="mt-2 text-sm text-gray-700">
              Hesabınız yok mu?{' '}
              <Link href="/register" className="font-medium text-blue-600 hover:underline">
                Kaydolun
              </Link>{' '}
            </p>
          </div>
          {alertMessage && (
            <div className="mt-2">
              <span className="text-red-400 font-semibold text-md">{alertMessage}</span>
            </div>
          )}
        </div>
        <form action="" className="mt-4 grid grid-cols-1 gap-y-8" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label
              htmlFor="email"
              className={clsx('mb-3 block text-sm font-medium', errors.email && touched.email ? 'text-red-700' : 'text-gray-700')}
            >
              Email Adresiniz
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
              placeholder="Email adresinizi girin."
              id="email"
              name="email"
            />
            <p className={clsx('', errors.email && touched.email ? 'mt-2 block text-sm font-semibold text-red-400' : 'hidden')}>
              Lütfen doğru bir email adresi girin.
            </p>
          </div>
          <div>
            <label
              htmlFor="password"
              className={clsx('mb-3 block text-sm font-medium', errors.password && touched.password ? 'text-red-700' : 'text-gray-700')}
            >
              Şifreniz
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
              placeholder="Şifrenizi girin"
              id="password"
              name="password"
            />
            <p className={clsx('', errors.password && touched.password ? 'mt-2 block text-sm font-semibold text-red-400' : 'hidden')}>
              Lütfen şifrenizi girin.
            </p>
          </div>
          {isSubmitting ? (
            <Progress isIndeterminate height=".2rem" width="100%" marginTop="2rem" />
          ) : (
            <div>
              <button
                type="submit"
                disabled={isAnyErrors}
                className={clsx(
                  'w-full rounded-lg mt-2 group inline-flex items-center justify-center py-2 px-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
                  isAnyErrors
                    ? 'bg-blue-200 text-white/90 hover:bg-blue-200 cursor-default'
                    : 'bg-blue-600 cursor-pointer text-white hover:bg-blue-500 hover:text-slate-100 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600'
                )}
              >
                <span className="text-lg">
                  Giriş Yapın <span>&rarr;</span>
                </span>
              </button>
            </div>
          )}
        </form>

        <div className="mt-4 flex gap-x-2 items-center">
          <div className="flex-1 h-px bg-blue-200"></div>
          <span className="text-lg text-blue-700">veya</span>
          <div className="flex-1 h-px bg-blue-200"></div>
        </div>
        {isSubmitting ? (
          <Progress isIndeterminate height=".2rem" width="100%" marginTop="2rem" />
        ) : (
          <div className="mt-4">
            <Button onClick={() => handleGoogleLogin()} variant="solid" color="blue" className="w-full text-xl rounded-lg">
              <span>Google ile Giriş Yapın</span>
            </Button>
          </div>
        )}
      </LoginLayout>
    </>
  );
}

export default LoginPage;
