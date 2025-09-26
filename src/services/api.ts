const API_BASE_URL = 'http://127.0.0.1:8001/api';

const transformConfigToAPI = (config: any) => ({
  launcher: {
    position: config.launcher.position,
    icon_type: config.launcher.icon,
    background_color: config.launcher.backgroundColor,
    size: config.launcher.size,
    contrast: config.launcher.contrast
  },
  chat_window: {
    user_bubble_color: config.chatWindow.userBubbleColor,
    bot_bubble_color: config.chatWindow.botBubbleColor,
    user_text_color: config.chatWindow.userTextColor,
    bot_text_color: config.chatWindow.botTextColor,
    background_color: config.chatWindow.backgroundColor,
    background_type: config.chatWindow.backgroundType,
    gradient_start: config.chatWindow.gradientStart,
    gradient_end: config.chatWindow.gradientEnd,
    corner_radius: config.chatWindow.cornerRadius
  },
  typography: {
    font_family: config.typography.fontFamily,
    font_size: config.typography.fontSize,
    line_height: config.typography.lineHeight,
    accessibility_mode: config.typography.accessibilityMode
  },
  header: {
    show_avatar: config.header.showAvatar,
    show_logo: config.header.showLogo,
    show_banner: config.header.showBanner,
    alt_text: config.header.altText
  },
  input_area: {
    background_color: config.inputArea.backgroundColor,
    placeholder_color: config.inputArea.placeholderColor,
    send_button_color: config.inputArea.sendButtonColor,
    send_button_icon: config.inputArea.sendButtonIcon,
    corner_radius: config.inputArea.cornerRadius
  },
  interactions: {
    initial_state: config.interactions.initialState,
    animation: config.interactions.animation,
    trigger_timing: config.interactions.triggerTiming,
    scroll_percentage: config.interactions.scrollPercentage
  },
  accessibility: {
    high_contrast: config.accessibility.highContrast,
    aria_controls: config.accessibility.ariaControls,
    language: config.accessibility.language
  },
  advanced: {
    custom_css: config.advanced.customCSS
  },
  name: "Widget Configuration",
  is_active: true,
  user: 1
});

export const getWidgetConfigurations = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/chat-widget/configurations/`, {
    headers: {
      'Authorization': `jwt ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch configurations');
  return response.json();
};

export const createWidgetConfiguration = async (config: any, token: string) => {
  const response = await fetch(`${API_BASE_URL}/chat-widget/configurations/`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Authorization': `jwt ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transformConfigToAPI(config))
  });
  if (!response.ok) throw new Error('Failed to create configuration');
  return response.json();
};

export const updateWidgetConfiguration = async (id: number, config: any, token: string) => {
  const response = await fetch(`${API_BASE_URL}/chat-widget/configurations/${id}/`, {
    method: 'PUT',
    headers: {
      'accept': 'application/json',
      'Authorization': `jwt ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transformConfigToAPI(config))
  });
  if (!response.ok) throw new Error('Failed to update configuration');
  return response.json();
};

export const saveWidgetConfiguration = async (config: any, token: string) => {
  const configurations = await getWidgetConfigurations(token);
  
  if (configurations.length > 0) {
    return updateWidgetConfiguration(configurations[0].id, config, token);
  } else {
    return createWidgetConfiguration(config, token);
  }
};

export const loadWidgetConfiguration = async (token: string) => {

  const configurations = await getWidgetConfigurations(token);
  return configurations.length > 0 ? configurations[0] : null;
};

export const deleteWidgetConfiguration = async (id: number, token: string) => {
  const response = await fetch(`${API_BASE_URL}/chat-widget/configurations/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `jwt ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete configuration');
};