import { apiWithAuth } from './tokenService';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface CrawlerPage {
  id: number;
  uuid: string;
  is_active: boolean;
  page_title: string;
  path: string;
  content: string;
  response_status: number;
  response_error: string;
  status: 'crawl' | 'indexed' | 'skipped' | 'error';
  crawler: number;
  last_crawled_at?: Date
}

export interface CrawlerConfig {
  id?: number;
  pages?: CrawlerPage[];
  uuid?: string;
  is_active: boolean;
  name: string;
  base_url: string;
  custom_headers: string;
  include_path: string[];
  exclude_path: string[];
  delay: number;
  depth: number;
  file_type: string[];
  is_crawl_external_link: boolean;
  is_follow_robots_txt: boolean;
  is_preview_before_index: boolean;
  is_auto_crawl: boolean;
  schedule_type: 'manual' | 'daily' | 'weekly' | 'monthly';
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}

export const createCrawler = async (config: Omit<CrawlerConfig, 'id'>): Promise<ApiResponse<CrawlerConfig>> => {
  try {
    const response = await apiWithAuth(`${API_BASE_URL}/api/crawlers/crawlers/`, {
      method: 'POST',
      body: JSON.stringify(config)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create crawler');
    }

    return {
      success: true,
      data,
      message: 'Crawler created successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred'
    };
  }
};

export const updateCrawler = async (id: number, config: Partial<CrawlerConfig>): Promise<ApiResponse<CrawlerConfig>> => {
  try {
    const response = await apiWithAuth(`${API_BASE_URL}/api/crawlers/crawlers/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(config)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update crawler');
    }

    return {
      success: true,
      data,
      message: 'Crawler updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred'
    };
  }
};

export const getCrawlers = async (): Promise<ApiResponse<CrawlerConfig[]>> => {
  try {
    const response = await apiWithAuth(`${API_BASE_URL}/api/crawlers/crawlers/`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch crawlers');
    }

    return {
      success: true,
      data,
      message: 'Crawlers fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred'
    };
  }
};

export const startCrawl = async (id: number): Promise<ApiResponse<any>> => {
  try {
    const response = await apiWithAuth(`${API_BASE_URL}/api/crawlers/crawlers/${id}/start/`, {
      method: 'POST'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to start crawl');
    }

    return {
      success: true,
      data,
      message: 'Crawl started successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred'
    };
  }
};

export const getCrawlerPages = async (id: number): Promise<ApiResponse<CrawlerPage[]>> => {
  try {
    const response = await apiWithAuth(`${API_BASE_URL}/api/crawlers/crawlers/${id}/`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch crawler pages');
    }

    return {
      success: true,
      data: data.pages || [],
      message: 'Pages fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred'
    };
  }
};

export const crawlUrl = async (url: string, crawler_id?: Number): Promise<ApiResponse<any>> => {
  try {
    const response = await apiWithAuth(`${API_BASE_URL}/api/crawlers/crawlers/${crawler_id}/crawl_url/`, {
      method: 'POST',
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to crawl URL');
    }

    return {
      success: true,
      data,
      message: 'URL crawled successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred'
    };
  }
};

export const createAgentWithPages = async (websiteDomain: string): Promise<ApiResponse<CrawlerPage[]>> => {
  try {
    const response = await apiWithAuth(`${API_BASE_URL}/api/agent/agent-create/`, {
      method: 'POST',
      body: JSON.stringify({ website_domain: websiteDomain })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create agent');
    }

    return {
      success: true,
      data: data.pages || [],
      message: 'Agent created successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred'
    };
  }
};