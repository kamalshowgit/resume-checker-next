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

// Middleware for secure admin authentication with ID/Password
const checkSecureAdminAccess = (req: Request, res: Response, next: NextFunction) => {
  const adminId = req.headers['x-admin-id'] || req.body.adminId || req.query.adminId;
  const adminPassword = req.headers['x-admin-password'] || req.body.adminPassword || req.query.adminPassword;
  
  // Hardcoded secure credentials
  const SECURE_ADMIN_ID = 'Kamal3839';
  const SECURE_ADMIN_PASSWORD = 'Kamal@3839';
  
  if (adminId === SECURE_ADMIN_ID && adminPassword === SECURE_ADMIN_PASSWORD) {
    (req as any).userRole = 'secure_admin';
    (req as any).adminId = adminId;
    return next();
  }
  
  res.status(401).json({ 
    error: 'Unauthorized access',
    message: 'Invalid admin credentials'
  });
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
    const stats = db.getStats();
    const recentResumes = db.getAllResumes(10, 0); // Get last 10 resumes
    
    res.json({
      success: true,
      data: {
        database: {
          totalResumes: stats.totalResumes,
          recentUploads: stats.recentUploads,
          storageUsed: 'N/A', // Would need to implement
          lastBackup: new Date().toISOString()
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
        })),
        recentActivity: recentResumes.map(r => ({
          id: r.id,
          name: r.name,
          email: r.email,
          role: r.role,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt
        }))
      },
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

// Database backup endpoint for production monitoring
router.get('/backup', checkAdminAccess, (req: Request, res: Response) => {
  try {
    const allResumes = db.getAllResumes(1000, 0); // Get all resumes (up to 1000)
    
    res.json({
      success: true,
      data: {
        totalRecords: allResumes.length,
        backup: allResumes,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Backup failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Database health check endpoint
router.get('/db-health', checkAdminAccess, (req: Request, res: Response) => {
  try {
    const stats = db.getStats();
    const testQuery = db.getAllResumes(1, 0); // Test query
    
    res.json({
      success: true,
      status: 'healthy',
      database: 'connected',
      stats: {
        totalResumes: stats.totalResumes,
        recentUploads: stats.recentUploads
      },
      testQuery: testQuery.length > 0 ? 'successful' : 'no data',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// SECURE ADMIN ENDPOINTS - Require ID/Password authentication

// Get all data with secure authentication
router.get('/secure/all-data', checkSecureAdminAccess, (req: Request, res: Response) => {
  try {
    const stats = db.getStats();
    const allResumes = db.getAllResumes(10000, 0); // Get all resumes (up to 10,000)
    
    // Format the data for easy export
    const formattedData = {
      exportInfo: {
        exportedBy: (req as any).adminId,
        exportDate: new Date().toISOString(),
        totalRecords: allResumes.length,
        environment: process.env.NODE_ENV || 'development'
      },
      summary: {
        totalResumes: stats.totalResumes,
        recentUploads: stats.recentUploads,
        averageATSScore: stats.averageATSScore || 0
      },
      resumes: allResumes.map(resume => ({
        id: resume.id,
        personalInfo: {
          name: resume.name,
          email: resume.email,
          phone: resume.phone,
          linkedin: resume.linkedin,
          location: resume.location
        },
        professionalInfo: {
          role: resume.role,
          experienceYears: resume.experienceYears,
          skills: resume.skills ? JSON.parse(resume.skills) : null,
          education: resume.education
        },
        analysisResults: {
          atsScore: resume.atsScore,
          atsBreakdown: resume.atsBreakdown ? JSON.parse(resume.atsBreakdown) : null,
          analysisResults: resume.analysisResults ? JSON.parse(resume.analysisResults) : null
        },
        fileInfo: {
          fileType: resume.fileType,
          fileSize: resume.fileSize,
          uploadSource: resume.uploadSource
        },
        timestamps: {
          createdAt: resume.createdAt,
          updatedAt: resume.updatedAt
        },
        fullResumeText: resume.resumeText,
        extractedData: resume.extractedData ? JSON.parse(resume.extractedData) : null
      }))
    };
    
    res.json({
      success: true,
      message: 'All data exported successfully',
      data: formattedData,
      userRole: (req as any).userRole,
      adminId: (req as any).adminId
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to export data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get CSV export of all data
router.get('/secure/export-csv', checkSecureAdminAccess, (req: Request, res: Response) => {
  try {
    const allResumes = db.getAllResumes(10000, 0);
    
    // Create CSV headers
    const csvHeaders = [
      'ID', 'Name', 'Email', 'Phone', 'LinkedIn', 'Location', 'Role', 
      'Experience Years', 'Skills', 'Education', 'ATS Score', 'File Type', 
      'File Size', 'Upload Source', 'Created At', 'Updated At'
    ];
    
    // Create CSV rows
    const csvRows = allResumes.map(resume => [
      resume.id,
      resume.name || '',
      resume.email || '',
      resume.phone || '',
      resume.linkedin || '',
      resume.location || '',
      resume.role || '',
      resume.experienceYears || '',
      resume.skills || '',
      resume.education || '',
      resume.atsScore || '',
      resume.fileType || '',
      resume.fileSize || '',
      resume.uploadSource || '',
      resume.createdAt || '',
      resume.updatedAt || ''
    ]);
    
    // Combine headers and rows
    const csvContent = [csvHeaders, ...csvRows]
      .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="resume_data_export_${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csvContent);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to export CSV',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get statistics with secure authentication
router.get('/secure/stats', checkSecureAdminAccess, (req: Request, res: Response) => {
  try {
    const stats = db.getStats();
    const recentResumes = db.getAllResumes(20, 0);
    const topResumes = db.getTopResumes(10);
    
    res.json({
      success: true,
      data: {
        summary: {
          totalResumes: stats.totalResumes,
          recentUploads: stats.recentUploads,
          averageATSScore: stats.averageATSScore || 0
        },
        recentActivity: recentResumes.map(r => ({
          id: r.id,
          name: r.name,
          email: r.email,
          role: r.role,
          atsScore: r.atsScore,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt
        })),
        topPerformers: topResumes.map(r => ({
          id: r.id,
          name: r.name,
          email: r.email,
          role: r.role,
          atsScore: r.atsScore,
          createdAt: r.createdAt
        }))
      },
      userRole: (req as any).userRole,
      adminId: (req as any).adminId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to get statistics',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
