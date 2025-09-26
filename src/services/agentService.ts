import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8001/api';

// Types
export interface AgentConfig {
  name: string;
  website_domain: string;
  language: string;
  crawler: number;
  personality: {
    style: string;
    temperature: number;
    system_prompt: string;
    custom_style: string;
  };
  behavior: {
    auto_faq: boolean;
    book_meetings: boolean;
    redirect_to_human: boolean;
  };
  chat_flow: {
    welcome_message: string;
    auto_reply_timeout: string;
    fallback_message: string;
  };
  advanced_settings: {
    llm_model: string;
    embedding_model: string;
    max_tokens: number;
    max_message_length: number;
    webhook_url: string;
  };
}

export interface Agent extends AgentConfig {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

class AgentService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    const csrfToken = localStorage.getItem('csrf_token');
    
    return {
      'Authorization': `jwt ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFTOKEN': csrfToken || '',
    };
  }

  // Create Agent
  async createAgent(config: AgentConfig): Promise<Agent> {
    try {
      const response: AxiosResponse<Agent> = await axios.post(
        `${API_BASE_URL}/agent/`,
        config,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get All Agents
  async getAgents(): Promise<Agent[]> {
    try {
      const response: AxiosResponse<Agent[]> = await axios.get(
        `${API_BASE_URL}/agent/`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get Single Agent
  async getAgent(id: number): Promise<Agent> {
    try {
      const response: AxiosResponse<Agent> = await axios.get(
        `${API_BASE_URL}/agent/${id}/`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update Agent
  async updateAgent(id: number, config: Partial<AgentConfig>): Promise<Agent> {
    try {
      const response: AxiosResponse<Agent> = await axios.patch(
        `${API_BASE_URL}/agent/${id}/`,
        config,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete Agent
  async deleteAgent(id: number): Promise<void> {
    try {
      await axios.delete(
        `${API_BASE_URL}/agent/${id}/`,
        { headers: this.getAuthHeaders() }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      const message = error.response.data?.message || error.response.data?.detail || 'API Error';
      return new Error(`${message} (${error.response.status})`);
    } else if (error.request) {
      return new Error('Network error - please check your connection');
    } else {
      return new Error(error.message || 'Unknown error occurred');
    }
  }
}

export const agentService = new AgentService();