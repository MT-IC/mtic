import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window | null>('Global window object', {
  factory: () => typeof window !== 'undefined' ? window : null
});