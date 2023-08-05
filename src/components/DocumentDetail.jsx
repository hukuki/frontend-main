import clsx from 'clsx';
import React from 'react';

const fontSizeIndex = {
  0: 'text-2xl lg:text-3xl',
  1: 'text-xl lg:text-2xl',
  2: 'text-lg lg:text-xl',
  3: 'text-md lg:text-lg',
  4: 'text-sm lg:text-md',
};

function ParseText({ text }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line) => (
        <div className="mb-4">
          <span className="text-xl">{line}</span>
          <br></br>
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
        <h1 className={clsx(`${textFontSize} tracking-tight mb-4`, index == 0 ? 'text-center' : '')}>{article.articleTitle}</h1>
        <div className="mb-12">
          {article.children.map((child) => (
            <DisplayArticle article={child} index={index + 1} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb-4">
        <h1 className={`${textFontSize} font-semibold mb-2`}>{article.articleTitle}</h1>
        <div>
          <ParseText text={article.content} />
        </div>
      </div>
    );
  }
}

function DocumentDetail({ document }) {
  return (
    <div className="min-h-[2000px] max-w-5xl bg-stone-50 rounded-lg p-4">
      <DisplayArticle article={document} index={0} />
    </div>
  );
}

export default DocumentDetail;
