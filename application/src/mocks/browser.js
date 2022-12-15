import { setupWorker } from 'msw';
import { handlers } from './handlers';

// Configure service worker with the given request handlers
export const worker = setupWorker(...handlers);
