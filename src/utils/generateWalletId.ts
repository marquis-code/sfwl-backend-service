import { createHash } from 'crypto';

export function generateWalletId(name: string, phone: string, email: string): string {
  const hash = createHash('sha256');
  hash.update(name + phone + email);
  return hash.digest('hex').slice(0, 16);
}
