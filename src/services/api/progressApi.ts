import { apiClient } from './client';
import { ProgressRecordDto, ProgressSummaryDto } from './types';

export interface ProgressCreatePayload {
  date: string;
  weight: number;
  bmi?: number;
  calories_consumed?: number;
  notes?: string;
}

export interface ProgressUpdatePayload {
  date?: string;
  weight?: number;
  bmi?: number;
  calories_consumed?: number;
  notes?: string;
}

export const progressApi = {
  /**
   * Get all progress records for current user
   * GET /progress
   */
  async getProgressRecords(): Promise<ProgressRecordDto[]> {
    return apiClient.get<ProgressRecordDto[]>('/progress');
  },

  /**
   * Get progress overview summary
   * GET /progress/summary
   */
  async getProgressSummary(): Promise<ProgressSummaryDto> {
    return apiClient.get<ProgressSummaryDto>('/progress/summary');
  },

  /**
   * Record new weight & progress data point
   * POST /progress
   */
  async createProgressRecord(payload: ProgressCreatePayload): Promise<ProgressRecordDto> {
    return apiClient.post<ProgressRecordDto>('/progress', payload);
  },

  /**
   * Get specific progress record
   * GET /progress/{progress_id}
   */
  async getProgressById(progressId: string): Promise<ProgressRecordDto> {
    return apiClient.get<ProgressRecordDto>(`/progress/${progressId}`);
  },

  /**
   * Update progress record
   * PUT /progress/{progress_id}
   */
  async updateProgressRecord(progressId: string, payload: ProgressUpdatePayload): Promise<ProgressRecordDto> {
    return apiClient.put<ProgressRecordDto>(`/progress/${progressId}`, payload);
  },

  /**
   * Delete progress record
   * DELETE /progress/{progress_id}
   */
  async deleteProgressRecord(progressId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/progress/${progressId}`);
  }
};
