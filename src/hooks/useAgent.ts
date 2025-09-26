import { useState, useCallback } from 'react';
import { agentService, AgentConfig, Agent } from '../services/agentService';

interface UseAgentReturn {
  loading: boolean;
  error: string | null;
  agents: Agent[];
  currentAgent: Agent | null;
  createAgent: (config: AgentConfig) => Promise<Agent | null>;
  getAgents: () => Promise<void>;
  getAgent: (id: number) => Promise<void>;
  updateAgent: (id: number, config: Partial<AgentConfig>) => Promise<Agent | null>;
  deleteAgent: (id: number) => Promise<boolean>;
  clearError: () => void;
}

export const useAgent = (): UseAgentReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const createAgent = useCallback(async (config: AgentConfig): Promise<Agent | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const newAgent = await agentService.createAgent(config);
      setAgents(prev => [...prev, newAgent]);
      return newAgent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create agent');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAgents = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedAgents = await agentService.getAgents();
      setAgents(fetchedAgents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  }, []);

  const getAgent = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const agent = await agentService.getAgent(id);
      setCurrentAgent(agent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agent');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAgent = useCallback(async (id: number, config: Partial<AgentConfig>): Promise<Agent | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedAgent = await agentService.updateAgent(id, config);
      setAgents(prev => prev.map(agent => agent.id === id ? updatedAgent : agent));
      if (currentAgent?.id === id) {
        setCurrentAgent(updatedAgent);
      }
      return updatedAgent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update agent');
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentAgent]);

  const deleteAgent = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await agentService.deleteAgent(id);
      setAgents(prev => prev.filter(agent => agent.id !== id));
      if (currentAgent?.id === id) {
        setCurrentAgent(null);
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete agent');
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentAgent]);

  return {
    loading,
    error,
    agents,
    currentAgent,
    createAgent,
    getAgents,
    getAgent,
    updateAgent,
    deleteAgent,
    clearError,
  };
};