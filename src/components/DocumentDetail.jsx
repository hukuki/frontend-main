import clsx from 'clsx';
import React from 'react';

const fontSizeIndex = {
  0: 'text-2xl lg:text-3xl',
  1: 'text-xl lg:text-2xl',
  2: 'text-lg lg:text-xl',
  3: 'text-md lg:text-lg',
  4: 'text-xs lg:text-md',
};

function ParseText({ text }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line) => (
        <div className="mb-2">
          <p className="text-lg text-justify">{line}</p>
        </div>
      ))}
    </>
  );
}

function DisplayArticle({ article, index }) {
  const textFontSize = fontSizeIndex[index];
  if (article.children && article.children.length > 0) {
    return (
      <div className="max-w-fit">
        <h2 className={clsx(`${fontSizeIndex[0]} tracking-tight font-bold mb-4 text-center`, 'p-4')}>{article.articleTitle}</h2>
        <div className="mb-12">
          {article.children.map((child) => (
            <DisplayArticle article={child} index={index + 1} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb-4 p-6 pl-8 pr-8">
        <h3 className={`${fontSizeIndex[1]} font-bold mb-2`}>{article.title}</h3>
        {article.articleNumber && <h3 className={`${fontSizeIndex[1]} font-bold mb-2`}>{'MADDE ' + article.articleNumber}</h3>}
        <hr></hr>
        <div className="mt-6">
          <ParseText text={article.content} />
        </div>
      </div>
    );
  }
}

function DocumentDetail({ document }) {
  return (
    <div className="min-h-[2000px] max-w-5xl bg-stone-50 rounded-lg p-8 shadow-md shadow-slate-400 ">
      <DisplayArticle article={document} index={0} />
    </div>
  );
}

export default DocumentDetail;
