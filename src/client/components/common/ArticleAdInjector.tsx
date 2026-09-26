import React from 'react';
import { AdSenseUnit } from './AdSenseUnit';

interface ArticleAdInjectorProps {
  content: string;
  slot?: string;
  className?: string;
}

export const ArticleAdInjector: React.FC<ArticleAdInjectorProps> = ({
  content,
  slot,
  className = '',
}) => {
  if (!content) return null;

  // Split HTML string by paragraph closing tags
  const paragraphs = content.split(/<\/p>/i);

  // If content is short or doesn't have multiple paragraphs, render normally with an ad at the end
  if (paragraphs.length <= 2) {
    return (
      <div className={`article-content space-y-6 ${className}`}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <AdSenseUnit slot={slot} className="my-8" />
      </div>
    );
  }

  // Inject ads after paragraph index 1 (2nd paragraph) and index 4 (5th paragraph)
  const elements: React.ReactNode[] = [];

  paragraphs.forEach((paragraph, index) => {
    if (!paragraph.trim()) return;

    const formattedParagraph = paragraph.toLowerCase().includes('<p')
      ? `${paragraph}</p>`
      : `<p>${paragraph}</p>`;

    elements.push(
      <div
        key={`p-${index}`}
        dangerouslySetInnerHTML={{ __html: formattedParagraph }}
      />
    );

    // Inject ad after 2nd paragraph (index 1) and 5th paragraph (index 4)
    if (index === 1 || index === 4) {
      elements.push(
        <div key={`ad-${index}`} className="my-8 flex justify-center">
          <AdSenseUnit slot={slot} className="w-full max-w-2xl" />
        </div>
      );
    }
  });

  return <div className={`article-content space-y-6 ${className}`}>{elements}</div>;
};
