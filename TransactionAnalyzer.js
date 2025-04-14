/**
 * Класс для анализа транзакций.
 */
class TransactionAnalyzer {
    /**
     * Создает экземпляр TransactionAnalyzer.
     * @param {Array<Object>} transactions - Массив объектов транзакций.
     */
    constructor(transactions) {
        this.transactions = transactions.map(transaction => ({...transaction, string() {return JSON.stringify(this)}}));
    }

    /**
     * Добавляет новую транзакцию в список.
     * @param {string} transactionId - Уникальный идентификатор транзакции.
     * @param {string} date - Дата транзакции в формате ISO.
     * @param {number} amount - Сумма транзакции.
     * @param {string} type - Тип транзакции (например, 'debit', 'credit').
     * @param {string} description - Описание транзакции.
     * @param {string} merchantName - Имя продавца.
     * @param {string} cardType - Тип карты.
     */
    addTransaction(transactionId, date, amount, type, description, merchantName, cardType) {
        const transaction = {
            transaction_id: transactionId,
            transaction_date: date,
            transaction_amount: amount,
            transaction_type: type,
            transaction_description: description,
            merchant_name: merchantName,
            card_type: cardType,
            string() {return JSON.stringify(this)}
        };

        this.transactions.push(transaction);
    }

    /**
     * Возвращает все транзакции.
     * @returns {Array<Object>} Массив всех транзакций.
     */
    getAllTransactions() {
        return this.transactions;
    }

    /**
     * Возвращает уникальные типы транзакций.
     * @returns {Array<string>} Массив уникальных типов транзакций.
     */
    getUniqueTransactionType() {
        const uniqueTypes = new Set();
        this.transactions.forEach(transaction => {
            uniqueTypes.add(transaction.transaction_type);
        });
        return Array.from(uniqueTypes);
    }

    /**
     * Вычисляет общую сумму всех транзакций.
     * @returns {number} Общая сумма транзакций.
     */
    calculateTotalAmount() {
        return this.transactions.reduce((total, transaction) => {
            return total + transaction.transaction_amount;
        }, 0);
    }

    /**
     * Вычисляет общую сумму транзакций за указанную дату.
     * @param {number} year - Год.
     * @param {number} month - Месяц (1-12).
     * @param {number} day - День.
     * @returns {number} Общая сумма транзакций за указанную дату.
     */
    calculateTotalAmountByDate(year, month, day) {
        const targetDate = new Date(year, month - 1, day);
        return this.transactions.reduce((total, transaction) => {
            const transactionDate = new Date(transaction.transaction_date);
            if (
                transactionDate.getFullYear() === targetDate.getFullYear() &&
                transactionDate.getMonth() === targetDate.getMonth() &&
                transactionDate.getDate() === targetDate.getDate()
            ) {
                return total + transaction.transaction_amount;
            }
            return total;
        }, 0)
    }

    /**
     * Возвращает транзакции указанного типа.
     * @param {string} type - Тип транзакции.
     * @returns {Array<Object>} Массив транзакций указанного типа.
     */
    getTransactionByType(type) {
        return this.transactions.filter(transaction => transaction.transaction_type === type);
    }

