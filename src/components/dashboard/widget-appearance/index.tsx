import React, { useState, useRef, useEffect } from 'react';
import { 
  Zap, MessageSquare, Type, Image, Monitor, Settings, 
  Accessibility, Code, Eye, Save, RotateCcw, RefreshCw
} from 'lucide-react';
import { WidgetConfig } from './types';
import SectionHeader from './SectionHeader';
import LauncherSection from './LauncherSection';
import ChatWindowSection from './ChatWindowSection';
import TypographySection from './TypographySection';
import HeaderSection from './HeaderSection';
import InputAreaSection from './InputAreaSection';
import InteractionsSection from './InteractionsSection';
import AccessibilitySection from './AccessibilitySection';
import AdvancedSection from './AdvancedSection';
import WidgetPreview from './WidgetPreview';
import { saveWidgetConfiguration, loadWidgetConfiguration } from '../../../services/api';

const WidgetAppearance = () => {
  const [activeSection, setActiveSection] = useState<string>('launcher');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  const checkContrast = (bg: string, text: string): 'good' | 'warning' | 'poor' => {
    const bgLuminance = parseInt(bg.slice(1), 16);
    const textLuminance = parseInt(text.slice(1), 16);
    const ratio = Math.abs(bgLuminance - textLuminance) / 0xFFFFFF;
    
    if (ratio > 0.7) return 'good';
    if (ratio > 0.4) return 'warning';
    return 'poor';
  };

  useEffect(() => {
    
    const loadConfig = async () => {
      const result = await loadWidgetConfiguration();
      console.log('Loaded configuration:', result);
      
      if (result && result) {
        const savedConfig = result;
        setConfig({
          launcher: {
            position: savedConfig.launcher.position,
            icon: savedConfig.launcher.icon_type,
            customIcon: '',
            backgroundColor: savedConfig.launcher.background_color,
            size: savedConfig.launcher.size,
            contrast: savedConfig.launcher.contrast
          },
          chatWindow: {
            userBubbleColor: savedConfig.chat_window.user_bubble_color,
            botBubbleColor: savedConfig.chat_window.bot_bubble_color,
            userTextColor: savedConfig.chat_window.user_text_color,
            botTextColor: savedConfig.chat_window.bot_text_color,
            backgroundColor: savedConfig.chat_window.background_color,
            backgroundType: savedConfig.chat_window.background_type,
            gradientStart: savedConfig.chat_window.gradient_start,
            gradientEnd: savedConfig.chat_window.gradient_end,
            cornerRadius: savedConfig.chat_window.corner_radius
          },
          typography: {
            fontFamily: savedConfig.typography.font_family,
            fontSize: savedConfig.typography.font_size,
            lineHeight: savedConfig.typography.line_height,
            accessibilityMode: savedConfig.typography.accessibility_mode
          },
          header: {
            showAvatar: savedConfig.header.show_avatar,
            showLogo: savedConfig.header.show_logo,
            showBanner: savedConfig.header.show_banner,
            avatarUrl: '',
            logoUrl: '',
            bannerUrl: '',
            altText: savedConfig.header.alt_text
          },
          inputArea: {
            backgroundColor: savedConfig.input_area.background_color,
            placeholderColor: savedConfig.input_area.placeholder_color,
            sendButtonColor: savedConfig.input_area.send_button_color,
            sendButtonIcon: savedConfig.input_area.send_button_icon,
            cornerRadius: savedConfig.input_area.corner_radius
          },
          interactions: {
            initialState: savedConfig.interactions.initial_state,
            animation: savedConfig.interactions.animation,
            triggerTiming: savedConfig.interactions.trigger_timing,
            scrollPercentage: savedConfig.interactions.scroll_percentage
          },
          accessibility: {
            highContrast: savedConfig.accessibility.high_contrast,
            ariaControls: savedConfig.accessibility.aria_controls,
            language: savedConfig.accessibility.language
          },
          advanced: {
            customCSS: savedConfig.advanced.custom_css
          }
        });
      } else if (!result.success) {
        console.error('Failed to load configuration:', result.message);
      }
      
      setIsLoading(false);
    };
    loadConfig();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const result = await saveWidgetConfiguration(config);
    
    if (result.success) {
      console.log('Widget configuration saved successfully');
    } else {
      console.error('Failed to save configuration:', result.message);
    }
    
    setIsSaving(false);
  };

  const handleFileUpload = (type: 'avatar' | 'logo' | 'banner') => {
    fileInputRef.current?.click();
  };

  const resetToDefaults = () => {
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
          <LauncherSection
            config={config}
            setConfig={setConfig}
            onFileUpload={handleFileUpload}
            brandColors={brandColors}
          />
        );
      case 'chatWindow':
        return (
          <ChatWindowSection
            config={config}
            setConfig={setConfig}
            checkContrast={checkContrast}
          />
        );
      case 'typography':
        return (
          <TypographySection
            config={config}
            setConfig={setConfig}
          />
        );
      case 'header':
        return (
          <HeaderSection
            config={config}
            setConfig={setConfig}
            onFileUpload={handleFileUpload}
          />
        );
      case 'inputArea':
        return (
          <InputAreaSection
            config={config}
            setConfig={setConfig}
            checkContrast={checkContrast}
          />
        );
      case 'interactions':
        return (
          <InteractionsSection
            config={config}
            setConfig={setConfig}
          />
        );
      case 'accessibility':
        return (
          <AccessibilitySection
            config={config}
            setConfig={setConfig}
          />
        );
      case 'advanced':
        return (
          <AdvancedSection
            config={config}
            setConfig={setConfig}
          />
        );
      default:
        return <div>Section not implemented yet</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

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
              const isActive = activeSection === section.id;
              
              return (
                <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <SectionHeader
                    id={section.id}
                    label={section.label}
                    description={section.description}
                    icon={section.icon}
                    isActive={isActive}
                    onClick={() => setActiveSection(isActive ? '' : section.id)}
                  />
                  
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
                <WidgetPreview
                  config={config}
                  previewMode={previewMode}
                  setPreviewMode={setPreviewMode}
                />
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