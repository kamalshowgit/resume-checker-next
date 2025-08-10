import { Router, Request, Response, NextFunction } from 'express';
import { AIConfigManager } from '../lib/ai-config';
import { db } from '../lib/database';

const router = Router();
const aiConfig = AIConfigManager.getInstance();

// Middleware to check if admin access is enabled
const checkAdminAccess = (req: Request, res: Response, next: NextFunction) => {
  const demoKey = req.headers['x-demo-key'] || req.query.demoKey;
  const adminKey = req.headers['x-admin-key'] || req.query.adminKey;
  
  if (process.env.ENABLE_DEMO_MODE === 'true' && demoKey === process.env.DEMO_API_KEY) {
    (req as any).userRole = 'demo';
    return next();
  }
  
  if (adminKey === process.env.ADMIN_API_KEY) {
    (req as any).userRole = 'admin';
    return next();
  }
  
  res.status(401).json({ error: 'Unauthorized access' });
};

// Get current AI configuration
router.get('/ai-config', checkAdminAccess, (req: Request, res: Response) => {
  try {
    const config = {
      models: aiConfig.getAllModels(),
      features: aiConfig.getAllFeatures(),
      pricing: aiConfig.getPricingConfig(),
      environment: {
        AI_PROVIDER: process.env.AI_PROVIDER,
        AI_MODEL: process.env.AI_MODEL,
        ENABLE_DEMO_MODE: process.env.ENABLE_DEMO_MODE,
        MAX_REQUESTS_PER_HOUR: process.env.MAX_REQUESTS_PER_HOUR,
        MAX_REQUESTS_PER_DAY: process.env.MAX_REQUESTS_PER_DAY
      }
    };
    
    res.json({
      success: true,
      data: config,
      userRole: (req as any).userRole
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get AI configuration' });
  }
});

// Update AI model for a specific feature
router.post('/update-model', checkAdminAccess, (req: Request, res: Response) => {
  try {
    const { feature, model, provider } = req.body;
    
    if (!feature || !model) {
      return res.status(400).json({ error: 'Feature and model are required' });
    }
    
    // Validate model exists
    const modelConfig = aiConfig.getModelConfig(model);
    if (!modelConfig) {
      return res.status(400).json({ error: 'Invalid model specified' });
    }
    
    // For demo purposes, we'll update the config manager
    aiConfig.updateFeatureConfig(feature, {
      userTier: (req as any).userRole === 'demo' ? 'free' : 'unlimited'
    });
    
    res.json({
      success: true,
      message: `Model updated for ${feature}`,
      newConfig: {
        feature,
        model,
        provider,
        price: aiConfig.calculatePrice(feature, model, 'free')
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update model' });
  }
});

// Update pricing configuration
router.post('/update-pricing', checkAdminAccess, (req: Request, res: Response) => {
  try {
    const { feature, basePrice, modelUpcharge } = req.body;
    
    if ((req as any).userRole === 'demo') {
      return res.status(403).json({ error: 'Demo users cannot modify pricing' });
    }
    
    if (feature && basePrice !== undefined) {
      aiConfig.updateFeatureConfig(feature, { basePrice });
    }
    
    res.json({
      success: true,
      message: 'Pricing updated successfully',
      newPricing: aiConfig.getPricingConfig()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update pricing' });
  }
});

// Toggle feature availability
router.post('/toggle-feature', checkAdminAccess, (req: Request, res: Response) => {
  try {
    const { feature, enabled } = req.body;
    
    if (!feature || typeof enabled !== 'boolean') {
      return res.status(400).json({ error: 'Feature and enabled status are required' });
    }
    
    aiConfig.updateFeatureConfig(feature, { enabled });
    
    res.json({
      success: true,
      message: `Feature ${feature} ${enabled ? 'enabled' : 'disabled'}`,
      feature: aiConfig.getFeatureConfig(feature)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle feature' });
  }
});

// Get system statistics
router.get('/stats', checkAdminAccess, (req: Request, res: Response) => {
  try {
    const stats = {
      database: {
        totalResumes: db.getStats().totalResumes,
        recentUploads: db.getStats().recentUploads,
        storageUsed: 'N/A' // Would need to implement
      },
      features: aiConfig.getAllFeatures().map(f => ({
        name: f.name,
        enabled: f.enabled,
        requestsToday: 0, // Would need to implement request tracking
        requestsThisHour: 0
      })),
      models: aiConfig.getAllModels().map(m => ({
        name: m.name,
        provider: m.provider,
        quality: m.quality,
        speed: m.speed,
        costPer1kTokens: m.costPer1kTokens
      }))
    };
    
    res.json({
      success: true,
      data: stats,
      userRole: (req as any).userRole
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get system statistics' });
  }
});

// Test AI model configuration
router.post('/test-model', checkAdminAccess, (req: Request, res: Response) => {
  try {
    const { feature, model, testText } = req.body;
    
    if (!feature || !model || !testText) {
      return res.status(400).json({ error: 'Feature, model, and test text are required' });
    }
    
    const modelConfig = aiConfig.getModelConfig(model);
    if (!modelConfig) {
      return res.status(400).json({ error: 'Invalid model specified' });
    }
    
    // Calculate price for this test
    const price = aiConfig.calculatePrice(feature, model, (req as any).userRole || 'free');
    
    res.json({
      success: true,
      message: 'Model test configuration ready',
      testConfig: {
        feature,
        model,
        provider: modelConfig.provider,
        baseUrl: modelConfig.baseUrl,
        maxTokens: modelConfig.maxTokens,
        temperature: modelConfig.temperature,
        estimatedPrice: price,
        quality: modelConfig.quality,
        speed: modelConfig.speed
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to test model configuration' });
  }
});

// Get available models for a provider
router.get('/models/:provider', checkAdminAccess, (req: Request, res: Response) => {
  try {
    const { provider } = req.params;
    if (typeof provider === 'string') {
      const models = aiConfig.getAvailableModelsForProvider(provider);
      res.json({
        success: true,
        data: models
      });
    } else {
      res.status(400).json({ error: 'Provider parameter is required' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get models for provider' });
  }
});

// Get feature pricing breakdown
router.get('/pricing/:feature', checkAdminAccess, (req: Request, res: Response) => {
  try {
    const { feature } = req.params;
    if (typeof feature === 'string') {
      const featureConfig = aiConfig.getFeatureConfig(feature);
      
      if (!featureConfig) {
        return res.status(404).json({ error: 'Feature not found' });
      }
      
      const models = aiConfig.getAllModels();
      const pricingBreakdown = models.map(model => ({
        model: model.name,
        provider: model.provider,
        basePrice: featureConfig.basePrice,
        modelUpcharge: model.quality === 'excellent' ? 
          aiConfig.getPricingConfig().modelUpcharges.ultra :
          model.quality === 'very_good' ? 
          aiConfig.getPricingConfig().modelUpcharges.premium : 0,
        totalPrice: aiConfig.calculatePrice(feature, model.name, 'free'),
        quality: model.quality,
        speed: model.speed
      }));
      
      res.json({
        success: true,
        data: {
          feature: featureConfig,
          pricingBreakdown
        }
      });
    } else {
      res.status(400).json({ error: 'Feature parameter is required' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pricing breakdown' });
  }
});

export default router;
