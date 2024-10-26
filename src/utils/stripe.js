// src/utils/stripe.js
import { loadStripe } from '@stripe/stripe-js';

// Use environment variable for Stripe public key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default stripePromise;

