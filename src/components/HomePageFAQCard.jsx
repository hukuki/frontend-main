import React from 'react';

function HomePageFAQCard({ question, ...props }) {
  return (
    <div className="flex flex-col justify-between h-full hover:bg-slate-50/20 transition bg-slate-50/10 p-4 rounded-xl" {...props}>
      <h3 className="font-bold text-lg leading-7 text-white">{question.question}</h3>
      <p className="mt-4 text-sm text-slate-200">{question.answer}</p>
    </div>
  );
}

export default HomePageFAQCard;
