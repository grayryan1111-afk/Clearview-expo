
import api from './client';

export async function createTextQuote(prompt) {
  const res = await api.post('/api/openai/text', { prompt });
  return res.data.output;
}