    /**
     * Возвращает транзакции в указанном диапазоне дат.
     * @param {string} startDate - Начальная дата в формате ISO.
     * @param {string} endDate - Конечная дата в формате ISO.
     * @returns {Array<Object>} Массив транзакций в указанном диапазоне.
     */
    getTransactionsInDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate >= start && transactionDate <= end;
        });
    }

    /**
     * Возвращает транзакции по имени продавца.
     * @param {string} merchantName - Имя продавца.
     * @returns {Array<Object>} Массив транзакций указанного продавца.
     */
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }

    /**
     * Вычисляет среднюю сумму транзакций.
     * @returns {number} Средняя сумма транзакций.
     */
    calculateAverageTransactionAmount() {
        const totalAmount = this.calculateTotalAmount();
        return totalAmount / this.transactions.length;
    }

    /**
     * Возвращает транзакции в указанном диапазоне сумм.
     * @param {number} minAmount - Минимальная сумма.
     * @param {number} maxAmount - Максимальная сумма.
     * @returns {Array<Object>} Массив транзакций в указанном диапазоне сумм.
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(transaction => {
            return transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount;
        });
    }

    /**
     * Вычисляет общую сумму дебетовых транзакций.
     * @returns {number} Общая сумма дебетовых транзакций.
     */
    calculateTotalDebitAmount() {
        return this.transactions.reduce((total, transaction) => {
            if (transaction.transaction_type === 'debit') {
                return total + transaction.transaction_amount;
            }
            return total;
        }, 0);
    }

    /**
     * Находит месяц с наибольшим количеством транзакций.
     * @returns {number} Номер месяца (1-12) с наибольшим количеством транзакций.
     */
    findMostTransactionsMonth() {
        const monthTransactionsCount = new Map();
        let mostTransactionsMonth = null;
        let maxCount = 0;

        this.transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            const transactionMonth = transactionDate.getMonth() + 1;
            if (monthTransactionsCount.has(transactionMonth)) {
                const currentTransactionsCount = monthTransactionsCount.get(transactionMonth);
                monthTransactionsCount.set(transactionMonth, currentTransactionsCount + 1);
            } else {
                monthTransactionsCount.set(transactionMonth, 1);
            }

            if (mostTransactionsMonth === null || monthTransactionsCount.get(transactionMonth) > maxCount) {
                mostTransactionsMonth = transactionMonth;
                maxCount = monthTransactionsCount.get(transactionMonth);
            }
        })

        return mostTransactionsMonth;
    }

    /**
     * Находит месяц с наибольшим количеством дебетовых транзакций.
     * @returns {number} Номер месяца (1-12) с наибольшим количеством дебетовых транзакций.
     */
    findMostDebitTransactionMonth() {
        const monthDebitTransactionsCount = new Map();
        let mostDebitTransactionsMonth = null;
        let maxCount = 0;

        this.transactions.forEach(transaction => {
            if (transaction.transaction_type === 'debit') {
                const transactionDate = new Date(transaction.transaction_date);
                const transactionMonth = transactionDate.getMonth() + 1;
                if (monthDebitTransactionsCount.has(transactionMonth)) {
                    const currentTransactionsCount = monthDebitTransactionsCount.get(transactionMonth);
                    monthDebitTransactionsCount.set(transactionMonth, currentTransactionsCount + 1);
                } else {
                    monthDebitTransactionsCount.set(transactionMonth, 1);
                }

                if (mostDebitTransactionsMonth === null || monthDebitTransactionsCount.get(transactionMonth) > maxCount) {
                    mostDebitTransactionsMonth = transactionMonth;
                    maxCount = monthDebitTransactionsCount.get(transactionMonth);
                }
            }
        })

        return mostDebitTransactionsMonth;
    }

    /**
     * Определяет наиболее часто встречающийся тип транзакций.
     * @returns {string} Тип транзакции, который встречается чаще всего.
     */
    mostTransactionType() {
        const transactionTypeCount = {
            credit: 0,
            debit: 0
        };

        this.transactions.forEach(transaction => {
            transactionTypeCount[transaction.transaction_type] = (transactionTypeCount[transaction.transaction_type] || 0) + 1;
        })

        if (transactionTypeCount.credit === transactionTypeCount.debit) {
            return 'equal';
        }

        if (transactionTypeCount.credit > transactionTypeCount.debit) {
            return 'credit';
        }

        return 'debit';
    }

    /**
     * Возвращает транзакции, совершенные до указанной даты.
     * @param {string} date - Дата в формате ISO.
     * @returns {Array<Object>} Массив транзакций до указанной даты.
     */
    getTransactionsBeforeDate(date) {
        const targetDate = new Date(date);
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate < targetDate;
        });
    }

    /**
     * Находит транзакцию по ее идентификатору.
     * @param {string} transactionId - Уникальный идентификатор транзакции.
     * @returns {Object|undefined} Найденная транзакция или undefined, если транзакция не найдена.
     */
    findTransactionById(transactionId) {
        return this.transactions.find(transaction => transaction.transaction_id === transactionId);
    }

    /**
     * Возвращает массив описаний всех транзакций.
     * @returns {Array<string>} Массив описаний транзакций.
     */
    mapTransactionDescriptions() {
        return this.transactions.map(transaction => transaction.transaction_description);
    }

}

module.exports = TransactionAnalyzer;