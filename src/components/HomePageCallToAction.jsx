import { Button } from './Button';
import Image from 'next/image';
import { Container } from './Container';

import backgroundImage from '@/images/background-call-to-action.jpg';

function HomePageCallToAction() {
  return (
    <section id="request-a-demo" className="relative overflow-hidden bg-white py-32">
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="tracking-tight font-display text-3xl sm:text-4xl text-blue-500">Request a demo</h1>
          <p className="tracking-tight text-lg mt-4 text-blue-900">
            You can start using DeepLex today. It's time to organize your workflow and work smarter, not harder
          </p>
          <Button href="/" className="mt-10">
            Request demo
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default HomePageCallToAction;
