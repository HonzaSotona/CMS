export type PageStatus = 'draft' | 'published';

export type ContentBlock = {
  type: 'heading' | 'paragraph';
  value: string;
};

export type PageRecord = {
  id: number;
  title: string;
  slug: string;
  content: ContentBlock[];
  status: PageStatus;
  meta_title?: string | null;
  meta_description?: string | null;
  created_at: string;
  updated_at: string;
};

export type PagePayload = {
  title: string;
  slug: string;
  content: ContentBlock[];
  status: PageStatus;
  meta_title?: string;
  meta_description?: string;
};
