interface ChatLensConfig {
  agentId: string;
  domain: string;
}

class ChatLensWidget {
  private config: ChatLensConfig;
  private iframe: HTMLIFrameElement | null = null;
  private widgetContainer: HTMLDivElement | null = null;
  
  constructor() {
    this.config = {
      agentId: '',
      domain: ''
    };
  }

  init(config: ChatLensConfig) {
    this.config = config;
    this.createWidgetContainer();
    this.createIframe();
  }

  private createWidgetContainer() {
    this.widgetContainer = document.createElement('div');
    this.widgetContainer.id = 'chatlens-widget-container';
    this.widgetContainer.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      width: 60px;
      height: 60px;
      transition: all 0.3s ease-in-out;
    `;
    document.body.appendChild(this.widgetContainer);
  }

  private createIframe() {
    this.iframe = document.createElement('iframe');
    this.iframe.id = 'chatlens-widget-iframe';
    this.iframe.style.cssText = `
      border: none;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;
    `;
    
    // Set the iframe source with configuration parameters
    const widgetUrl = new URL('https://widget.chatlens.com');
    widgetUrl.searchParams.set('agentId', this.config.agentId);
    widgetUrl.searchParams.set('domain', this.config.domain);
    this.iframe.src = widgetUrl.toString();

    if (this.widgetContainer) {
      this.widgetContainer.appendChild(this.iframe);
    }

    // Listen for messages from the iframe
    window.addEventListener('message', this.handleMessage.bind(this));
  }

  private handleMessage(event: MessageEvent) {
    // Verify the origin
    if (event.origin !== 'https://widget.chatlens.com') return;

    const { type, data } = event.data;
    
    switch (type) {
      case 'OPEN_CHAT':
        this.expandWidget();
        break;
      case 'CLOSE_CHAT':
        this.collapseWidget();
        break;
    }
  }

  private expandWidget() {
    if (this.widgetContainer && this.iframe) {
      this.widgetContainer.style.width = '380px';
      this.widgetContainer.style.height = '600px';
      this.iframe.style.borderRadius = '12px';
    }
  }

  private collapseWidget() {
    if (this.widgetContainer && this.iframe) {
      this.widgetContainer.style.width = '60px';
      this.widgetContainer.style.height = '60px';
      this.iframe.style.borderRadius = '50%';
    }
  }
}

// Create a global instance
declare global {
  interface Window {
    ChatLens: ChatLensWidget;
  }
}

window.ChatLens = new ChatLensWidget();

export default ChatLensWidget;