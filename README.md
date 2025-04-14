# Лабораторная работа: Анализ транзакций

## Описание лабораторной работы

Данный проект представляет собой приложение для анализа транзакций. Оно позволяет работать с данными о транзакциях, предоставляя различные методы для их обработки, фильтрации и анализа.

## Инструкции по запуску проекта

1. Убедитесь, что у вас установлен [Node.js](https://nodejs.org/).
2. Склонируйте репозиторий проекта или скопируйте файлы в локальную директорию.
3. Перейдите в директорию проекта:
   ```bash
   cd /Users/dmitriivasiliev/projects/JS/js_lab1
   ```
4. Запустите приложение:
   ```bash
   node index.js
   ```

## Краткая документация к проекту

### Методы класса `TransactionAnalyzer`

- **`addTransaction(transactionId, date, amount, type, description, merchantName, cardType)`**  
  Добавляет новую транзакцию в список.  
  **Параметры:**  
  - `transactionId` — Уникальный идентификатор транзакции.  
  - `date` — Дата транзакции в формате ISO (например, `2025-04-14`).  
  - `amount` — Сумма транзакции (число).  
  - `type` — Тип транзакции (`debit` или `credit`).  
  - `description` — Описание транзакции (строка).  
  - `merchantName` — Имя продавца (строка).  
  - `cardType` — Тип карты (например, `Visa`, `MasterCard`).  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([]);
  analyzer.addTransaction(
      '001',
      '2025-04-14',
      100.50,
      'debit',
      'Оплата за услуги',
      'Utility Company',
      'Visa'
  );
  console.log(analyzer.getAllTransactions());
  ```

- **`getAllTransactions()`**  
  Возвращает массив всех транзакций.  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' }
  ]);
  console.log(analyzer.getAllTransactions());
  // Вывод:
  // [
  //   { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
  //   { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' }
  // ]
  ```

- **`getUniqueTransactionType()`**  
  Возвращает массив уникальных типов транзакций.  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' },
      { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit' }
  ]);
  console.log(analyzer.getUniqueTransactionType());
  // Вывод:
  // ['debit', 'credit']
   ```
- **`calculateTotalAmount()`**  
  Вычисляет общую сумму всех транзакций.  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' },
      { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit' }
  ]);
  console.log(analyzer.calculateTotalAmount());
  // Вывод:
  // 350.50
    ```

