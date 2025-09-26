export interface WidgetConfig {
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

export interface ConfigUpdateFunction {
  (updater: (prev: WidgetConfig) => WidgetConfig): void;
}