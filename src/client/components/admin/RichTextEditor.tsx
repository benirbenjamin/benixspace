import React, { useState } from 'react';
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, Code, Image as ImageIcon, Link as LinkIcon, Minus
} from 'lucide-react';
import { YoutubeIcon } from '../common/SocialIcons';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const insertTag = (openTag: string, closeTag: string = '') => {
    const text = value || '';
    onChange(text + `${openTag}${closeTag}`);
  };

  const handleAddImage = () => {
    if (!imageUrl) return;
    const imgHtml = `\n<figure class="my-6">\n  <img src="${imageUrl}" alt="${imageAlt || 'Article image'}" class="w-full rounded-2xl shadow-lg border border-slate-200" />\n  ${imageAlt ? `<figcaption class="text-xs text-center text-slate-500 mt-2">${imageAlt}</figcaption>` : ''}\n</figure>\n`;
    onChange((value || '') + imgHtml);
    setImageUrl('');
    setImageAlt('');
    setShowImageModal(false);
  };

  const handleAddYoutube = () => {
    if (!youtubeUrl) return;
    let videoId = youtubeUrl;
    if (youtubeUrl.includes('v=')) {
      videoId = youtubeUrl.split('v=')[1].split('&')[0];
    } else if (youtubeUrl.includes('youtu.be/')) {
      videoId = youtubeUrl.split('youtu.be/')[1];
    }

    const ytHtml = `\n<div className="aspect-video w-full rounded-2xl overflow-hidden my-6 shadow-lg border border-slate-200">\n  <iframe src="https://www.youtube.com/embed/${videoId}" class="w-full h-full border-0" allowfullscreen></iframe>\n</div>\n`;
    onChange((value || '') + ytHtml);
    setYoutubeUrl('');
    setShowYoutubeModal(false);
  };

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm space-y-0">
      
      {/* Toolbar Header */}
      <div className="bg-slate-50 p-2.5 border-b border-slate-200 flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => insertTag('<h2>', '</h2>')}
          className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-sky-50 hover:text-sky-600 text-slate-700 font-bold text-xs flex items-center gap-1"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" /> H2
        </button>

        <button
          type="button"
          onClick={() => insertTag('<h3>', '3</h2>')}
          className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-sky-50 hover:text-sky-600 text-slate-700 font-bold text-xs flex items-center gap-1"
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" /> H3
        </button>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => insertTag('<strong>', '成果')}
          className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-sky-50 hover:text-sky-600 text-slate-700"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => insertTag('<em>', '</em>')}
          className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-sky-50 hover:text-sky-600 text-slate-700"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')}
          className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-sky-50 hover:text-sky-600 text-slate-700"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => insertTag('<blockquote class="border-l-4 border-sky-500 pl-4 italic text-slate-600 my-4">\n  ', '\n</blockquote>')}
          className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-sky-50 hover:text-sky-600 text-slate-700"
          title="Quote Block"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => insertTag('<hr class="my-6 border-slate-200" />\n')}
          className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-sky-50 hover:text-sky-600 text-slate-700"
          title="Horizontal Rule"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => setShowImageModal(true)}
          className="p-2 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-600 hover:text-white font-semibold text-xs flex items-center gap-1 transition-colors"
          title="Insert Postimages Image"
        >
          <ImageIcon className="w-4 h-4" /> Postimages URL
        </button>

        <button
          type="button"
          onClick={() => setShowYoutubeModal(true)}
          className="p-2 rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-600 hover:text-white font-semibold text-xs flex items-center gap-1 transition-colors"
          title="Embed YouTube Video"
        >
          <YoutubeIcon className="w-4 h-4" /> YouTube Embed
        </button>
      </div>

      {/* Main Textarea */}
      <textarea
        rows={14}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write article HTML content here. Use H2, H3, paragraphs (<p>), Postimages images, and links..."
        className="w-full p-4 text-slate-900 text-sm font-mono focus:outline-none resize-y"
      />

      {/* Postimages Image Modal */}
      {showImageModal && (
        <div className="p-4 bg-slate-100 border-t border-slate-200 space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase">Insert Image URL (Postimages.org Compatible)</h4>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://i.postimg.cc/..."
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-sm"
          />
          <input
            type="text"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            placeholder="Image Alt text / Caption"
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-sm"
          />
          <div className="flex gap-2">
            <button onClick={handleAddImage} className="px-4 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs">
              Insert Image
            </button>
            <button onClick={() => setShowImageModal(false)} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* YouTube Video Modal */}
      {showYoutubeModal && (
        <div className="p-4 bg-slate-100 border-t border-slate-200 space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase">Insert YouTube Video URL</h4>
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-sm"
          />
          <div className="flex gap-2">
            <button onClick={handleAddYoutube} className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs">
              Embed Video
            </button>
            <button onClick={() => setShowYoutubeModal(false)} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs">
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