- **`calculateTotalAmountByDate(year, month, day)`**  
  Вычисляет общую сумму транзакций за указанную дату.  

  **Параметры:**  
  - `year` — Год (например, `2025`).  
  - `month` — Месяц (1-12).  
  - `day` — День (1-31).  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-14', transaction_amount: 200.00, transaction_type: 'credit' },
      { transaction_id: '003', transaction_date: '2025-04-15', transaction_amount: 50.00, transaction_type: 'debit' }
  ]);
  console.log(analyzer.calculateTotalAmountByDate(2025, 4, 14));
  // Вывод:
  // 300.50
  ```

- **`getTransactionByType(type)`**  
  Возвращает массив транзакций указанного типа.  

  **Параметры:**  
  - `type` — Тип транзакции (`debit` или `credit`).  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' },
      { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit' }
  ]);
  console.log(analyzer.getTransactionByType('debit'));
  // Вывод:
  // [
  //   { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
  //   { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit' }
  // ]
  ```

  - **`getTransactionsInDateRange(startDate, endDate)`**  
  Возвращает массив транзакций в указанном диапазоне дат.  

  **Параметры:**  
  - `startDate` — Начальная дата в формате ISO (например, `2025-04-01`).  
  - `endDate` — Конечная дата в формате ISO (например, `2025-04-30`).  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' },
      { transaction_id: '003', transaction_date: '2025-05-01', transaction_amount: 50.00, transaction_type: 'debit' }
  ]);
  console.log(analyzer.getTransactionsInDateRange('2025-04-01', '2025-04-30'));
  // Вывод:
  // [
  //   { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
  //   { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' }
  // ]
  ```

  - **`getTransactionsByMerchant(merchantName)`**  
  Возвращает массив транзакций по имени продавца.  

  **Параметры:**  
  - `merchantName` — Имя продавца (строка).  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit', merchant_name: 'Store A' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit', merchant_name: 'Store B' },
      { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit', merchant_name: 'Store A' }
  ]);
  console.log(analyzer.getTransactionsByMerchant('Store A'));
  // Вывод:
  // [
  //   { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit', merchant_name: 'Store A' },
  //   { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit', merchant_name: 'Store A' }
  // ]
  ```

  - **`calculateAverageTransactionAmount()`**  
  Вычисляет среднюю сумму всех транзакций.  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' },
      { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit' }
  ]);
  console.log(analyzer.calculateAverageTransactionAmount());
  // Вывод:
  // 116.83
  ```

  - **`getTransactionsByAmountRange(minAmount, maxAmount)`**  
  Возвращает массив транзакций в указанном диапазоне сумм.  

  **Параметры:**  
  - `minAmount` — Минимальная сумма транзакции (число).  
  - `maxAmount` — Максимальная сумма транзакции (число).  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' },
      { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit' }
  ]);
  console.log(analyzer.getTransactionsByAmountRange(50, 150));
  // Вывод:
  // [
  //   { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
  //   { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit' }
  // ]
  ```

  - **`calculateTotalDebitAmount()`**  
  Вычисляет общую сумму всех дебетовых транзакций.  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' },
      { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit' }
  ]);
  console.log(analyzer.calculateTotalDebitAmount());
  // Вывод:
  // 150.50
  ```

  - **`findMostTransactionsMonth()`**  
  Находит месяц с наибольшим количеством транзакций.  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' },
      { transaction_id: '003', transaction_date: '2025-05-01', transaction_amount: 50.00, transaction_type: 'debit' },
      { transaction_id: '004', transaction_date: '2025-04-20', transaction_amount: 75.00, transaction_type: 'credit' }
  ]);
  console.log(analyzer.findMostTransactionsMonth());
  // Вывод:
  // 4 (Апрель)
  ```

  - **`findMostDebitTransactionMonth()`**  
  Находит месяц с наибольшим количеством дебетовых транзакций.  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' },
      { transaction_id: '003', transaction_date: '2025-05-01', transaction_amount: 50.00, transaction_type: 'debit' },
      { transaction_id: '004', transaction_date: '2025-04-20', transaction_amount: 75.00, transaction_type: 'debit' }
  ]);
  console.log(analyzer.findMostDebitTransactionMonth());
  // Вывод:
  // 4 (Апрель)
  ```

  - **`mostTransactionType()`**  
  Определяет наиболее часто встречающийся тип транзакций.  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' },
      { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit' },
      { transaction_id: '004', transaction_date: '2025-04-17', transaction_amount: 75.00, transaction_type: 'debit' }
  ]);
  console.log(analyzer.mostTransactionType());
  // Вывод:
  // 'debit'
  ```

  - **`getTransactionsBeforeDate(date)`**  
  Возвращает массив транзакций, совершенных до указанной даты.  

  **Параметры:**  
  - `date` — Дата в формате ISO (например, `2025-04-15`).  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' },
      { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit' }
  ]);
  console.log(analyzer.getTransactionsBeforeDate('2025-04-15'));
  // Вывод:
  // [
  //   { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' }
  // ]
  ```

  - **`findTransactionById(transactionId)`**  
  Находит транзакцию по ее идентификатору.  

  **Параметры:**  
  - `transactionId` — Уникальный идентификатор транзакции (строка).  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' },
      { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit' }
  ]);
  console.log(analyzer.findTransactionById('002'));
  // Вывод:
  // { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit' }
  ```

  - **`mapTransactionDescriptions()`**  
  Возвращает массив описаний всех транзакций.  

  **Пример использования:**
  ```javascript
  const analyzer = new TransactionAnalyzer([
      { transaction_id: '001', transaction_date: '2025-04-14', transaction_amount: 100.50, transaction_type: 'debit', description: 'Оплата за услуги' },
      { transaction_id: '002', transaction_date: '2025-04-15', transaction_amount: 200.00, transaction_type: 'credit', description: 'Возврат средств' },
      { transaction_id: '003', transaction_date: '2025-04-16', transaction_amount: 50.00, transaction_type: 'debit', description: 'Покупка продуктов' }
  ]);
  console.log(analyzer.mapTransactionDescriptions());
  // Вывод:
  // ['Оплата за услуги', 'Возврат средств', 'Покупка продуктов']
  ```

## Контрольные вопросы

1. **Какие примитивные типы данных существуют в JavaScript?**  
   В JavaScript существуют следующие примитивные типы данных:  
   - `string` (строка)  
   - `number` (число)  
   - `boolean` (логический тип)  
   - `undefined` (неопределенное значение)  
   - `symbol` (уникальный идентификатор)  
   - `bigint` (большие числа)  

2. **Какие методы массивов вы использовали для обработки и анализа данных в вашем приложении, и как они помогли в выполнении задачи?**  
   В проекте использовались следующие методы массивов:  
   - `map()` — для преобразования массива, например, получения массива описаний транзакций.  
   - `filter()` — для фильтрации транзакций по типу, диапазону дат, суммам и другим критериям.  
   - `reduce()` — для вычисления общей суммы транзакций.  
   - `forEach()` — для итерации по массиву и выполнения операций над каждым элементом.  

3. **В чем состоит роль конструктора класса?**  
   Конструктор класса используется для инициализации нового объекта. В данном проекте конструктор класса `TransactionAnalyzer` принимает массив транзакций и сохраняет его в свойстве объекта, чтобы методы класса могли работать с этими данными.  

4. **Каким образом вы можете создать новый экземпляр класса в JavaScript?**  
   Новый экземпляр класса создается с помощью ключевого слова `new`. Например:  
   ```javascript
   const analyzer = new TransactionAnalyzer(transactions);
   ```
