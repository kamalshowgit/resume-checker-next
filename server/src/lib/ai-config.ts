export interface AIModelConfig {
  name: string;
  provider: string;
  baseUrl: string;
  apiKey: string;
  maxTokens: number;
  temperature: number;
  costPer1kTokens: number;
  speed: 'fast' | 'medium' | 'slow';
  quality: 'good' | 'very_good' | 'excellent';
}

export interface FeatureConfig {
  name: string;
  enabled: boolean;
  basePrice: number;
  modelUpcharge: number;
  maxRequestsPerHour: number;
  maxRequestsPerDay: number;
  userTier: 'free' | 'premium' | 'unlimited';
}

export interface PricingConfig {
  basePrices: {
    resumeAnalysis: number;
    atsScoring: number;
    contentImprovement: number;
    chatAssistant: number;
    jobSearch: number;
  };
  modelUpcharges: {
    premium: number;
    ultra: number;
  };
  userTiers: {
    free: number;
    premium: number;
    unlimited: number;
  };
}

export class AIConfigManager {
  private static instance: AIConfigManager;
  private models: Map<string, AIModelConfig> = new Map();
  private features: Map<string, FeatureConfig> = new Map();
  private pricing!: PricingConfig;
  private initialized = false;

  private constructor() {
    // Don't initialize here, wait for first access
  }

  public static getInstance(): AIConfigManager {
    if (!AIConfigManager.instance) {
      AIConfigManager.instance = new AIConfigManager();
    }
    return AIConfigManager.instance;
  }

  private ensureInitialized() {
    if (!this.initialized) {
      this.initializeModels();
      this.initializeFeatures();
      this.initializePricing();
      this.initialized = true;
    }
  }

  private initializeModels() {
    // Groq Models - Updated to use current available models
    this.models.set('llama-3.1-8b-instant', {
      name: 'llama-3.1-8b-instant',
      provider: 'groq',
      baseUrl: 'https://api.groq.com/openai/v1',
      apiKey: process.env.GROQ_API_KEY || '',
      maxTokens: 8192,
      temperature: 0.2,
      costPer1kTokens: 0.05,
      speed: 'fast',
      quality: 'good'
    });

    this.models.set('llama-3.3-70b-versatile', {
      name: 'llama-3.3-70b-versatile',
      provider: 'groq',
      baseUrl: 'https://api.groq.com/openai/v1',
      apiKey: process.env.GROQ_API_KEY || '',
      maxTokens: 8192,
      temperature: 0.2,
      costPer1kTokens: 0.24,
      speed: 'slow',
      quality: 'excellent'
    });

    this.models.set('meta-llama/llama-4-maverick-17b-128e-instruct', {
      name: 'meta-llama/llama-4-maverick-17b-128e-instruct',
      provider: 'groq',
      baseUrl: 'https://api.groq.com/openai/v1',
      apiKey: process.env.GROQ_API_KEY || '',
      maxTokens: 32768,
      temperature: 0.2,
      costPer1kTokens: 0.14,
      speed: 'medium',
      quality: 'very_good'
    });

    // OpenAI Models
    this.models.set('gpt-3.5-turbo', {
      name: 'gpt-3.5-turbo',
      provider: 'openai',
      baseUrl: 'https://api.openai.com/v1',
      apiKey: process.env.OPENAI_API_KEY || '',
      maxTokens: 4096,
      temperature: 0.2,
      costPer1kTokens: 0.0015,
      speed: 'fast',
      quality: 'very_good'
    });

    this.models.set('gpt-4', {
      name: 'gpt-4',
      provider: 'openai',
      baseUrl: 'https://api.openai.com/v1',
      apiKey: process.env.OPENAI_API_KEY || '',
      maxTokens: 8192,
      temperature: 0.2,
      costPer1kTokens: 0.03,
      speed: 'medium',
      quality: 'excellent'
    });

    // Anthropic Models
    this.models.set('claude-3-haiku-20240307', {
      name: 'claude-3-haiku-20240307',
      provider: 'anthropic',
      baseUrl: 'https://api.anthropic.com/v1',
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      maxTokens: 4096,
      temperature: 0.2,
      costPer1kTokens: 0.00025,
      speed: 'fast',
      quality: 'very_good'
    });
  }

