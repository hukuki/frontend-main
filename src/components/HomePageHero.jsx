import { Button } from './Button';
import { Container } from './Container';

function Hero() {
  return (
    <Container className="pt-20 pb-16 text-center lg:pt-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Daily<span className="text-blue-600"> document </span>
        search{' '}
        <p>
          made <span className="text-violet-500">easy!</span>
        </p>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Most document search tools are slow and inaccurate. We bring the power of AI to document search to make your life easier.
      </p>
      <div className="mt-10 flex justify-center space-x-6">
        <Button color="slate" className="" href="/search">
          Try DeepLex
        </Button>
        <Button variant="outline" color="blue">
          <svg aria-hidden="true" className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current">
            <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
          </svg>
          <span className="ml-3">Watch demo</span>
        </Button>
      </div>
      <div className="mt-36 lg:mt-44">
        <p className="flex justify-center text-base text-slate-900">Trusted by industry leaders</p>
      </div>
    </Container>
  );
}

export default Hero;
