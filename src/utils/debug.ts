// Development debugging utilities for CV application
// Only active in development mode
import { loggingConfig, isDevelopment } from '../config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface DebugConfig {
  enabled: boolean;
  level: LogLevel;
  modules: string[];
  timestamp: boolean;
}

class DebugLogger {
  private config: DebugConfig;
  
  constructor() {
    this.config = {
      enabled: loggingConfig.enabled,
      level: loggingConfig.level,
      modules: loggingConfig.modules,
      timestamp: true
    };
  }

  private shouldLog(level: LogLevel, module?: string): boolean {
    if (!this.config.enabled) return false;
    
    // Check module filter
    if (module && this.config.modules.length > 0) {
      return this.config.modules.includes(module);
    }

    // Check log level
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.config.level);
    const requestedLevelIndex = levels.indexOf(level);
    
    return requestedLevelIndex >= currentLevelIndex;
  }

  private formatMessage(level: LogLevel, module: string | undefined, message: string, data?: any): string {
    const timestamp = this.config.timestamp ? `[${new Date().toISOString()}]` : '';
    const modulePrefix = module ? `[${module}]` : '';
    const levelPrefix = `[${level.toUpperCase()}]`;
    
    let formatted = `${timestamp} ${levelPrefix} ${modulePrefix} ${message}`;
    
    if (data !== undefined) {
      formatted += '\n' + JSON.stringify(data, null, 2);
    }
    
    return formatted;
  }

  debug(message: string, data?: any, module?: string): void {
    if (this.shouldLog('debug', module)) {
      console.debug(this.formatMessage('debug', module, message, data));
    }
  }

  info(message: string, data?: any, module?: string): void {
    if (this.shouldLog('info', module)) {
      console.info(this.formatMessage('info', module, message, data));
    }
  }

  warn(message: string, data?: any, module?: string): void {
    if (this.shouldLog('warn', module)) {
      console.warn(this.formatMessage('warn', module, message, data));
    }
  }

  error(message: string, data?: any, module?: string): void {
    if (this.shouldLog('error', module)) {
      console.error(this.formatMessage('error', module, message, data));
    }
  }

  // Configuration methods
  setLevel(level: LogLevel): void {
    this.config.level = level;
  }

  enableModule(module: string): void {
    if (!this.config.modules.includes(module)) {
      this.config.modules.push(module);
    }
  }

  disableModule(module: string): void {
    this.config.modules = this.config.modules.filter(m => m !== module);
  }

  enable(): void {
    this.config.enabled = true;
  }

  disable(): void {
    this.config.enabled = false;
  }

  // Performance profiling utilities
  profile(name: string): () => void {
    if (!this.config.enabled) return () => {};
    
    const start = performance.now();
    this.debug(`Profile started: ${name}`, undefined, 'PROFILER');
    
    return () => {
      const end = performance.now();
      const duration = end - start;
      this.debug(`Profile completed: ${name} (${duration.toFixed(2)}ms)`, undefined, 'PROFILER');
    };
  }

  // Memory usage tracking
  memory(): void {
    if (!this.config.enabled) return;
    
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in window.performance) {
      const memory = (window.performance as any).memory;
      this.info('Memory usage', {
        used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB`,
        total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)} MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)} MB`
      }, 'MEMORY');
    } else {
      this.warn('Memory profiling not available in this environment', undefined, 'MEMORY');
    }
  }

  // Component render tracking
  renderStart(componentName: string): () => void {
    if (!this.config.enabled) return () => {};
    
    const start = performance.now();
    this.debug(`Render started: ${componentName}`, undefined, 'RENDER');
    
    return () => {
      const end = performance.now();
      const duration = end - start;
      this.debug(`Render completed: ${componentName} (${duration.toFixed(2)}ms)`, undefined, 'RENDER');
    };
  }

  // Parser debugging specific utilities
  parseDebug(section: string, data: any): void {
    this.debug(`Parsed section: ${section}`, data, 'PARSER');
  }

  iconDebug(iconName: string, success: boolean, error?: any): void {
    if (success) {
      this.debug(`Icon processed successfully: ${iconName}`, undefined, 'ICONS');
    } else {
      this.warn(`Icon processing failed: ${iconName}`, error, 'ICONS');
    }
  }

  // Build debugging utilities
  buildInfo(stage: string, info: any): void {
    this.info(`Build stage: ${stage}`, info, 'BUILD');
  }

  // Content change debugging
  contentChange(file: string, hash: string): void {
    this.info(`Content changed: ${file}`, { hash }, 'CONTENT');
  }

  // Error context collection
  collectErrorContext(): any {
    return {
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Node.js',
      url: typeof window !== 'undefined' ? window.location.href : 'N/A',
      memory: typeof window !== 'undefined' && 'performance' in window && 'memory' in (window.performance as any) 
        ? (window.performance as any).memory 
        : null,
      config: this.config
    };
  }
}

// Create singleton instance
export const debug = new DebugLogger();

// CV Parser specific debugging helpers
export const cvDebug = {
  section: (name: string, data: any) => debug.parseDebug(name, data),
  icon: (name: string, success: boolean, error?: any) => debug.iconDebug(name, success, error),
  profile: (name: string) => debug.profile(`CV-${name}`),
  error: (message: string, error: any) => debug.error(message, { error, context: debug.collectErrorContext() }, 'CV-PARSER')
};

// Astro build debugging helpers
export const buildDebug = {
  stage: (name: string, info: any) => debug.buildInfo(name, info),
  content: (file: string, hash: string) => debug.contentChange(file, hash),
  performance: (metric: string, value: number) => debug.info(`Performance: ${metric}`, { value, unit: 'ms' }, 'BUILD-PERF')
};

// Development-only global debug access
if (typeof window !== 'undefined' && isDevelopment()) {
  (window as any).__cvDebug = {
    debug,
    cvDebug,
    buildDebug,
    enableModule: (module: string) => debug.enableModule(module),
    disableModule: (module: string) => debug.disableModule(module),
    setLevel: (level: LogLevel) => debug.setLevel(level),
    memory: () => debug.memory(),
    help: () => {
      console.log(`
CV Debug Console Commands:
- __cvDebug.debug.info('message', data, 'MODULE')
- __cvDebug.enableModule('PARSER') // Enable specific module
- __cvDebug.setLevel('warn') // Set log level
- __cvDebug.memory() // Show memory usage
- __cvDebug.cvDebug.profile('operation')() // Profile operations

Available modules: PARSER, ICONS, RENDER, BUILD, CONTENT, MEMORY, PROFILER
Log levels: debug, info, warn, error
      `);
    }
  };
}

export default debug;