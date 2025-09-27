export class RetryHelper {
  static async retry<T>(fn: () => Promise<T>, retries: number = 3): Promise<T> {
    let attempt = 0;
    while (attempt < retries) {
      try { return await fn(); } 
      catch (e) { attempt++; if (attempt === retries) throw e; }
    }
    throw new Error('Max retries reached');
  }
}