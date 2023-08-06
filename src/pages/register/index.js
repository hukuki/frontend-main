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
        <title>casevisor | Register</title>
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
                  Sign in <span>&rarr;</span>
                </span>
              </button>
            </div>
          )}
        </form>

        <div className="mt-4 flex gap-x-2 items-center">
          <div className="flex-1 h-0.5 bg-violet-500"></div>
          <span className="text-lg text-blue-700">OR</span>
          <div className="flex-1 h-0.5 bg-violet-500"></div>
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
              <span>Sign up with Google</span>
            </Button>
          </div>
        )}
      </LoginRegisterLayout>
    </>
  );
}

export default RegisterPage;
