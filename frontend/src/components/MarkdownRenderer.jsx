import React from 'react';

/**
 * Lightweight, secure Markdown renderer component.
 * Parses lists (ordered and unordered), bold text, and normal paragraphs.
 */
const MarkdownRenderer = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let currentList = null;

  const flushList = (key) => {
    if (currentList) {
      const ListTag = currentList.type;
      const listClass = currentList.type === 'ul'
        ? 'list-disc pl-5 my-2.5 space-y-1.5 text-slate-700 font-normal'
        : 'list-decimal pl-5 my-2.5 space-y-1.5 text-slate-700 font-normal';
      
      elements.push(
        <ListTag key={`list-${key}`} className={listClass}>
          {currentList.items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInlineText(item)}
            </li>
          ))}
        </ListTag>
      );
      currentList = null;
    }
  };

  const renderInlineText = (txt) => {
    const parts = txt.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <strong key={index} className="font-bold text-slate-900">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(i);
      continue;
    }

    const ulMatch = line.match(/^\s*[-*]\s+(.*)$/);
    const olMatch = line.match(/^\s*(\d+)\.\s+(.*)$/);

    if (ulMatch) {
      if (currentList && currentList.type !== 'ul') {
        flushList(i);
      }
      if (!currentList) {
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(ulMatch[1]);
    } else if (olMatch) {
      if (currentList && currentList.type !== 'ol') {
        flushList(i);
      }
      if (!currentList) {
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(olMatch[2]);
    } else {
      flushList(i);
      elements.push(
        <p key={i} className="mb-2.5 last:mb-0 leading-relaxed text-slate-700 font-normal">
          {renderInlineText(line)}
        </p>
      );
    }
  }

  flushList(lines.length);

  return <div className="markdown-body space-y-1.5">{elements}</div>;
};

export default MarkdownRenderer;
