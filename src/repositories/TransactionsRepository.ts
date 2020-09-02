import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];

    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (transaction.type === 'income') {
      this.balance.income += transaction.value;
    } else if (transaction.type === 'outcome') {
      this.balance.outcome += transaction.value;
    }

    this.balance.total = this.balance.income - this.balance.outcome;

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
