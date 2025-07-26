import { config } from 'dotenv';
config();

import '@/ai/flows/recommend-suppliers.ts';
import '@/ai/flows/generate-trust-score.ts';