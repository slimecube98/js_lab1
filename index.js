const TransactionAnalyzer = require('./TransactionAnalyzer');
const transactions = require('./transaction.json');

const printTable = (logMessage, data) => {
    console.info(logMessage);
    const formattedData = Array.isArray(data) ? data : [data];
    if (!formattedData.length) {
        console.info([]);
        return;
    }
    console.table(formattedData, Object.keys(formattedData[0] || {}));
};

// Создание экземпляра TransactionAnalyzer
const analyzer = new TransactionAnalyzer(transactions);

// Пример использования getAllTransactions
printTable('Все транзакции:', analyzer.getAllTransactions());

// Пример использования addTransaction
console.info('Добавление новой транзакции...');
printTable('Транзакция для добавления', {
    transaction_id: '999',
    transaction_date: '2025-04-03',
    transaction_amount: 150,
    transaction_type: 'debit',
    transaction_description: 'Electronics',
    merchant_name: 'ElectroShop',
    card_type: 'Visa'
});
analyzer.addTransaction('999', '2025-04-03', 150, 'debit', 'Electronics', 'ElectroShop', 'Visa');

// Пример использования getAllTransactions
printTable('Все транзакции:', analyzer.getAllTransactions());

// Пример использования getUniqueTransactionType
console.info('Уникальные типы транзакций:', analyzer.getUniqueTransactionType());

// Пример использования calculateTotalAmount
console.info('Общая сумма транзакций:', analyzer.calculateTotalAmount());

// Пример использования calculateTotalAmountByDate
console.info('Общая сумма транзакций за 2025-04-01:', analyzer.calculateTotalAmountByDate(2025, 4, 1));

// Пример использования getTransactionByType
printTable('Дебетовые транзакции:', analyzer.getTransactionByType('debit'));

// Пример использования getTransactionsInDateRange
printTable('Транзакции с 2025-04-01 по 2025-04-02:', analyzer.getTransactionsInDateRange('2025-04-01', '2025-04-02'));

// Пример использования getTransactionsByMerchant
printTable('Транзакции от CarWashXYZ:', analyzer.getTransactionsByMerchant('CarWashXYZ'));

// Пример использования calculateAverageTransactionAmount
console.info('Средняя сумма транзакций:', analyzer.calculateAverageTransactionAmount());

// Пример использования getTransactionsByAmountRange
printTable('Транзакции в диапазоне от 50 до 150:', analyzer.getTransactionsByAmountRange(50, 150));

// Пример использования calculateTotalDebitAmount
console.info('Общая сумма дебетовых транзакций:', analyzer.calculateTotalDebitAmount());

// Пример использования findMostTransactionsMonth
console.info('Месяц с наибольшим количеством транзакций:', analyzer.findMostTransactionsMonth());

// Пример использования findMostDebitTransactionMonth
console.info('Месяц с наибольшим количеством дебетовых транзакций:', analyzer.findMostDebitTransactionMonth());

// Пример использования mostTransactionType
console.info('Наиболее частый тип транзакций:', analyzer.mostTransactionType());

// Пример использования getTransactionsBeforeDate
printTable('Транзакции до 2025-04-02:', analyzer.getTransactionsBeforeDate('2025-04-02'));

// Пример использования findTransactionById
printTable('Транзакция с ID 1:', analyzer.findTransactionById('1'));

// Пример использования mapTransactionDescriptions
console.log('Описания транзакций:', analyzer.mapTransactionDescriptions());