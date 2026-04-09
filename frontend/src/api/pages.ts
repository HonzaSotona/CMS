import { api } from './client';
import type { PagePayload, PageRecord } from '../types/page';

type Paginated<T> = {
  data: T[];
};

export const pagesApi = {
  async listAdmin(search = ''): Promise<PageRecord[]> {
    const response = await api.get<Paginated<PageRecord>>('/admin/pages', { params: { search } });
    return response.data.data;
  },
  async getAdmin(id: number): Promise<PageRecord> {
    const response = await api.get<PageRecord>(`/admin/pages/${id}`);
    return response.data;
  },
  async createAdmin(payload: PagePayload): Promise<PageRecord> {
    const response = await api.post<PageRecord>('/admin/pages', payload);
    return response.data;
  },
  async updateAdmin(id: number, payload: PagePayload): Promise<PageRecord> {
    const response = await api.put<PageRecord>(`/admin/pages/${id}`, payload);
    return response.data;
  },
  async deleteAdmin(id: number): Promise<void> {
    await api.delete(`/admin/pages/${id}`);
  },
  async getPublic(slug: string): Promise<PageRecord> {
    const response = await api.get<PageRecord>(`/pages/${slug}`);
    return response.data;
  },
};
