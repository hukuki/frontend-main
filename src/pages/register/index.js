import { useFormik } from 'formik';
import { RegistrationSchema } from '../../form-schemas';
import { useRef, useState, useMemo, useEffect } from 'react';
import useAuthContext from '../../context/AuthContextProvider';
import { Button } from '../../components/Button';
import LoginRegisterLayout from '../../components/LoginRegisterLayout';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Logo } from '../../components/Logo';
import clsx from 'clsx';
import { Progress } from '@chakra-ui/react';
function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUpWithGoogle, signUpWithEmailAndPassword } = useAuthContext();
  const [alertMessage, setAlertMessage] = useState('');
  const router = useRouter();

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
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegistrationSchema,
    onSubmit: handleRegistration,
  });

  const isAnyErrors = useMemo(() => {
    return (
      !touched.firstname ||
      errors.firstname ||
      !touched.lastname ||
      errors.lastname ||
      !touched.email ||
      errors.email ||
      !touched.password ||
      errors.password ||
      !touched.confirmPassword ||
      errors.confirmPassword
    );
  });

  return (
    <>
      <Head>
        <title>casevisor | Kaydolun</title>
      </Head>
      <LoginRegisterLayout>
        <div className="flex flex-col">
          <Link href="/">
            <Logo
            // className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-900 lowercase font-display text-3xl md:text-4xl" 
            />
          </Link>
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-gray-900">Yeni bir hesap oluşturun.</h2>
            <p className="mt-2 text-sm text-gray-700">
              Zaten bir hesabınız var mı?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:underline">
                Giriş yapın  
              </Link>{' '}
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
                Adınız
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
                placeholder="Lütfen adınızı girin."
                id="firstname"
                name="firstname"
              />
              <p className={clsx('', errors.firstname && touched.firstname ? 'mt-2 block text-sm font-semibold text-red-400' : 'hidden')}>
                Lütfen doğru bir ad girin.
              </p>
            </div>
            <div className="sm:mb-0 mb-3">
              <label
                htmlFor="lastname"
                className={clsx('text-sm font-medium', errors.lastname && touched.lastname ? 'text-red-700' : 'text-gray-700')}
              >
                Soyadınız
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
                placeholder="Lütfen soyadınızı girin."
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
              placeholder="Lütfen email adresinizi girin."
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
              placeholder="Lütfen şifrenizi girin."
              id="password"
              name="password"
            />
            <p className={clsx('', errors.password && touched.password ? 'mt-2 block text-sm font-semibold text-red-400' : 'hidden')}>
        Geçerli bir şifre en az 8 karakter, en fazla 32 karakter ve en az 1 rakam, 1 küçük harf, 1 büyük harf ve 1 özel karakterden oluşmalıdır.
            </p>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className={clsx('mb-3 block text-sm font-medium', errors.password && touched.password ? 'text-red-700' : 'text-gray-700')}
            >
              Şifrenizi Tekrar Girin
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
              placeholder="Lütfen şifrenizi tekrar girin."
              id="confirmPassword"
              name="confirmPassword"
            />
            <p className={clsx('', errors.confirmPassword && touched.confirmPassword ? 'mt-2 block text-sm font-semibold text-red-400' : 'hidden')}>
              Şifreleriniz eşleşmiyor.
            </p>
          </div>
          {isSubmitting ? (
            <Progress isIndeterminate height="0.2rem" width="100%" marginTop="2rem" />
          ) : (
            <div>
              <button
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
          <div className="sm:mb-0 mt-4">
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className={clsx('w-full rounded-lg text-xl font-[200] bg-blue-500')}
              onClick={handleGoogleSignup}
            >
              <span>Google ile giriş yapın</span>
            </Button>
          </div>
        )}
      </LoginRegisterLayout>
    </>
  );
}

export default RegisterPage;
