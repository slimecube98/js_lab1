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