  private initializeFeatures() {
    this.features.set('resumeAnalysis', {
      name: 'Resume Analysis',
      enabled: process.env.ENABLE_RESUME_ANALYSIS === 'true',
      basePrice: Number(process.env.PRICE_INR) || 49,
      modelUpcharge: Number(process.env.PREMIUM_MODEL_UPCHARGE) || 20,
      maxRequestsPerHour: Number(process.env.MAX_REQUESTS_PER_HOUR) || 100,
      maxRequestsPerDay: Number(process.env.MAX_REQUESTS_PER_DAY) || 1000,
      userTier: 'free'
    });

    this.features.set('atsScoring', {
      name: 'ATS Scoring',
      enabled: process.env.ENABLE_ATS_SCORING === 'true',
      basePrice: Number(process.env.PRICE_INR) || 29,
      modelUpcharge: Number(process.env.PREMIUM_MODEL_UPCHARGE) || 20,
      maxRequestsPerHour: Number(process.env.MAX_REQUESTS_PER_HOUR) || 100,
      maxRequestsPerDay: Number(process.env.MAX_REQUESTS_PER_DAY) || 1000,
      userTier: 'free'
    });

    this.features.set('contentImprovement', {
      name: 'Content Improvement',
      enabled: process.env.ENABLE_CONTENT_IMPROVEMENT === 'true',
      basePrice: Number(process.env.PRICE_INR) || 39,
      modelUpcharge: Number(process.env.PREMIUM_MODEL_UPCHARGE) || 20,
      maxRequestsPerHour: Number(process.env.MAX_REQUESTS_PER_HOUR) || 100,
      maxRequestsPerDay: Number(process.env.MAX_REQUESTS_PER_DAY) || 1000,
      userTier: 'free'
    });

    this.features.set('chatAssistant', {
      name: 'Chat Assistant',
      enabled: process.env.ENABLE_CHAT_ASSISTANT === 'true',
      basePrice: Number(process.env.PRICE_INR) || 19,
      modelUpcharge: Number(process.env.PREMIUM_MODEL_UPCHARGE) || 20,
      maxRequestsPerHour: Number(process.env.MAX_REQUESTS_PER_HOUR) || 100,
      maxRequestsPerDay: Number(process.env.MAX_REQUESTS_PER_DAY) || 1000,
      userTier: 'free'
    });

    this.features.set('jobSearch', {
      name: 'Job Search',
      enabled: process.env.ENABLE_JOB_SEARCH === 'true',
      basePrice: Number(process.env.PRICE_INR) || 25,
      modelUpcharge: Number(process.env.PREMIUM_MODEL_UPCHARGE) || 20,
      maxRequestsPerHour: Number(process.env.MAX_REQUESTS_PER_HOUR) || 100,
      maxRequestsPerDay: Number(process.env.MAX_REQUESTS_PER_DAY) || 1000,
      userTier: 'free'
    });
  }

  private initializePricing() {
    this.pricing = {
      basePrices: {
        resumeAnalysis: 49,
        atsScoring: 29,
        contentImprovement: 39,
        chatAssistant: 19,
        jobSearch: 25
      },
      modelUpcharges: {
        premium: Number(process.env.PREMIUM_MODEL_UPCHARGE) || 20,
        ultra: Number(process.env.ULTRA_MODEL_UPCHARGE) || 50
      },
      userTiers: {
        free: Number(process.env.FREE_TIER_LIMIT) || 5,
        premium: Number(process.env.PREMIUM_TIER_LIMIT) || 100,
        unlimited: Number(process.env.UNLIMITED_TIER_LIMIT) || 999999
      }
    };
  }

  public getModelConfig(modelName: string): AIModelConfig | undefined {
    this.ensureInitialized();
    return this.models.get(modelName);
  }

  public getFeatureConfig(featureName: string): FeatureConfig | undefined {
    this.ensureInitialized();
    return this.features.get(featureName);
  }

  public getPricingConfig(): PricingConfig {
    this.ensureInitialized();
    return this.pricing;
  }

  public calculatePrice(featureName: string, modelName: string, userTier: string = 'free'): number {
    this.ensureInitialized();
    const feature = this.features.get(featureName);
    const model = this.models.get(modelName);
    
    if (!feature || !model) return 0;

    let basePrice = feature.basePrice;
    
    // Add model upcharge based on quality
    if (model.quality === 'excellent') {
      basePrice += this.pricing.modelUpcharges.ultra;
    } else if (model.quality === 'very_good') {
      basePrice += this.pricing.modelUpcharges.premium;
    }

    // Apply user tier discount
    if (userTier === 'premium') {
      basePrice = Math.round(basePrice * 0.8); // 20% discount
    } else if (userTier === 'unlimited') {
      basePrice = Math.round(basePrice * 0.6); // 40% discount
    }

    return basePrice;
  }

  public getAllModels(): AIModelConfig[] {
    this.ensureInitialized();
    return Array.from(this.models.values());
  }

  public getAllFeatures(): FeatureConfig[] {
    this.ensureInitialized();
    return Array.from(this.features.values());
  }

  public updateModelConfig(modelName: string, config: Partial<AIModelConfig>): boolean {
    this.ensureInitialized();
    const existing = this.models.get(modelName);
    if (existing) {
      this.models.set(modelName, { ...existing, ...config });
      return true;
    }
    return false;
  }

  public updateFeatureConfig(featureName: string, config: Partial<FeatureConfig>): boolean {
    this.ensureInitialized();
    const existing = this.features.get(featureName);
    if (existing) {
      this.features.set(featureName, { ...existing, ...config });
      return true;
    }
    return false;
  }

  public getModelForFeature(featureName: string): string {
    this.ensureInitialized();
    const envKey = `AI_MODEL_${featureName.toUpperCase()}`;
    return process.env[envKey] || process.env.AI_MODEL || 'llama-3.1-8b-instant';
  }

  public getProviderForFeature(featureName: string): string {
    this.ensureInitialized();
    // Default to Groq for all features
    const envKey = `AI_PROVIDER_${featureName.toUpperCase()}`;
    return process.env[envKey] || process.env.AI_PROVIDER || 'groq';
  }

  public isFeatureEnabled(featureName: string): boolean {
    this.ensureInitialized();
    const feature = this.features.get(featureName);
    return feature?.enabled || false;
  }

  public getAvailableModelsForProvider(provider: string): AIModelConfig[] {
    this.ensureInitialized();
    return Array.from(this.models.values()).filter(model => model.provider === provider);
  }

  public getModelQuality(modelName: string): 'good' | 'very_good' | 'excellent' | 'unknown' {
    this.ensureInitialized();
    const model = this.models.get(modelName);
    return model?.quality || 'unknown';
  }

  public getModelSpeed(modelName: string): 'fast' | 'medium' | 'slow' | 'unknown' {
    this.ensureInitialized();
    const model = this.models.get(modelName);
    return model?.speed || 'unknown';
  }
}
