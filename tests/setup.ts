import { vi, beforeEach } from 'vitest';

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  debug: vi.fn()
};

// Mock process.env
process.env.NODE_ENV = 'test';

// Mock fetch for tests that might need it
global.fetch = vi.fn();

// Setup any global test utilities
beforeEach(() => {
  vi.clearAllMocks();
});