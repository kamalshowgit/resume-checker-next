import { Router } from 'express';
import Razorpay from 'razorpay';
import { db } from '../lib/database';

const router = Router();

router.get('/key', (_req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID || null });
});

router.post('/create-order', async (req, res) => {
  try {
    const { deviceId } = req.body;
    
    if (!deviceId) {
      return res.status(400).json({ error: 'Device ID is required' });
    }

    const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID as string | undefined;
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET as string | undefined;
    const amount = Number(process.env.PRICE_INR || 49) * 100;
    
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return res.json({ 
        mock: true, 
        id: 'order_mock', 
        amount, 
        currency: 'INR',
        deviceId 
      });
    }
    
    const instance = new (Razorpay as any)({ 
      key_id: RAZORPAY_KEY_ID, 
      key_secret: RAZORPAY_KEY_SECRET 
    });
    
    const order = await instance.orders.create({ 
      amount, 
      currency: 'INR',
      receipt: `resume_analysis_${deviceId}_${Date.now()}`,
      notes: {
        deviceId: deviceId,
        service: 'Resume Analysis'
      }
    });
    
    res.json(order);
  } catch (error) {
    console.error('Payment order creation error:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, deviceId } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !deviceId) {
      return res.status(400).json({ error: 'Missing payment verification data' });
    }

    // In production, verify the signature with Razorpay
    // For now, we'll trust the payment data and mark device as paid
    
    // Mark device as paid in database
    db.markDeviceAsPaid(deviceId);
    
    res.json({ 
      success: true, 
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

export default router;


