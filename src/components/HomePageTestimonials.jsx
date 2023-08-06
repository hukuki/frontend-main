import React from 'react';
import avatarImage1 from '@/images/avatar-1.png';
import avatarImage2 from '@/images/avatar-2.png';
import avatarImage3 from '@/images/avatar-3.png';
import avatarImage4 from '@/images/avatar-4.png';
import avatarImage5 from '@/images/avatar-5.png';
import { Container } from './Container';
import HomePageTestimonialCard from './HomePageTestimonialCard';
const testimonials = [
  {
    content: 'casevisor is amazing. It is so easy to use that it boosted my productivity a hundred times',
    author: {
      name: 'Tunaberk Almaci',
      role: 'CEO at casevisor',
      image: avatarImage1,
    },
  },
  {
    content: 'I would rather die than to work at a company using Lexpera after using casevisor',
    author: {
      name: 'Atakan Kara',
      role: 'CTO at casevisor',
      image: avatarImage2,
    },
  },
  {
    content:
      "Sometimes it finds the documents where I did't even use any of the keywords. It is such a relief not to think about what law term I should be using just to find a document",
    author: {
      name: 'Onur Eren Arpacı',
      role: 'Vice President of Engineering at casevisor',
      image: avatarImage3,
    },
  },
  {
    content:
      "I don't have to keep track of the email threads anymore. By just using casevisor, I can find every document I uploaded in the correct client case folder.",
    author: {
      name: 'Eren Yenigül',
      role: 'TechLead at casevisor',
      image: avatarImage4,
    },
  },
  {
    content:
      "I didn't know I needed a platform like this until I used it. Now, I can focus on important things without getting lost in emails and documents",
    author: {
      name: 'Şafak Bulut',
      role: 'Legal Advisor at casevisor',
      image: avatarImage5,
    },
  },
  {
    content: "Finally somebody did it. I knew that law needed a tool as easy to use as casevisor. I can't wait to share this with more collegues.",
    author: {
      name: 'Mertcan Barut',
      role: 'Legal Advisor at casevisor',
      image: avatarImage3,
    },
  },
];

function HomePageTestimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">Loved by legal workers</h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            The simplicity and power of casevisor is loved by many around the world. We have a solid customer base of legal workers who love our product
          </p>
        </div>
        <ul role="list" className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li key={index}>
              <HomePageTestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default HomePageTestimonials;
