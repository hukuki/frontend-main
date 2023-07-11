import Image from 'next/image';
import backgroundImage from '../images/background-auth.jpg';

function LoginRegisterLayout({ children }) {
  return (
    <>
      <div className="relative flex min-h-full justify-center md:px-12 lg:px-0">
        <div className="relative z-10 h-screen flex flex-1 flex-col bg-white py-10 px-4 shdow-2xl sm:justify-center md:flex-none md:px-28">
          <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">{children}</div>
        </div>
        <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
          <Image src={backgroundImage} alt="" className="absolute h-screen w-full inset-0 object-cover" unoptimized />
        </div>
      </div>
    </>
  );
}

export default LoginRegisterLayout;
