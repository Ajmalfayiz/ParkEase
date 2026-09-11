const crypto = require("crypto");

const razorpayUrl = "https://api.razorpay.com/v1/orders";

const getRazorpayCredentials = () => {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return null;
  }

  return {
    keyId: RAZORPAY_KEY_ID,
    authorization: `Basic ${Buffer.from(
      `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`
    ).toString("base64")}`,
  };
};

const createPaymentOrder = async (req, res, next) => {
  try {
    const credentials = getRazorpayCredentials();
    const amount = Number(req.body.amount);

    if (!credentials) {
      return res.status(503).json({
        message:
          "Payment gateway is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to Parkease-Backend/.env.",
      });
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        message: "A valid payment amount is required",
      });
    }

    const response = await fetch(razorpayUrl, {
      method: "POST",
      headers: {
        Authorization: credentials.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `parkease_${Date.now()}`,
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: order.error?.description || "Unable to create payment order",
      });
    }

    res.status(201).json({
      keyId: credentials.keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    next(error);
  }
};

const verifyPayment = (req, res, next) => {
  try {
    const {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!orderId || !paymentId || !signature || !secret) {
      return res.status(400).json({
        message: "Incomplete payment verification details",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");
    const expectedBuffer = Buffer.from(expectedSignature);
    const signatureBuffer = Buffer.from(signature);
    const isValid =
      expectedBuffer.length === signatureBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, signatureBuffer);

    if (!isValid) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    res.status(200).json({
      verified: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};
