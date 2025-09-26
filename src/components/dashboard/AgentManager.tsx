import { useState } from 'react';
import { AgentList } from './AgentList';
import ConfigurationPanel from './ConfigurationPanel';
import { CreateAgentModal } from './CreateAgentModal';
import { CrawlerPage } from '../../services/crawlerApi';

export const AgentManager = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSelectAgent = (agentId: number) => {
    setSelectedAgentId(agentId);
    setShowConfig(true);
  };

  const handleCreateNew = () => {
    setShowCreateModal(true);
  };

  const handleCreateSuccess = (pages: CrawlerPage[]) => {
    setSelectedAgentId(null);
    setShowConfig(true);
  };

  const handleBackToList = () => {
    setShowConfig(false);
    setSelectedAgentId(null);
  };

  if (showConfig) {
    return <ConfigurationPanel agentId={selectedAgentId} onBack={handleBackToList} />;
  }

  return (
    <>
      <AgentList 
        onSelectAgent={handleSelectAgent}
        onCreateNew={handleCreateNew}
      />
      <CreateAgentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
};