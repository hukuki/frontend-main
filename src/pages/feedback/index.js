import { Fragment, useMemo, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import Image from 'next/image';
import backgroundImage from '../../images/background-auth.jpg';
import { Button } from '@/components/Button';
import { useFormik } from 'formik';
import clsx from 'clsx';
import { FeedbackSchema } from '@/form-schemas';
import { Listbox, Transition } from '@headlessui/react';
import { FaAngleDown, FaCheck } from 'react-icons/fa';

const categories = [
  { id: 1, category: 'general', displayName: 'Genel', unavailable: false },
  { id: 2, category: 'bug', displayName: 'Sorun bildirme', unavailable: false },
  { id: 3, category: 'feature-request', displayName: 'Talep', unavailable: false },
];

function CategoryListbox({ selected, setSelected }) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div>
        <Listbox.Button className="flex items-center justify-start w-full cursor-default rounded-md bg-zinc-100 px-4 py-3 text-sm focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2">
          <span className="text-slate-500 block truncate mr-3">{selected ? selected.displayName : 'Konu seçiniz'}</span>
          <span className="text-slate-500">
            <FaAngleDown />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-in duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-zinc-100 py-1 ring-1 ring-black ring-opacity-5 text-sm focus:outline-none">
            {categories.map((c) => (
              <Listbox.Option
                key={c.id}
                value={c}
                disabled={c.unavailable}
                className={({ active }) =>
                  clsx('relative cursor-default select-none py-2 pl-10 pr-4', active ? 'bg-white text-slate-600' : 'bg-zinc-100 text-slate-500')
                }
              >
                {({ selected }) => (
                  <>
                    <span className={clsx('block truncate', selected ? 'font-medium' : 'font-normal')}>{c.displayName}</span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaCheck className="h-3 w-3" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

function FeedbackPage() {
  const handleFeedbackSubmit = () => {
    console.log(values);
    console.log(topic);
  };

  const [topic, setTopic] = useState(null);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      message: '',
    },
    validationSchema: FeedbackSchema,
    onSubmit: handleFeedbackSubmit,
  });

  const isAnyErrors = useMemo(() => {
    return (
      !touched.firstname ||
      errors.firstname ||
      !touched.lastname ||
      errors.lastname ||
      !touched.email ||
      errors.email ||
      !touched.message ||
      errors.message
    );
  }, [errors, touched]);

  return (
    <div className="relative flex min-h-full justify-center md:px-12 lg:px-0">
      <div className="z-50 flex-1 min-h-screen flex justify-center items-center">
        <div className="bg-transparent sm:bg-white p-4 sm:rounded-lg flex flex-col gap-6">
          <div className="flex flex-col items-start justify-center gap-4">
            <h3 className="font-semibold tracking-tight text-4xl lg:text-5xl">Geri bildiriminiz bizim için çok değerli</h3>
            <p className="font-semibold text-sm">Geri bildirim vererek ürünün gelişmesine yardımcı olabilirsiniz</p>
          </div>
          <form action="" className="w-full flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="off">
            <div className="w-full flex flex-row gap-4 items-start">
              <div className="w-full">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="İsminiz"
                  value={values.firstname}
                  className={clsx(
                    'block text-sm outline-none w-full appearance-none rounded-md placeholder:font-bold bg-zinc-100 px-4 py-3 text-gray-900 focus:outline-none sm:text-sm',
                    errors.firstname && touched.firstname && 'border-red-200 placeholder-red-400'
                  )}
                />
                <p className={clsx('', errors.firstname && touched.firstname ? 'ml-3 mt-2 block text-sm font-semibold text-red-400' : 'hidden')}>
                  {errors.firstname}
                </p>
              </div>
              <div className="w-full">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Soyisminiz"
                  value={values.lastname}
                  className={clsx(
                    'block text-sm outline-none w-full appearance-none rounded-md placeholder:font-bold bg-zinc-100 px-4 py-3 text-gray-900 focus:outline-none sm:text-sm',
                    errors.lastname && touched.lastname && 'border-red-200 placeholder-red-400'
                  )}
                />
                <p className={clsx('', errors.lastname && touched.lastname ? 'ml-3 mt-2 block text-sm font-semibold text-red-400' : 'hidden')}>
                  {errors.lastname}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-full gap-4 flex items-start justify-center">
                <div className="w-full">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email adresiniz"
                    value={values.email}
                    className={clsx(
                      'block text-sm outline-none w-full appearance-none rounded-md placeholder:font-bold bg-zinc-100 px-4 py-3 text-gray-900 focus:outline-none sm:text-sm',
                      errors.email && touched.email && 'border-red-200 placeholder-red-400'
                    )}
                  />
                  <p className={clsx('', errors.email && touched.email ? 'ml-3 mt-2 block text-sm font-semibold text-red-400' : 'hidden')}>
                    {errors.email}
                  </p>
                </div>
                <div className="w-full">
                  <CategoryListbox selected={topic} setSelected={setTopic} />
                </div>
              </div>
              <div className="w-full">
                <textarea
                  className={clsx(
                    'block text-sm outline-none w-full h-44 appearance-none rounded-md placeholder:font-bold bg-zinc-100 px-4 py-3 text-gray-900 focus:outline-none sm:text-sm',
                    errors.message && touched.message && 'border-red-200 placeholder-red-400'
                  )}
                  name="message"
                  id="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Mesajınız"
                />
                <p className={clsx('', errors.message && touched.message ? 'ml-3 mt-2 block text-sm font-semibold text-red-400' : 'hidden')}>
                  {errors.message}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                disabled={isAnyErrors}
                className={clsx(
                  'w-full rounded-lg mt-2 group inline-flex items-center justify-center py-2 px-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
                  isAnyErrors
                    ? 'bg-blue-200 text-white/90 hover:bg-blue-200 cursor-default'
                    : 'bg-blue-600 cursor-pointer text-white hover:bg-blue-500 hover:text-slate-100 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600'
                )}
              >
                <span className="text-lg">
                  Gönder <span>&rarr;</span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="min-h-full hidden sm:contents lg:relative lg:block lg:flex-1">
        <Image src={backgroundImage} alt="" className="absolute h-screen w-full inset-0 object-cover" unoptimized />
      </div>
    </div>
  );
}

FeedbackPage.getLayout = function getLayout(page) {
  return (
    <div className="flex flex-col min-w-screen min-h-screen max-h-screen overflow-hidden">
      <div className="min-w-screen max-h-fit">
        <Navbar />
      </div>
      <div className="grow min-h-full min-w-full">{page}</div>
    </div>
  );
};

export default FeedbackPage;
