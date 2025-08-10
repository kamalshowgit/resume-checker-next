import { Router } from 'express';
import Razorpay from 'razorpay';

const router = Router();

router.get('/key', (_req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID || null });
});

router.post('/create-order', async (_req, res) => {
  const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID as string | undefined;
  const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET as string | undefined;
  const amount = Number(process.env.PRICE_INR || 49) * 100;
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return res.json({ mock: true, id: 'order_mock', amount, currency: 'INR' });
  }
  const instance = new (Razorpay as any)({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
  const order = await instance.orders.create({ amount, currency: 'INR' });
  res.json(order);
});

export default router;


