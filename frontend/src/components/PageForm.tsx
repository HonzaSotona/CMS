import { useMemo, useState } from 'react';
import type { ContentBlock, PagePayload, PageRecord, PageStatus } from '../types/page';

type Props = {
  initialValue?: PageRecord;
  onSubmit: (payload: PagePayload) => Promise<void>;
};

const statusOptions: PageStatus[] = ['draft', 'published'];

function parseBlocks(serialized: string): ContentBlock[] {
  return serialized
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith('# ')) {
        return { type: 'heading', value: line.replace(/^#\s*/, '') } as ContentBlock;
      }

      return { type: 'paragraph', value: line } as ContentBlock;
    });
}

function stringifyBlocks(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => (block.type === 'heading' ? `# ${block.value}` : block.value))
    .join('\n');
}

export function PageForm({ initialValue, onSubmit }: Props): JSX.Element {
  const [title, setTitle] = useState(initialValue?.title ?? '');
  const [slug, setSlug] = useState(initialValue?.slug ?? '');
  const [status, setStatus] = useState<PageStatus>(initialValue?.status ?? 'draft');
  const [metaTitle, setMetaTitle] = useState(initialValue?.meta_title ?? '');
  const [metaDescription, setMetaDescription] = useState(initialValue?.meta_description ?? '');
  const [contentRaw, setContentRaw] = useState(stringifyBlocks(initialValue?.content ?? []));
  const [isSaving, setIsSaving] = useState(false);

  const previewBlocks = useMemo(() => parseBlocks(contentRaw), [contentRaw]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await onSubmit({
        title,
        slug,
        status,
        meta_title: metaTitle,
        meta_description: metaDescription,
        content: parseBlocks(contentRaw),
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <label>
        Titulek
        <input value={title} onChange={(event) => setTitle(event.target.value)} required />
      </label>

      <label>
        Slug
        <input value={slug} onChange={(event) => setSlug(event.target.value)} required />
      </label>

      <label>
        Stav
        <select value={status} onChange={(event) => setStatus(event.target.value as PageStatus)}>
          {statusOptions.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <label>
        SEO title
        <input value={metaTitle} onChange={(event) => setMetaTitle(event.target.value)} />
      </label>

      <label>
        SEO description
        <textarea value={metaDescription} onChange={(event) => setMetaDescription(event.target.value)} />
      </label>

      <label>
        Obsah (řádky, "# " = nadpis)
        <textarea
          value={contentRaw}
          onChange={(event) => setContentRaw(event.target.value)}
          rows={12}
          required
        />
      </label>

      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Ukládám...' : 'Uložit stránku'}
      </button>

      <section>
        <h3>Náhled bloků</h3>
        <ul>
          {previewBlocks.map((block, index) => (
            <li key={`${block.type}-${index}`}>
              <strong>{block.type}:</strong> {block.value}
            </li>
          ))}
        </ul>
      </section>
    </form>
  );
}
