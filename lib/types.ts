// types.ts
export interface IncomeEntry {
    id: string; // Pastikan menggunakan string untuk konsistensi
    amount: number;
    source: string;
    date: string;
    notes?: string;
  }
  