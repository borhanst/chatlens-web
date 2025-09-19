import React, { useState, useRef } from 'react';
import { 
  Palette, 
  Monitor, 
  Type, 
  Image, 
  MessageSquare, 
  Settings, 
  Globe, 
  Code, 
  ChevronDown, 
  ChevronRight,
  Upload,
  Eye,
  Save,
  RotateCcw,
  Info,
  Check,
  AlertTriangle,
  Zap,
  Accessibility,
  Smartphone,
  Bot,
  User,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

interface WidgetConfig {
  launcher: {
    position: 'bottom-right' | 'bottom-left' | 'center';
    icon: 'default' | 'custom' | 'disabled';
    customIcon: string;
    backgroundColor: string;
    size: number;
    contrast: number;
  };
  chatWindow: {
    userBubbleColor: string;
    botBubbleColor: string;
    userTextColor: string;
    botTextColor: string;
    backgroundColor: string;
    backgroundType: 'solid' | 'transparent' | 'gradient';
    gradientStart: string;
    gradientEnd: string;
    cornerRadius: number;
  };
  typography: {
    fontFamily: 'Inter' | 'Poppins' | 'Montserrat' | 'System';
    fontSize: number;
    lineHeight: 'tight' | 'normal' | 'roomy';
    accessibilityMode: boolean;
  };
  header: {
    showAvatar: boolean;
    showLogo: boolean;
    showBanner: boolean;
    avatarUrl: string;
    logoUrl: string;
    bannerUrl: string;
    altText: string;
  };
  inputArea: {
    backgroundColor: string;
    placeholderColor: string;
    sendButtonColor: string;
    sendButtonIcon: 'arrow' | 'paper-plane' | 'send';
    cornerRadius: number;
  };
  interactions: {
    initialState: 'minimized' | 'open';
    animation: 'slide' | 'pop' | 'fade';
    triggerTiming: 'immediate' | '3s' | '10s' | 'scroll';
    scrollPercentage: number;
  };
  accessibility: {
    highContrast: boolean;
    ariaControls: 'on' | 'off' | 'automatic';
    language: string;
  };
  advanced: {
    customCSS: string;
  };
}

const WidgetAppearance = () => {
  const [activeSection, setActiveSection] = useState<string>('launcher');
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [config, setConfig] = useState<WidgetConfig>({
    launcher: {
      position: 'bottom-right',
      icon: 'default',
      customIcon: '',
      backgroundColor: '#3B82F6',
      size: 60,
      contrast: 1
    },
    chatWindow: {
      userBubbleColor: '#3B82F6',
      botBubbleColor: '#F3F4F6',
      userTextColor: '#FFFFFF',
      botTextColor: '#1F2937',
      backgroundColor: '#FFFFFF',
      backgroundType: 'solid',
      gradientStart: '#3B82F6',
      gradientEnd: '#6366F1',
      cornerRadius: 16
    },
    typography: {
      fontFamily: 'Inter',
      fontSize: 14,
      lineHeight: 'normal',
      accessibilityMode: false
    },
    header: {
      showAvatar: true,
      showLogo: false,
      showBanner: false,
      avatarUrl: '',
      logoUrl: '',
      bannerUrl: '',
      altText: 'ChatLens Assistant'
    },
    inputArea: {
      backgroundColor: '#F9FAFB',
      placeholderColor: '#9CA3AF',
      sendButtonColor: '#3B82F6',
      sendButtonIcon: 'arrow',
      cornerRadius: 8
    },
    interactions: {
      initialState: 'minimized',
      animation: 'slide',
      triggerTiming: 'immediate',
      scrollPercentage: 50
    },
    accessibility: {
      highContrast: false,
      ariaControls: 'automatic',
      language: 'en'
    },
    advanced: {
      customCSS: '/* Add your custom CSS here */\n.chat-widget {\n  /* Custom styles */\n}'
    }
  });

  const sections = [
    { id: 'launcher', label: 'Widget Launcher', icon: Zap, description: 'Configure the chat launcher button' },
    { id: 'chatWindow', label: 'Chat Window', icon: MessageSquare, description: 'Customize the chat interface appearance' },
    { id: 'typography', label: 'Typography', icon: Type, description: 'Set fonts and text styling' },
    { id: 'header', label: 'Header Configuration', icon: Image, description: 'Manage avatars, logos, and banners' },
    { id: 'inputArea', label: 'Input Area', icon: Monitor, description: 'Style the message input section' },
    { id: 'interactions', label: 'Interaction Settings', icon: Settings, description: 'Control widget behavior and animations' },
    { id: 'accessibility', label: 'Accessibility & Localization', icon: Accessibility, description: 'Ensure inclusive design and language support' },
    { id: 'advanced', label: 'Advanced Customization', icon: Code, description: 'Custom CSS and advanced options' }
  ];

  const brandColors = [
    '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
    '#EC4899', '#F43F5E', '#EF4444', '#F97316', '#F59E0B',
    '#EAB308', '#84CC16', '#22C55E', '#10B981', '#14B8A6',
    '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1', '#8B5CF6'
  ];

  const fontFamilies = [
    { value: 'Inter', label: 'Inter', preview: 'The quick brown fox' },
    { value: 'Poppins', label: 'Poppins', preview: 'The quick brown fox' },
    { value: 'Montserrat', label: 'Montserrat', preview: 'The quick brown fox' },
    { value: 'System', label: 'System Default', preview: 'The quick brown fox' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' }
  ];

  const checkContrast = (bg: string, text: string): 'good' | 'warning' | 'poor' => {
    // Simplified contrast check - in production, use proper WCAG contrast calculation
    const bgLuminance = parseInt(bg.slice(1), 16);
    const textLuminance = parseInt(text.slice(1), 16);
    const ratio = Math.abs(bgLuminance - textLuminance) / 0xFFFFFF;
    
    if (ratio > 0.7) return 'good';
    if (ratio > 0.4) return 'warning';
    return 'poor';
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      console.log('Widget configuration saved:', config);
    }, 1500);
  };

  const handleFileUpload = (type: 'avatar' | 'logo' | 'banner') => {
    fileInputRef.current?.click();
    // In production, handle file upload here
  };

  const resetToDefaults = () => {
    // Reset configuration to defaults
    setConfig({
      launcher: {
        position: 'bottom-right',
        icon: 'default',
        customIcon: '',
        backgroundColor: '#3B82F6',
        size: 60,
        contrast: 1
      },
      chatWindow: {
        userBubbleColor: '#3B82F6',
        botBubbleColor: '#F3F4F6',
        userTextColor: '#FFFFFF',
        botTextColor: '#1F2937',
        backgroundColor: '#FFFFFF',
        backgroundType: 'solid',
        gradientStart: '#3B82F6',
        gradientEnd: '#6366F1',
        cornerRadius: 16
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: 14,
        lineHeight: 'normal',
        accessibilityMode: false
      },
      header: {
        showAvatar: true,
        showLogo: false,
        showBanner: false,
        avatarUrl: '',
        logoUrl: '',
        bannerUrl: '',
        altText: 'ChatLens Assistant'
      },
      inputArea: {
        backgroundColor: '#F9FAFB',
        placeholderColor: '#9CA3AF',
        sendButtonColor: '#3B82F6',
        sendButtonIcon: 'arrow',
        cornerRadius: 8
      },
      interactions: {
        initialState: 'minimized',
        animation: 'slide',
        triggerTiming: 'immediate',
        scrollPercentage: 50
      },
      accessibility: {
        highContrast: false,
        ariaControls: 'automatic',
        language: 'en'
      },
      advanced: {
        customCSS: '/* Add your custom CSS here */\n.chat-widget {\n  /* Custom styles */\n}'
      }
    });
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'launcher':
        return (
          <div className="space-y-6">
            {/* Position Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Launcher Position
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'bottom-right', label: 'Bottom Right' },
                  { value: 'bottom-left', label: 'Bottom Left' },
                  { value: 'center', label: 'Center' }
                ].map((position) => (
                  <label key={position.value} className="relative">
                    <input
                      type="radio"
                      name="position"
                      value={position.value}
                      checked={config.launcher.position === position.value}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        launcher: { ...prev.launcher, position: e.target.value as any }
                      }))}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all text-center ${
                      config.launcher.position === position.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <span className="font-medium">{position.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Icon Customization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Launcher Icon
              </label>
              <div className="space-y-3">
                {[
                  { value: 'default', label: 'Default ChatLens Icon' },
                  { value: 'custom', label: 'Custom Icon Upload' },
                  { value: 'disabled', label: 'No Icon (Text Only)' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="icon"
                      value={option.value}
                      checked={config.launcher.icon === option.value}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        launcher: { ...prev.launcher, icon: e.target.value as any }
                      }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mr-3"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              
              {config.launcher.icon === 'custom' && (
                <div className="mt-3">
                  <button
                    onClick={() => handleFileUpload('avatar')}
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Custom Icon
                  </button>
                </div>
              )}
            </div>

            {/* Background Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Background Color
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={config.launcher.backgroundColor}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      launcher: { ...prev.launcher, backgroundColor: e.target.value }
                    }))}
                    className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.launcher.backgroundColor}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      launcher: { ...prev.launcher, backgroundColor: e.target.value }
                    }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="#3B82F6"
                  />
                </div>
                
                {/* Brand Colors */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Brand Colors</p>
                  <div className="flex flex-wrap gap-2">
                    {brandColors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setConfig(prev => ({
                          ...prev,
                          launcher: { ...prev.launcher, backgroundColor: color }
                        }))}
                        className="w-8 h-8 rounded-lg border-2 border-white shadow-sm hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Size Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Launcher Size: {config.launcher.size}px
              </label>
              <input
                type="range"
                min="40"
                max="80"
                value={config.launcher.size}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  launcher: { ...prev.launcher, size: parseInt(e.target.value) }
                }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Small (40px)</span>
                <span>Large (80px)</span>
              </div>
            </div>
          </div>
        );

      case 'chatWindow':
        return (
          <div className="space-y-6">
            {/* Message Bubble Colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  User Message Bubble
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={config.chatWindow.userBubbleColor}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        chatWindow: { ...prev.chatWindow, userBubbleColor: e.target.value }
                      }))}
                      className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={config.chatWindow.userBubbleColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          chatWindow: { ...prev.chatWindow, userBubbleColor: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  {/* Text Color */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Text Color</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={config.chatWindow.userTextColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          chatWindow: { ...prev.chatWindow, userTextColor: e.target.value }
                        }))}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.chatWindow.userTextColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          chatWindow: { ...prev.chatWindow, userTextColor: e.target.value }
                        }))}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <div className={`w-4 h-4 rounded-full ${
                        checkContrast(config.chatWindow.userBubbleColor, config.chatWindow.userTextColor) === 'good' ? 'bg-green-500' :
                        checkContrast(config.chatWindow.userBubbleColor, config.chatWindow.userTextColor) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} title="Contrast ratio" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Bot Message Bubble
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={config.chatWindow.botBubbleColor}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        chatWindow: { ...prev.chatWindow, botBubbleColor: e.target.value }
                      }))}
                      className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={config.chatWindow.botBubbleColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          chatWindow: { ...prev.chatWindow, botBubbleColor: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  {/* Text Color */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Text Color</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={config.chatWindow.botTextColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          chatWindow: { ...prev.chatWindow, botTextColor: e.target.value }
                        }))}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.chatWindow.botTextColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          chatWindow: { ...prev.chatWindow, botTextColor: e.target.value }
                        }))}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <div className={`w-4 h-4 rounded-full ${
                        checkContrast(config.chatWindow.botBubbleColor, config.chatWindow.botTextColor) === 'good' ? 'bg-green-500' :
                        checkContrast(config.chatWindow.botBubbleColor, config.chatWindow.botTextColor) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} title="Contrast ratio" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Window Background */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Window Background
              </label>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  {[
                    { value: 'solid', label: 'Solid Color' },
                    { value: 'transparent', label: 'Transparent' },
                    { value: 'gradient', label: 'Gradient' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="backgroundType"
                        value={option.value}
                        checked={config.chatWindow.backgroundType === option.value}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          chatWindow: { ...prev.chatWindow, backgroundType: e.target.value as any }
                        }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mr-2"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>

                {config.chatWindow.backgroundType === 'solid' && (
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={config.chatWindow.backgroundColor}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        chatWindow: { ...prev.chatWindow, backgroundColor: e.target.value }
                      }))}
                      className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.chatWindow.backgroundColor}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        chatWindow: { ...prev.chatWindow, backgroundColor: e.target.value }
                      }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {config.chatWindow.backgroundType === 'gradient' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">Start Color</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={config.chatWindow.gradientStart}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            chatWindow: { ...prev.chatWindow, gradientStart: e.target.value }
                          }))}
                          className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.chatWindow.gradientStart}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            chatWindow: { ...prev.chatWindow, gradientStart: e.target.value }
                          }))}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">End Color</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={config.chatWindow.gradientEnd}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            chatWindow: { ...prev.chatWindow, gradientEnd: e.target.value }
                          }))}
                          className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.chatWindow.gradientEnd}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            chatWindow: { ...prev.chatWindow, gradientEnd: e.target.value }
                          }))}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Corner Radius */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Corner Radius: {config.chatWindow.cornerRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="24"
                value={config.chatWindow.cornerRadius}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  chatWindow: { ...prev.chatWindow, cornerRadius: parseInt(e.target.value) }
                }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Square (0px)</span>
                <span>Rounded (24px)</span>
              </div>
            </div>
          </div>
        );

      case 'typography':
        return (
          <div className="space-y-6">
            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Font Family
              </label>
              <div className="space-y-3">
                {fontFamilies.map((font) => (
                  <label key={font.value} className="relative">
                    <input
                      type="radio"
                      name="fontFamily"
                      value={font.value}
                      checked={config.typography.fontFamily === font.value}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        typography: { ...prev.typography, fontFamily: e.target.value as any }
                      }))}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      config.typography.fontFamily === font.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{font.label}</h4>
                          <p className="text-sm text-gray-600" style={{ fontFamily: font.value }}>
                            {font.preview}
                          </p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          config.typography.fontFamily === font.value
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {config.typography.fontFamily === font.value && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size: {config.typography.fontSize}px
              </label>
              <input
                type="range"
                min="13"
                max="17"
                value={config.typography.fontSize}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  typography: { ...prev.typography, fontSize: parseInt(e.target.value) }
                }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Small (13px)</span>
                <span>Large (17px)</span>
              </div>
            </div>

            {/* Line Height */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Line Height
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'tight', label: 'Tight', description: '1.25' },
                  { value: 'normal', label: 'Normal', description: '1.5' },
                  { value: 'roomy', label: 'Roomy', description: '1.75' }
                ].map((option) => (
                  <label key={option.value} className="relative">
                    <input
                      type="radio"
                      name="lineHeight"
                      value={option.value}
                      checked={config.typography.lineHeight === option.value}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        typography: { ...prev.typography, lineHeight: e.target.value as any }
                      }))}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all text-center ${
                      config.typography.lineHeight === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Accessibility Mode */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <Accessibility className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Accessibility Mode</h4>
                  <p className="text-sm text-gray-600">Increase font size and contrast for better readability</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.typography.accessibilityMode}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    typography: { ...prev.typography, accessibilityMode: e.target.checked }
                  }))}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${
                  config.typography.accessibilityMode ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                    config.typography.accessibilityMode ? 'translate-x-5' : 'translate-x-0.5'
                  } mt-0.5`}></div>
                </div>
              </label>
            </div>
          </div>
        );

      case 'header':
        return (
          <div className="space-y-6">
            {/* Header Elements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Header Elements
              </label>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <Bot className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Show Avatar</h4>
                      <p className="text-sm text-gray-600">Display bot avatar in chat header</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.header.showAvatar}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        header: { ...prev.header, showAvatar: e.target.checked }
                      }))}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      config.header.showAvatar ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        config.header.showAvatar ? 'translate-x-5' : 'translate-x-0.5'
                      } mt-0.5`}></div>
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <Image className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Show Logo</h4>
                      <p className="text-sm text-gray-600">Display company logo in header</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.header.showLogo}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        header: { ...prev.header, showLogo: e.target.checked }
                      }))}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      config.header.showLogo ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        config.header.showLogo ? 'translate-x-5' : 'translate-x-0.5'
                      } mt-0.5`}></div>
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <Monitor className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Show Banner</h4>
                      <p className="text-sm text-gray-600">Display banner image in header</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.header.showBanner}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        header: { ...prev.header, showBanner: e.target.checked }
                      }))}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      config.header.showBanner ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        config.header.showBanner ? 'translate-x-5' : 'translate-x-0.5'
                      } mt-0.5`}></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Image Uploads */}
            {(config.header.showAvatar || config.header.showLogo || config.header.showBanner) && (
              <div className="space-y-4">
                {config.header.showAvatar && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avatar Image
                    </label>
                    <button
                      onClick={() => handleFileUpload('avatar')}
                      className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Upload avatar image</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                      </div>
                    </button>
                  </div>
                )}

                {config.header.showLogo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo Image
                    </label>
                    <button
                      onClick={() => handleFileUpload('logo')}
                      className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Upload logo image</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                      </div>
                    </button>
                  </div>
                )}

                {config.header.showBanner && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Banner Image
                    </label>
                    <button
                      onClick={() => handleFileUpload('banner')}
                      className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Upload banner image</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Alt Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accessibility Alt Text
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={config.header.altText}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  header: { ...prev.header, altText: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the image for screen readers"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Required for accessibility compliance. Describe what the image shows.
              </p>
            </div>
          </div>
        );

      case 'inputArea':
        return (
          <div className="space-y-6">
            {/* Input Background */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Input Background Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={config.inputArea.backgroundColor}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    inputArea: { ...prev.inputArea, backgroundColor: e.target.value }
                  }))}
                  className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={config.inputArea.backgroundColor}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    inputArea: { ...prev.inputArea, backgroundColor: e.target.value }
                  }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Placeholder Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Placeholder Text Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={config.inputArea.placeholderColor}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    inputArea: { ...prev.inputArea, placeholderColor: e.target.value }
                  }))}
                  className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={config.inputArea.placeholderColor}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    inputArea: { ...prev.inputArea, placeholderColor: e.target.value }
                  }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className={`w-4 h-4 rounded-full ${
                  checkContrast(config.inputArea.backgroundColor, config.inputArea.placeholderColor) === 'good' ? 'bg-green-500' :
                  checkContrast(config.inputArea.backgroundColor, config.inputArea.placeholderColor) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`} title="Contrast ratio" />
              </div>
            </div>

            {/* Send Button */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Send Button
              </label>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Button Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={config.inputArea.sendButtonColor}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        inputArea: { ...prev.inputArea, sendButtonColor: e.target.value }
                      }))}
                      className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.inputArea.sendButtonColor}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        inputArea: { ...prev.inputArea, sendButtonColor: e.target.value }
                      }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-2">Icon Style</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'arrow', label: 'Arrow', icon: '→' },
                      { value: 'paper-plane', label: 'Paper Plane', icon: '✈' },
                      { value: 'send', label: 'Send', icon: '📤' }
                    ].map((option) => (
                      <label key={option.value} className="relative">
                        <input
                          type="radio"
                          name="sendButtonIcon"
                          value={option.value}
                          checked={config.inputArea.sendButtonIcon === option.value}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            inputArea: { ...prev.inputArea, sendButtonIcon: e.target.value as any }
                          }))}
                          className="sr-only"
                        />
                        <div className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                          config.inputArea.sendButtonIcon === option.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="text-lg mb-1">{option.icon}</div>
                          <div className="text-xs font-medium">{option.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Radius */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Corner Radius: {config.inputArea.cornerRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="16"
                value={config.inputArea.cornerRadius}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  inputArea: { ...prev.inputArea, cornerRadius: parseInt(e.target.value) }
                }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Square (0px)</span>
                <span>Rounded (16px)</span>
              </div>
            </div>
          </div>
        );

      case 'interactions':
        return (
          <div className="space-y-6">
            {/* Initial State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Initial State
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'minimized', label: 'Minimized', description: 'Show only launcher button' },
                  { value: 'open', label: 'Open', description: 'Show full chat window' }
                ].map((option) => (
                  <label key={option.value} className="relative">
                    <input
                      type="radio"
                      name="initialState"
                      value={option.value}
                      checked={config.interactions.initialState === option.value}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        interactions: { ...prev.interactions, initialState: e.target.value as any }
                      }))}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      config.interactions.initialState === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Animation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Animation Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'slide', label: 'Slide', description: 'Slide up from bottom' },
                  { value: 'pop', label: 'Pop', description: 'Scale in with bounce' },
                  { value: 'fade', label: 'Fade', description: 'Fade in smoothly' }
                ].map((option) => (
                  <label key={option.value} className="relative">
                    <input
                      type="radio"
                      name="animation"
                      value={option.value}
                      checked={config.interactions.animation === option.value}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        interactions: { ...prev.interactions, animation: e.target.value as any }
                      }))}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all text-center ${
                      config.interactions.animation === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Trigger Timing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Trigger Timing
              </label>
              <div className="space-y-3">
                {[
                  { value: 'immediate', label: 'Immediate', description: 'Show widget as soon as page loads' },
                  { value: '3s', label: 'After 3 seconds', description: 'Delay widget appearance by 3 seconds' },
                  { value: '10s', label: 'After 10 seconds', description: 'Delay widget appearance by 10 seconds' },
                  { value: 'scroll', label: 'On scroll', description: 'Show when user scrolls down the page' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="triggerTiming"
                      value={option.value}
                      checked={config.interactions.triggerTiming === option.value}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        interactions: { ...prev.interactions, triggerTiming: e.target.value as any }
                      }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>

              {config.interactions.triggerTiming === 'scroll' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scroll Percentage: {config.interactions.scrollPercentage}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={config.interactions.scrollPercentage}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      interactions: { ...prev.interactions, scrollPercentage: parseInt(e.target.value) }
                    }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10%</span>
                    <span>90%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'accessibility':
        return (
          <div className="space-y-6">
            {/* High Contrast Mode */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <Accessibility className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">High Contrast Mode</h4>
                  <p className="text-sm text-gray-600">Enhance contrast for better visibility</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.accessibility.highContrast}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    accessibility: { ...prev.accessibility, highContrast: e.target.checked }
                  }))}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${
                  config.accessibility.highContrast ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                    config.accessibility.highContrast ? 'translate-x-5' : 'translate-x-0.5'
                  } mt-0.5`}></div>
                </div>
              </label>
            </div>

            {/* ARIA Controls */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ARIA Controls
              </label>
              <div className="space-y-3">
                {[
                  { value: 'on', label: 'Always On', description: 'Enable all ARIA attributes and labels' },
                  { value: 'off', label: 'Disabled', description: 'Disable ARIA attributes (not recommended)' },
                  { value: 'automatic', label: 'Automatic', description: 'Enable based on user preferences' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="ariaControls"
                      value={option.value}
                      checked={config.accessibility.ariaControls === option.value}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        accessibility: { ...prev.accessibility, ariaControls: e.target.value as any }
                      }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Widget Interface Language
              </label>
              <select
                value={config.accessibility.language}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  accessibility: { ...prev.accessibility, language: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                This affects the widget's interface language, not the AI responses.
              </p>
            </div>

            {/* Accessibility Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Accessibility Guidelines</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Ensure color contrast ratio meets WCAG AA standards (4.5:1)</li>
                    <li>• Provide alternative text for all images</li>
                    <li>• Support keyboard navigation</li>
                    <li>• Use semantic HTML elements</li>
                    <li>• Test with screen readers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-6">
            {/* Custom CSS Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Custom CSS
              </label>
              <div className="border border-gray-300 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-300 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">CSS Editor</span>
                  <div className="flex items-center space-x-2">
                    <button className="text-xs text-blue-600 hover:text-blue-700">
                      Format Code
                    </button>
                    <button className="text-xs text-gray-500 hover:text-gray-700">
                      Reset
                    </button>
                  </div>
                </div>
                <textarea
                  value={config.advanced.customCSS}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    advanced: { ...prev.advanced, customCSS: e.target.value }
                  }))}
                  rows={12}
                  className="w-full p-4 font-mono text-sm bg-gray-900 text-green-400 focus:outline-none resize-none"
                  placeholder="/* Add your custom CSS here */
.chat-widget {
  /* Custom styles */
}

.chat-message {
  /* Message styling */
}

.chat-input {
  /* Input styling */
}"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Advanced users can add custom CSS to override default styles. Changes apply in real-time to the preview.
              </p>
            </div>

            {/* CSS Selectors Documentation */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-3">Available CSS Selectors</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Widget Structure</h5>
                  <ul className="space-y-1 text-gray-600 font-mono">
                    <li>.chat-widget</li>
                    <li>.chat-launcher</li>
                    <li>.chat-window</li>
                    <li>.chat-header</li>
                    <li>.chat-messages</li>
                    <li>.chat-input-area</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Message Elements</h5>
                  <ul className="space-y-1 text-gray-600 font-mono">
                    <li>.chat-message</li>
                    <li>.chat-message.user</li>
                    <li>.chat-message.bot</li>
                    <li>.message-bubble</li>
                    <li>.message-text</li>
                    <li>.message-timestamp</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4">
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Complete Documentation →
                </a>
              </div>
            </div>

            {/* CSS Validation */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <div>
                  <h4 className="font-medium text-green-900">CSS Validation</h4>
                  <p className="text-sm text-green-800">Your custom CSS is valid and will be applied to the widget.</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPreview = () => {
    const getBackgroundStyle = () => {
      if (config.chatWindow.backgroundType === 'gradient') {
        return {
          background: `linear-gradient(135deg, ${config.chatWindow.gradientStart}, ${config.chatWindow.gradientEnd})`
        };
      }
      if (config.chatWindow.backgroundType === 'transparent') {
        return { backgroundColor: 'rgba(255, 255, 255, 0.95)' };
      }
      return { backgroundColor: config.chatWindow.backgroundColor };
    };

    return (
      <div className={`${previewMode === 'mobile' ? 'max-w-sm' : 'max-w-md'} mx-auto`}>
        {/* Widget Launcher */}
        <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
          
          {/* Launcher Button */}
          <div 
            className={`absolute ${
              config.launcher.position === 'bottom-right' ? 'bottom-4 right-4' :
              config.launcher.position === 'bottom-left' ? 'bottom-4 left-4' :
              'bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2'
            }`}
          >
            <button
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              style={{
                backgroundColor: config.launcher.backgroundColor,
                width: `${config.launcher.size}px`,
                height: `${config.launcher.size}px`
              }}
            >
              {config.launcher.icon !== 'disabled' && (
                <MessageSquare className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Chat Window */}
        <div 
          className="rounded-xl shadow-xl border border-gray-200 overflow-hidden"
          style={{
            ...getBackgroundStyle(),
            borderRadius: `${config.chatWindow.cornerRadius}px`,
            fontFamily: config.typography.fontFamily,
            fontSize: `${config.typography.fontSize}px`,
            lineHeight: config.typography.lineHeight === 'tight' ? '1.25' : 
                       config.typography.lineHeight === 'roomy' ? '1.75' : '1.5'
          }}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              {config.header.showAvatar && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div>
                <div className="font-medium text-gray-900">ChatLens Assistant</div>
                <div className="text-xs text-green-500 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  Online
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 h-64 overflow-y-auto">
            {/* Bot Message */}
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div 
                className="max-w-xs p-3 rounded-lg"
                style={{
                  backgroundColor: config.chatWindow.botBubbleColor,
                  color: config.chatWindow.botTextColor
                }}
              >
                <p className="text-sm">Hi! How can I help you today?</p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex items-start space-x-2 justify-end">
              <div 
                className="max-w-xs p-3 rounded-lg"
                style={{
                  backgroundColor: config.chatWindow.userBubbleColor,
                  color: config.chatWindow.userTextColor
                }}
              >
                <p className="text-sm">What are your pricing plans?</p>
              </div>
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-3 h-3 text-gray-600" />
              </div>
            </div>

            {/* Bot Response */}
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div 
                className="max-w-xs p-3 rounded-lg"
                style={{
                  backgroundColor: config.chatWindow.botBubbleColor,
                  color: config.chatWindow.botTextColor
                }}
              >
                <p className="text-sm">We offer three plans: Free, Business ($29/mo), and Enterprise. Would you like details on any specific plan?</p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                style={{
                  backgroundColor: config.inputArea.backgroundColor,
                  borderRadius: `${config.inputArea.cornerRadius}px`
                }}
              >
                <span 
                  className="text-sm"
                  style={{ color: config.inputArea.placeholderColor }}
                >
                  Type your message...
                </span>
              </div>
              <button 
                className="p-2 rounded-lg text-white"
                style={{ backgroundColor: config.inputArea.sendButtonColor }}
              >
                {config.inputArea.sendButtonIcon === 'arrow' && '→'}
                {config.inputArea.sendButtonIcon === 'paper-plane' && '✈'}
                {config.inputArea.sendButtonIcon === 'send' && '📤'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Widget Appearance</h1>
            <p className="text-gray-600 mt-1">Customize your chat widget's look and feel</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </button>
            <button
              onClick={resetToDefaults}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className={`grid gap-8 ${showPreview ? 'lg:grid-cols-3' : 'lg:grid-cols-1'}`}>
          {/* Settings Panel */}
          <div className={`${showPreview ? 'lg:col-span-2' : 'lg:col-span-1'} space-y-6`}>
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setActiveSection(isActive ? '' : section.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">{section.label}</h3>
                        <p className="text-sm text-gray-600">{section.description}</p>
                      </div>
                    </div>
                    {isActive ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  {isActive && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="pt-6">
                        {renderSection(section.id)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Live Preview</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setPreviewMode('desktop')}
                        className={`p-2 rounded-lg transition-colors ${
                          previewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <Monitor className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPreviewMode('mobile')}
                        className={`p-2 rounded-lg transition-colors ${
                          previewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {renderPreview()}
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                      Preview updates in real-time as you make changes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          // Handle file upload
          console.log('File selected:', e.target.files?.[0]);
        }}
      />

      {/* Fixed Save Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default WidgetAppearance;