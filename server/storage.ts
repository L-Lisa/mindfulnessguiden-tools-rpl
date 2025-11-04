// Storage interface - no backend storage needed for this PWA
// All data is stored in localStorage on the frontend

export interface IStorage {
  // PWA uses localStorage for favorites, completion tracking, and settings
}

export class MemStorage implements IStorage {
  constructor() {
    // No server-side storage needed
  }
}

export const storage = new MemStorage();
