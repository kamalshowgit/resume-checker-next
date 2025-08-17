import { Router } from 'express';
import { db } from '../lib/database';

const router = Router();

// PayPal configuration
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || "AaAYXnukym9O07d6-ykRVQ9CfYVCxMMcDDHYKg1SZRRq7HNxOUifg1qlzSFc9URGlm6aE2V_upadewsg";
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || "EGgX1gFu1Z60oJlP9vLTBsWeN9kCyTGjv1n0cTkEmkKtaOwsf4zikHbPJ3kgcVVvb1MNhbbQg5_S6LwX";
const PAYPAL_BASE_URL = process.env.NODE_ENV === 'production' 
  ? (process.env.PAYPAL_BASE_URL || 'https://api-m.paypal.com')
  : 'https://api-m.sandbox.paypal.com';

// Get PayPal access token
async function getPayPalAccessToken(): Promise<string> {
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    
    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
      throw new Error(`PayPal auth failed: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('PayPal access token error:', error);
    throw new Error('Failed to get PayPal access token');
  }
}

router.get('/key', (_req, res) => {
  res.json({ 
    clientId: PAYPAL_CLIENT_ID,
    baseUrl: PAYPAL_BASE_URL,
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
  });
});

// Create PayPal order
router.post('/create-paypal-order', async (req, res) => {
  try {
    const { deviceId, amount } = req.body;
    
    if (!deviceId) {
      return res.status(400).json({ error: 'Device ID is required' });
    }

    const accessToken = await getPayPalAccessToken();
    
    // Create PayPal order
    const orderResponse = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: '0.60' // $0.60 USD equivalent to ₹49
          },
          description: 'Resume Analysis Service',
          custom_id: deviceId
        }],
        application_context: {
          return_url: `${process.env.APP_URL || 'http://localhost:3000'}/payment/success`,
          cancel_url: `${process.env.APP_URL || 'http://localhost:3000'}/payment/cancel`
        }
      })
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      console.error('PayPal order creation error:', errorData);
      throw new Error('Failed to create PayPal order');
    }

    const orderData = await orderResponse.json();
    
    res.json({
      success: true,
      orderID: orderData.id,
      status: orderData.status
    });

  } catch (error) {
    console.error('PayPal order creation error:', error);
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
});

// Verify PayPal payment
router.post('/verify-paypal', async (req, res) => {
  try {
    const { orderID, payerID, deviceId, paymentDetails } = req.body;
    
    if (!orderID || !payerID || !deviceId) {
      return res.status(400).json({ error: 'Missing payment verification data' });
    }

    // Verify the payment with PayPal
    const accessToken = await getPayPalAccessToken();
    
    const captureResponse = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!captureResponse.ok) {
      const errorData = await captureResponse.json();
      console.error('PayPal capture error:', errorData);
      throw new Error('Failed to capture PayPal payment');
    }

    const captureData = await captureResponse.json();
    
    // Check if payment was successful
    if (captureData.status === 'COMPLETED') {
      // Mark device as paid in database
      db.markDeviceAsPaid(deviceId);
      
      // Log successful payment
      console.log(`✅ PayPal payment successful for device: ${deviceId}`, {
        orderID,
        payerID,
        amount: captureData.purchase_units[0]?.amount?.value,
        currency: captureData.purchase_units[0]?.amount?.currency_code
      });
      
      res.json({ 
        success: true, 
        message: 'Payment verified successfully',
        paymentId: captureData.id,
        status: captureData.status
      });
    } else {
      throw new Error(`Payment not completed. Status: ${captureData.status}`);
    }

  } catch (error) {
    console.error('PayPal verification error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Legacy Razorpay endpoints (kept for backward compatibility)
router.post('/create-order', async (req, res) => {
  try {
    const { deviceId } = req.body;
    
    if (!deviceId) {
      return res.status(400).json({ error: 'Device ID is required' });
    }

    // Return mock order for legacy support
    res.json({ 
      mock: true, 
      id: 'order_mock', 
      amount: 4900, // ₹49.00 in paise
      currency: 'INR',
      deviceId 
    });
    
  } catch (error) {
    console.error('Legacy order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Check payment status endpoint
router.get('/status/:deviceId', async (req, res) => {
  try {
    const { deviceId } = req.params;
    
    if (!deviceId) {
      return res.status(400).json({ error: 'Device ID is required' });
    }

    // Check device analysis status
    const deviceStatus = db.getDeviceAnalysisStatus(deviceId);
    
    if (!deviceStatus) {
      // New device, no payment required
      return res.json({
        success: true,
        requiresPayment: false,
        analysisCount: 0,
        deviceId
      });
    }

    // Check if device can perform free analysis
    const canPerformFreeAnalysis = db.canPerformFreeAnalysis(deviceId);
    
    if (canPerformFreeAnalysis) {
      // Device can perform free analysis
      return res.json({
        success: true,
        requiresPayment: false,
        analysisCount: deviceStatus.analysisCount,
        deviceId
      });
    }

    // Check if device is paid user
    if (deviceStatus.isPaidUser) {
      // Device is paid, no payment required
      return res.json({
        success: true,
        requiresPayment: false,
        analysisCount: deviceStatus.analysisCount,
        deviceId
      });
    }

    // Device needs payment for additional analysis
    return res.json({
      success: true,
      requiresPayment: true,
      analysisCount: deviceStatus.analysisCount,
      deviceId,
      message: 'You have used your free analysis. Please pay ₹49 for additional analyses.'
    });

  } catch (error) {
    console.error('Payment status check error:', error);
    res.status(500).json({ error: 'Failed to check payment status' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, deviceId } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !deviceId) {
      return res.status(400).json({ error: 'Missing payment verification data' });
    }

    // For legacy support, mark device as paid
    db.markDeviceAsPaid(deviceId);
    
    res.json({ 
      success: true, 
      message: 'Legacy payment verified successfully',
      paymentId: razorpay_payment_id
    });
  } catch (error) {
    console.error('Legacy payment verification error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

export default router;


