import { useState, useEffect } from 'react';
import { 
  Settings, 
  Bot, 
  MessageSquare,  
  Code, 
  Save, 
  Play,
  X,
  Brain,
  Workflow,
  Database,
  TestTube,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { withAuth } from '../../contexts/AuthContext';
import UserProfile from './UserProfile';
import { GeneralTab } from './agent_config/GeneralTab';
import { PersonalityTab } from './agent_config/PersonalityTab';
import { BehaviorTab } from './agent_config/BehaviorTab';
import { ContentTab } from './agent_config/ContentTab';
import { ChatFlowTab } from './agent_config/ChatFlowTab';
import { AdvancedTab } from './agent_config/AdvancedTab';
import { TestingTab } from './agent_config/TestingTab';
import { useAgent } from '../../hooks/useAgent';
import { AgentConfig } from '../../services/agentService';

interface ConfigData {
  general: {
    agentName: string;
    websiteDomain: string;
    language: string;
  };
  personality: {
    style: string;
    temperature: number;
    systemPrompt: string;
    customStyle: string;
  };
  behavior: {
    autoFAQ: boolean;
    bookMeetings: boolean;
    redirectToHuman: boolean;
    customRules: Array<{ condition: string; action: string; id: string }>;
  };
  content: {
    limitByCategory: boolean;
    allowedCategories: string[];
    excludedKeywords: string[];
    excludedPaths: string[];
  };
  chatFlow: {
    welcomeMessage: string;
    followUpPrompts: string[];
    autoReplyTimeout: string;
    fallbackMessage: string;
  };
  advanced: {
    llmModel: string;
    embeddingModel: string;
    maxTokens: number;
    maxMessageLength: number;
    webhookUrl: string;
  };
}

interface ConfigurationPanelProps {
  agentId?: number | null;
  onBack?: () => void;
}

const ConfigurationPanel = ({ agentId: propAgentId, onBack }: ConfigurationPanelProps = {}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPreview, setShowPreview] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [agentId, setAgentId] = useState<number | null>(propAgentId || null);
  
  const { 
    loading, 
    error, 
    currentAgent, 
    createAgent, 
    getAgent, 
    updateAgent, 
    clearError 
  } = useAgent();

  const [config, setConfig] = useState<ConfigData>({
    general: {
      agentName: 'ChatLens Assistant',
      websiteDomain: 'yoursite.com',
      language: 'en'
    },
    personality: {
      style: 'friendly',
      temperature: 0.7,
      systemPrompt: 'You are a helpful AI assistant for this website. Be friendly, informative, and always try to help users find what they need.',
      customStyle: ''
    },
    behavior: {
      autoFAQ: true,
      bookMeetings: false,
      redirectToHuman: true,
      customRules: []
    },
    content: {
      limitByCategory: false,
      allowedCategories: [],
      excludedKeywords: ['admin', 'login', 'checkout'],
      excludedPaths: ['/admin', '/login', '/checkout']
    },
    chatFlow: {
      welcomeMessage: 'Hi! 👋 How can I help you today?',
      followUpPrompts: ['Tell me more', 'What else can you help with?', 'Show me pricing'],
      autoReplyTimeout: '5s',
      fallbackMessage: 'I\'m not sure about that. Let me connect you with a human who can help!'
    },
    advanced: {
      llmModel: 'gpt-4',
      embeddingModel: 'text-embedding-ada-002',
      maxTokens: 2048,
      maxMessageLength: 500,
      webhookUrl: ''
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Settings, description: 'Basic agent configuration' },
    { id: 'personality', label: 'Personality', icon: Brain, description: 'AI behavior and tone' },
    { id: 'behavior', label: 'Behavior', icon: Workflow, description: 'Rules and automation' },
    { id: 'content', label: 'Content', icon: Database, description: 'Data access control' },
    { id: 'chatFlow', label: 'Chat Flow', icon: MessageSquare, description: 'Conversation design' },
    { id: 'advanced', label: 'Advanced', icon: Code, description: 'Technical settings' },
    { id: 'testing', label: 'Testing', icon: TestTube, description: 'Test and preview' }
  ];


  const transformConfigToAPI = (config: ConfigData): AgentConfig => ({
    name: config.general.agentName,
    website_domain: config.general.websiteDomain,
    language: config.general.language,
    crawler: 0,
    personality: {
      style: config.personality.style,
      temperature: config.personality.temperature,
      system_prompt: config.personality.systemPrompt,
      custom_style: config.personality.customStyle
    },
    behavior: {
      auto_faq: config.behavior.autoFAQ,
      book_meetings: config.behavior.bookMeetings,
      redirect_to_human: config.behavior.redirectToHuman
    },
    chat_flow: {
      welcome_message: config.chatFlow.welcomeMessage,
      auto_reply_timeout: config.chatFlow.autoReplyTimeout,
      fallback_message: config.chatFlow.fallbackMessage
    },
    advanced_settings: {
      llm_model: config.advanced.llmModel,
      embedding_model: config.advanced.embeddingModel,
      max_tokens: config.advanced.maxTokens,
      max_message_length: config.advanced.maxMessageLength,
      webhook_url: config.advanced.webhookUrl
    }
  });

  const handleSave = async () => {
    try {
      const apiConfig = transformConfigToAPI(config);
      
      if (agentId) {
        await updateAgent(agentId, apiConfig);
      } else {
        const newAgent = await createAgent(apiConfig);
        if (newAgent) {
          setAgentId(newAgent.id);
        }
      }
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  useEffect(() => {
    // Load existing agent if agentId is available
    if (agentId) {
      getAgent(agentId);
    }
  }, [agentId, getAgent]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralTab config={config} setConfig={setConfig} />
        );

      case 'personality':
        return (
          <PersonalityTab config={config} setConfig={setConfig} />
        );

      case 'behavior':
        return (
          <BehaviorTab config={config} setConfig={setConfig} />
        );

      case 'content':
        return (
          <ContentTab config={config} setConfig={setConfig} />
        );

      case 'chatFlow':
        return (
          <ChatFlowTab config={config} setConfig={setConfig} />
        );

      case 'advanced':
        return (
          <AdvancedTab config={config} setConfig={setConfig} />
        );

      case 'testing':
        return (
          <TestingTab config={config} setShowPreview={setShowPreview} />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-poppins font-bold text-gray-900">Agent Configuration</h1>
            <p className="text-gray-600 font-inter mt-1">Customize your ChatLens assistant</p>
          </div>
          <div className="flex items-center space-x-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-inter font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to List
              </button>
            )}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-inter font-medium transition-colors"
            >
              <Play className="w-4 h-4 mr-2" />
              Test Agent
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-inter font-medium transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-2 ${
                      activeTab === tab.id ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    <div className="text-left">
                      <div className="font-inter font-medium">{tab.label}</div>
                      <div className="text-xs text-gray-400 hidden sm:block">{tab.description}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
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
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {renderTabContent()}
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-poppins font-semibold text-gray-900">User Profile</h3>
              <button
                onClick={() => setShowProfile(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <UserProfile />
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-poppins font-semibold text-gray-900">Agent Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-electric-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-inter font-medium text-gray-900">{config.general.agentName}</div>
                    <div className="text-xs text-green-500">Online</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700">{config.chatFlow.welcomeMessage}</p>
                </div>
                
                {config.chatFlow.followUpPrompts.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {config.chatFlow.followUpPrompts.slice(0, 3).map((prompt, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-inter hover:bg-primary-200 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="text-center text-sm text-gray-500 font-inter">
                This is how your agent will appear to visitors
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(ConfigurationPanel);