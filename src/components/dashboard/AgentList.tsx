import { useEffect, useState } from 'react';
import { Bot, Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import { useAgent } from '../../hooks/useAgent';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface AgentListProps {
  onSelectAgent?: (agentId: number) => void;
  onCreateNew?: () => void;
}

export const AgentList = ({ onSelectAgent, onCreateNew }: AgentListProps) => {
  const { loading, error, agents, getAgents, deleteAgent, clearError } = useAgent();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    getAgents();
  }, [getAgents]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      setDeletingId(id);
      const success = await deleteAgent(id);
      setDeletingId(null);
      
      if (!success) {
        alert('Failed to delete agent');
      }
    }
  };

  if (loading && agents.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading agents...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-poppins font-semibold text-gray-900">Your Agents</h2>
        <button
          onClick={onCreateNew}
          className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-inter font-medium transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Agent
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
            <div>
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
            <button
              onClick={clearError}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-poppins font-medium text-gray-900">{agent.name}</h3>
                  <p className="text-sm text-gray-500">{agent.website_domain}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Language:</span>
                <span className="ml-2">{agent.language}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Model:</span>
                <span className="ml-2">{agent.advanced_settings?.llm_model}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => onSelectAgent?.(agent.id)}
                className="flex items-center px-3 py-1.5 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
              
              <button
                onClick={() => handleDelete(agent.id)}
                disabled={deletingId === agent.id}
                className="flex items-center px-3 py-1.5 text-red-600 hover:text-red-700 font-medium text-sm transition-colors disabled:opacity-50"
              >
                {deletingId === agent.id ? (
                  <LoadingSpinner size="sm" className="mr-1" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-1" />
                )}
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {agents.length === 0 && !loading && (
        <div className="text-center py-12">
          <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-poppins font-medium text-gray-900 mb-2">No agents yet</h3>
          <p className="text-gray-600 mb-6">Create your first AI agent to get started</p>
          <button
            onClick={onCreateNew}
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-inter font-medium transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Agent
          </button>
        </div>
      )}
    </div>
  );
};