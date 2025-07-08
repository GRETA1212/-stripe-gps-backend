const express = require("express");
const cors = require("cors");
const app = express();
const stripe = require("stripe")("sk_test_your_secret_key_here");

app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "eur",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

// ✅ Correction route
app.post("/correct", (req, res) => {
  const { latitude, longitude, accuracy } = req.body;

  // 🔧 Fake simulated correction (for demo purposes)
  const correctedLat = latitude + (Math.random() - 0.5) * 0.00001; // ~1m jitter
  const correctedLon = longitude + (Math.random() - 0.5) * 0.00001;
  const correctedAccuracy = 0.03; // 3 cm accuracy simulated

  res.json({
    correctedLat,
    correctedLon,
    correctedAccuracy,
  });
});

app.listen(3000, () => {
  console.log("🚀 Stripe backend running!");
});
