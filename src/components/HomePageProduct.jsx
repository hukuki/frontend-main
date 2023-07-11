import { HiShieldCheck, HiTranslate, HiUserGroup } from 'react-icons/hi';
import { Container } from './Container';
import { Tab } from '@headlessui/react';
import { useId } from 'react';
import clsx from 'clsx';

const features = [
  {
    title: 'Semantic Search',
    description:
      'DeepLex retrieves documents relevant documents from the database of documents and user-uploaded files without requiring using the exact words in the document. That way, it helps workers save precious time of legal workers.',
    icon: function SemanticSearchIcon() {
      let id = useId();
      return (
        <div id={id}>
          <HiTranslate className="h-16 w-16 text-blue-600" />
        </div>
      );
    },
  },
  {
    title: 'Secure',
    description:
      'No data is shared with any external third parties. User uploaded files are encrypted and preserved for each client separately, protecting the privacy of client and enterprise information. DeepLex runs on secure clouds, respecting the privacy and value of each firm.',
    icon: function SecureIcon() {
      let id = useId();
      return (
        <div id={id}>
          <HiShieldCheck className="h-16 w-16 text-blue-600" />
        </div>
      );
    },
  },
  {
    title: 'All-in-one Solution',
    description:
      'DeepLex solved the problem of needing multiple separate tools to manage your documents. With our all-in-one solution, you can manage your projects in one place with the flexibility of sharing with those you work together, or keep it private. With DeepLex, legal work is as easy as logging in to our platform.',
    icon: function AllInOneSolutionIcon() {
      let id = useId();
      return (
        <div id={id}>
          <HiUserGroup className="h-16 w-16 text-blue-600" />
        </div>
      );
    },
  },
];

function HomePageProduct() {
  return (
    <section id="product" className="pt-20 pb-14 sm:pb-20 sm:pt-32 lg:pb-32">
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display tracking-tight text-3xl text-slate-900 sm:text-4xl">Simplify your everyday business routine</h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Work with smart tools to work smarter, not harder. Save valuable time and money by delegating repetitive task to the power of AI
          </p>
        </div>
        <div className="-mx-4 mt-20 space-y-12 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
          {features.map((feature, index) => (
            <div className="mx-auto max-w-2xl">
              <div className="w-12">
                <feature.icon />
              </div>
              <h3 className="mt-2 font-display text-xl text-blue-600">{feature.title}</h3>
              <p className="mt-2 font-display text-xl text-slate-900">{feature.description}</p>
            </div>
          ))}
        </div>
        <Tab.Group as="div" className="hidden lg:mt-20 lg:block">
          {({ selectedIndex }) => (
            <>
              <Tab.List className="grid grid-cols-3 gap-x-8">
                {features.map((feature, index) => (
                  <div key={feature.title} className="flex flex-col gap-y-4">
                    <div className="w-12">
                      <feature.icon />
                    </div>
                    <h3 className="text-xl font-medium text-blue-600">{feature.title}</h3>
                    <p className="text-lg text-slate-600">{feature.description}</p>
                  </div>
                ))}
              </Tab.List>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}

export default HomePageProduct;
