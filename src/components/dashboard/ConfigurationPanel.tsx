import React, { useState } from 'react';
import { 
  Settings, 
  Bot, 
  MessageSquare, 
  Globe, 
  Palette, 
  Code, 
  Save, 
  Play,
  ChevronRight,
  Info,
  Eye,
  EyeOff,
  Plus,
  X,
  Upload,
  Zap,
  User,
  Brain,
  Shield,
  Workflow,
  Database,
  TestTube
} from 'lucide-react';
import { useAuth, withAuth } from '../../contexts/AuthContext';
import UserProfile from './UserProfile';

interface ConfigData {
  general: {
    botName: string;
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

const ConfigurationPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showWebhookUrl, setShowWebhookUrl] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [config, setConfig] = useState<ConfigData>({
    general: {
      botName: 'ChatLens Assistant',
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
    { id: 'general', label: 'General', icon: Settings, description: 'Basic bot configuration' },
    { id: 'personality', label: 'Personality', icon: Brain, description: 'AI behavior and tone' },
    { id: 'behavior', label: 'Behavior', icon: Workflow, description: 'Rules and automation' },
    { id: 'content', label: 'Content', icon: Database, description: 'Data access control' },
    { id: 'chatFlow', label: 'Chat Flow', icon: MessageSquare, description: 'Conversation design' },
    { id: 'advanced', label: 'Advanced', icon: Code, description: 'Technical settings' },
    { id: 'testing', label: 'Testing', icon: TestTube, description: 'Test and preview' }
  ];

  const personalityStyles = [
    { value: 'friendly', label: 'Friendly', description: 'Warm, approachable, and conversational' },
    { value: 'professional', label: 'Professional', description: 'Formal, business-focused, and direct' },
    { value: 'witty', label: 'Witty', description: 'Clever, humorous, and engaging' },
    { value: 'custom', label: 'Custom', description: 'Define your own personality style' }
  ];

  const llmModels = [
    { value: 'gpt-4', label: 'GPT-4', description: 'Most capable, best for complex tasks' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', description: 'Fast and efficient for most use cases' },
    { value: 'claude-3', label: 'Claude 3', description: 'Great for detailed analysis and writing' },
    { value: 'gemini-pro', label: 'Gemini Pro', description: 'Google\'s advanced language model' }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      console.log('Configuration saved:', config);
    }, 1500);
  };

  const addCustomRule = () => {
    const newRule = {
      id: Date.now().toString(),
      condition: '',
      action: ''
    };
    setConfig(prev => ({
      ...prev,
      behavior: {
        ...prev.behavior,
        customRules: [...prev.behavior.customRules, newRule]
      }
    }));
  };

  const removeCustomRule = (id: string) => {
    setConfig(prev => ({
      ...prev,
      behavior: {
        ...prev.behavior,
        customRules: prev.behavior.customRules.filter(rule => rule.id !== id)
      }
    }));
  };

  const addFollowUpPrompt = () => {
    setConfig(prev => ({
      ...prev,
      chatFlow: {
        ...prev.chatFlow,
        followUpPrompts: [...prev.chatFlow.followUpPrompts, '']
      }
    }));
  };

  const removeFollowUpPrompt = (index: number) => {
    setConfig(prev => ({
      ...prev,
      chatFlow: {
        ...prev.chatFlow,
        followUpPrompts: prev.chatFlow.followUpPrompts.filter((_, i) => i !== index)
      }
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-blue-600" />
                General Configuration
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Bot Name
                  </label>
                  <input
                    type="text"
                    value={config.general.botName}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      general: { ...prev.general, botName: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                    placeholder="Enter bot name"
                  />
                  <p className="text-xs text-gray-500 mt-1">This name will appear in the chat interface</p>
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Website Domain
                  </label>
                  <input
                    type="text"
                    value={config.general.websiteDomain}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      general: { ...prev.general, websiteDomain: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                    placeholder="yoursite.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">The domain where your chatbot will be deployed</p>
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Chat Language
                  </label>
                  <select
                    value={config.general.language}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      general: { ...prev.general, language: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                  >
                    <option value="en">🇺🇸 English</option>
                    <option value="es">🇪🇸 Spanish</option>
                    <option value="fr">🇫🇷 French</option>
                    <option value="de">🇩🇪 German</option>
                    <option value="it">🇮🇹 Italian</option>
                    <option value="pt">🇵🇹 Portuguese</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'personality':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-3 text-purple-600" />
                AI Personality & Tone
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-3">
                    Personality Style
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {personalityStyles.map((style) => (
                      <label key={style.value} className="relative">
                        <input
                          type="radio"
                          name="personalityStyle"
                          value={style.value}
                          checked={config.personality.style === style.value}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            personality: { ...prev.personality, style: e.target.value }
                          }))}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          config.personality.style === style.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-inter font-semibold text-gray-900">{style.label}</h4>
                              <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              config.personality.style === style.value
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-gray-300'
                            }`}>
                              {config.personality.style === style.value && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {config.personality.style === 'custom' && (
                  <div>
                    <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Custom Style Description
                    </label>
                    <textarea
                      value={config.personality.customStyle}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        personality: { ...prev.personality, customStyle: e.target.value }
                      }))}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                      placeholder="Describe your custom personality style..."
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Temperature: {config.personality.temperature}
                    <span className="ml-2 text-xs text-gray-500">
                      ({config.personality.temperature < 0.3 ? 'Conservative' : 
                        config.personality.temperature < 0.7 ? 'Balanced' : 'Creative'})
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={config.personality.temperature}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      personality: { ...prev.personality, temperature: parseFloat(e.target.value) }
                    }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>More Focused</span>
                    <span>More Creative</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    System Prompt
                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                      <Info className="w-4 h-4" />
                    </button>
                  </label>
                  <textarea
                    value={config.personality.systemPrompt}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      personality: { ...prev.personality, systemPrompt: e.target.value }
                    }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                    placeholder="Define how your bot should behave..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This prompt defines your bot's core behavior and personality
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'behavior':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-6 flex items-center">
                <Workflow className="w-6 h-6 mr-3 text-green-600" />
                Behavior Rules & Automation
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-poppins font-semibold text-gray-900 mb-4">Predefined Behaviors</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h5 className="font-inter font-medium text-gray-900">Auto-respond to FAQs</h5>
                        <p className="text-sm text-gray-600">Automatically answer frequently asked questions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.behavior.autoFAQ}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            behavior: { ...prev.behavior, autoFAQ: e.target.checked }
                          }))}
                          className="sr-only"
                        />
                        <div className={`w-11 h-6 rounded-full transition-colors ${
                          config.behavior.autoFAQ ? 'bg-primary-500' : 'bg-gray-300'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                            config.behavior.autoFAQ ? 'translate-x-5' : 'translate-x-0.5'
                          } mt-0.5`}></div>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h5 className="font-inter font-medium text-gray-900">Offer to book meetings</h5>
                        <p className="text-sm text-gray-600">Suggest scheduling when appropriate</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.behavior.bookMeetings}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            behavior: { ...prev.behavior, bookMeetings: e.target.checked }
                          }))}
                          className="sr-only"
                        />
                        <div className={`w-11 h-6 rounded-full transition-colors ${
                          config.behavior.bookMeetings ? 'bg-primary-500' : 'bg-gray-300'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                            config.behavior.bookMeetings ? 'translate-x-5' : 'translate-x-0.5'
                          } mt-0.5`}></div>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h5 className="font-inter font-medium text-gray-900">Redirect to human if stuck</h5>
                        <p className="text-sm text-gray-600">Transfer complex queries to human support</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.behavior.redirectToHuman}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            behavior: { ...prev.behavior, redirectToHuman: e.target.checked }
                          }))}
                          className="sr-only"
                        />
                        <div className={`w-11 h-6 rounded-full transition-colors ${
                          config.behavior.redirectToHuman ? 'bg-primary-500' : 'bg-gray-300'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                            config.behavior.redirectToHuman ? 'translate-x-5' : 'translate-x-0.5'
                          } mt-0.5`}></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-poppins font-semibold text-gray-900">Custom Rules</h4>
                    <button
                      onClick={addCustomRule}
                      className="flex items-center px-3 py-2 text-sm font-inter font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Rule
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {config.behavior.customRules.map((rule, index) => (
                      <div key={rule.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="If user asks about..."
                            value={rule.condition}
                            onChange={(e) => {
                              const newRules = [...config.behavior.customRules];
                              newRules[index].condition = e.target.value;
                              setConfig(prev => ({
                                ...prev,
                                behavior: { ...prev.behavior, customRules: newRules }
                              }));
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter text-sm transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="Then do..."
                            value={rule.action}
                            onChange={(e) => {
                              const newRules = [...config.behavior.customRules];
                              newRules[index].action = e.target.value;
                              setConfig(prev => ({
                                ...prev,
                                behavior: { ...prev.behavior, customRules: newRules }
                              }));
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter text-sm transition-colors"
                          />
                        </div>
                        <button
                          onClick={() => removeCustomRule(rule.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    {config.behavior.customRules.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p className="font-inter">No custom rules defined yet.</p>
                        <p className="text-sm mt-1">Add rules to customize your bot's behavior for specific scenarios.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-6 flex items-center">
                <Database className="w-6 h-6 mr-3 text-orange-600" />
                Content Access Control
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-inter font-medium text-gray-900">Limit by page category</h4>
                    <p className="text-sm text-gray-600">Only crawl specific sections of your website</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.content.limitByCategory}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        content: { ...prev.content, limitByCategory: e.target.checked }
                      }))}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      config.content.limitByCategory ? 'bg-primary-500' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        config.content.limitByCategory ? 'translate-x-5' : 'translate-x-0.5'
                      } mt-0.5`}></div>
                    </div>
                  </label>
                </div>

                {config.content.limitByCategory && (
                  <div>
                    <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Allowed Categories
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['/docs', '/blog', '/products', '/support', '/about', '/pricing'].map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={config.content.allowedCategories.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setConfig(prev => ({
                                  ...prev,
                                  content: {
                                    ...prev.content,
                                    allowedCategories: [...prev.content.allowedCategories, category]
                                  }
                                }));
                              } else {
                                setConfig(prev => ({
                                  ...prev,
                                  content: {
                                    ...prev.content,
                                    allowedCategories: prev.content.allowedCategories.filter(c => c !== category)
                                  }
                                }));
                              }
                            }}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-2"
                          />
                          <span className="text-sm font-inter text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Excluded Keywords
                  </label>
                  <input
                    type="text"
                    value={config.content.excludedKeywords.join(', ')}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      content: {
                        ...prev.content,
                        excludedKeywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                      }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                    placeholder="admin, login, checkout"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Excluded Paths
                  </label>
                  <input
                    type="text"
                    value={config.content.excludedPaths.join(', ')}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      content: {
                        ...prev.content,
                        excludedPaths: e.target.value.split(',').map(p => p.trim()).filter(p => p)
                      }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                    placeholder="/admin, /login, /checkout"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate paths with commas</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'chatFlow':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
                Chat Flow & Conversation Design
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Welcome Message
                  </label>
                  <input
                    type="text"
                    value={config.chatFlow.welcomeMessage}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      chatFlow: { ...prev.chatFlow, welcomeMessage: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                    placeholder="Hi! 👋 How can I help you today?"
                  />
                  <p className="text-xs text-gray-500 mt-1">First message users see when they open the chat</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-inter font-medium text-gray-700">
                      Follow-up Prompts
                    </label>
                    <button
                      onClick={addFollowUpPrompt}
                      className="flex items-center px-3 py-1 text-sm font-inter font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {config.chatFlow.followUpPrompts.map((prompt, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={prompt}
                          onChange={(e) => {
                            const newPrompts = [...config.chatFlow.followUpPrompts];
                            newPrompts[index] = e.target.value;
                            setConfig(prev => ({
                              ...prev,
                              chatFlow: { ...prev.chatFlow, followUpPrompts: newPrompts }
                            }));
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter text-sm transition-colors"
                          placeholder="Enter follow-up prompt"
                        />
                        <button
                          onClick={() => removeFollowUpPrompt(index)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Quick action buttons shown to users</p>
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Auto-Reply Timeout
                  </label>
                  <select
                    value={config.chatFlow.autoReplyTimeout}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      chatFlow: { ...prev.chatFlow, autoReplyTimeout: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                  >
                    <option value="3s">3 seconds</option>
                    <option value="5s">5 seconds</option>
                    <option value="10s">10 seconds</option>
                    <option value="15s">15 seconds</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Fallback Message
                  </label>
                  <textarea
                    value={config.chatFlow.fallbackMessage}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      chatFlow: { ...prev.chatFlow, fallbackMessage: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                    placeholder="Message when bot can't help"
                  />
                  <p className="text-xs text-gray-500 mt-1">Shown when the bot can't understand or help with a query</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-6 flex items-center">
                <Code className="w-6 h-6 mr-3 text-red-600" />
                Advanced Technical Settings
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-3">
                    LLM Model
                  </label>
                  <div className="space-y-2">
                    {llmModels.map((model) => (
                      <label key={model.value} className="relative">
                        <input
                          type="radio"
                          name="llmModel"
                          value={model.value}
                          checked={config.advanced.llmModel === model.value}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            advanced: { ...prev.advanced, llmModel: e.target.value }
                          }))}
                          className="sr-only"
                        />
                        <div className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          config.advanced.llmModel === model.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-inter font-medium text-gray-900">{model.label}</h4>
                              <p className="text-sm text-gray-600">{model.description}</p>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              config.advanced.llmModel === model.value
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-gray-300'
                            }`}>
                              {config.advanced.llmModel === model.value && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Embedding Model
                  </label>
                  <select
                    value={config.advanced.embeddingModel}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      advanced: { ...prev.advanced, embeddingModel: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                  >
                    <option value="text-embedding-ada-002">OpenAI Ada v2</option>
                    <option value="text-embedding-3-small">OpenAI v3 Small</option>
                    <option value="text-embedding-3-large">OpenAI v3 Large</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Max Tokens
                    </label>
                    <input
                      type="number"
                      value={config.advanced.maxTokens}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        advanced: { ...prev.advanced, maxTokens: parseInt(e.target.value) }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                      min="100"
                      max="4096"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Max Message Length
                    </label>
                    <input
                      type="number"
                      value={config.advanced.maxMessageLength}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        advanced: { ...prev.advanced, maxMessageLength: parseInt(e.target.value) }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                      min="50"
                      max="1000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Webhook URL
                    <span className="text-xs text-gray-500 ml-2">(Optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showWebhookUrl ? 'text' : 'password'}
                      value={config.advanced.webhookUrl}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        advanced: { ...prev.advanced, webhookUrl: e.target.value }
                      }))}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
                      placeholder="https://your-webhook-url.com"
                    />
                    <button
                      type="button"
                      onClick={() => setShowWebhookUrl(!showWebhookUrl)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showWebhookUrl ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Receive notifications when users interact with your bot
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'testing':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-6 flex items-center">
                <TestTube className="w-6 h-6 mr-3 text-indigo-600" />
                Test & Preview Your Bot
              </h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="text-lg font-poppins font-semibold text-gray-900 mb-4">Live Bot Preview</h4>
                  <p className="text-gray-600 font-inter mb-6">
                    Test your bot configuration in real-time to see how it will interact with your users.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowPreview(true)}
                      className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-inter font-medium transition-colors"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Open Test Chat
                    </button>
                    
                    <button className="flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-inter font-medium transition-colors">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Widget
                    </button>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="text-lg font-poppins font-semibold text-gray-900 mb-4">Embed Code</h4>
                  <p className="text-gray-600 font-inter mb-4">
                    Copy this code and paste it into your website's HTML to deploy your chatbot.
                  </p>
                  
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-400">HTML Embed Code</span>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <code className="text-gray-300">
                      {`<script src="https://cdn.chatlens.com/widget.js"></script>
<script>
  ChatLens.init({
    botId: "your-bot-id",
    domain: "${config.general.websiteDomain}"
  });
</script>`}
                    </code>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <h4 className="text-lg font-poppins font-semibold text-gray-900 mb-2">Configuration Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm font-inter text-gray-700">General settings configured</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm font-inter text-gray-700">Personality defined</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <span className="text-sm font-inter text-gray-700">Content crawling pending</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                    <h4 className="text-lg font-poppins font-semibold text-gray-900 mb-2">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-inter text-gray-700">Response Speed</span>
                        <span className="text-sm font-inter font-semibold text-green-600">1.2s avg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-inter text-gray-700">Accuracy Score</span>
                        <span className="text-sm font-inter font-semibold text-blue-600">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-inter text-gray-700">Knowledge Base</span>
                        <span className="text-sm font-inter font-semibold text-purple-600">247 pages</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <h1 className="text-2xl font-poppins font-bold text-gray-900">Bot Configuration</h1>
            <p className="text-gray-600 font-inter mt-1">Customize your ChatLens assistant</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-inter font-medium transition-colors"
            >
              <User className="w-4 h-4 mr-2" />
              {user?.firstName} {user?.lastName}
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-inter font-medium transition-colors"
            >
              <Play className="w-4 h-4 mr-2" />
              Test Bot
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-inter font-medium transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
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
              <h3 className="font-poppins font-semibold text-gray-900">Bot Preview</h3>
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
                    <div className="font-inter font-medium text-gray-900">{config.general.botName}</div>
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
                This is how your bot will appear to visitors
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(ConfigurationPanel);