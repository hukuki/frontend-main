import HomePageFAQCard from './HomePageFAQCard';
import { Container } from './Container';
const questions = [
  {
    question: 'How can I store my documents?',
    answer:
      'Just by registering, you have access to a dashboard. There, you can upload your document to different project folders. Each folder is created privately. If you want, you can give your collegues access to any project folder you want. Other collegues can give you access to theirs as well!',
  },
  {
    question: 'Will my confidential documents be saved securely?',
    answer:
      'Documents uploaded to casevisor are securely protected and encrypted on our servers. New uploaded documents are stored privately, only you have access to them. If you want, you can give your collegues access to any document you want.',
  },
  {
    question: 'Will other firms see the documents I upload?',
    answer:
      'No! casevisor keeps the documents of each firm in a separate server with separate encryption key. Documents on different servers cannot be shared and accessed, even with the permission of the document holder.',
  },
  {
    question: 'If I have any problem, whom I should get in touch with?',
    answer:
      'If you encounter any problem when using casevisor, you can call our 24/7 support center. Our representatives will be more than happy to help you out.',
  },
  {
    question: 'I lost my password, how do I get into my account?',
    answer:
      'If you lost your password, you can follow the necessary steps on the login page to restore your password. An email will be sent to your email account set a new password for your account.',
  },
  {
    question: 'How can I start using casevisor in my firm?',
    answer:
      'If you want to use casevisor in your firm, give us a call and we are more than happy to meet with you to discuss further details and price options',
  },
  {
    question: 'How can I search with casevisor?',
    answer:
      "You can start searching right away. To search, you can write the question to which you are looking for an answer. You don't even need to what type of document you are looking for.",
  },
];

function HomePageFAQ() {
  return (
    <section id="faq" className="bg-slate-900 py-20 sm:py-32">
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg tracking-tight text-slate-300">
            If you can't find what you need on this page, you can always email our support team. We'd be more than happy to help you out.
          </p>
        </div>
        <ul role="list" className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {questions.map((question, index) => (
            <li key={index}>
              <HomePageFAQCard question={question} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default HomePageFAQ;
