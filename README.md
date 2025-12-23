# Playwright Automation Framework (TypeScript)

This repository contains a **Playwright + TypeScript end-to-end automation framework** built to validate real-world web applications.  
It follows **Page Object Model (POM)** principles, uses reusable sign-in utilities, and integrates modern tooling to improve reliability, reporting, and realism.

This project is designed to demonstrate **professional-grade UI automation**, including handling dynamic content, flaky behavior, and modern bot-detection mechanisms.

---

## 🚀 Tech Stack

- **Playwright**
- **TypeScript**
- **Node.js**
- **Allure Test Reporter**
- **Faker.js**
- **Playwright Extra (Stealth & reCAPTCHA plugins)**

---

## 📁 Project Structure

```text
├── Pages (POM)/                 # Page Object Model layer
│   ├── home.page.ts
│   ├── cart.page.ts
│   └── components/
│
├── SignInUtils/                 # Authentication & global setup
│   └── globalSetup.ts
│
├── tests/                       # Main test suites
│   ├── YahooFinance.spec.ts
│   ├── MobyGamesSite.spec.ts
│   ├── FakerJS.Inputs.spec.ts
│   ├── pomUploadFile.spec.ts
│   └── example.spec.ts
│
├── tests-examples/              # Playwright reference examples
│   └── demo-todo-app.spec.ts
│
├── playwright.config.ts
├── package.json
├── playwright-report/
├── test-results/
└── README.md
```

---

## 🧪 Test Suites Overview

### 📈 YahooFinance.spec.ts
- Validates real-time stock price visibility
- Handles dynamic DOM updates and page refreshes
- Detects flaky behavior caused by live market data

---

### 🎮 MobyGamesSite.spec.ts
- Verifies navigation links and page routing
- Confirms visibility and clickability of UI elements
- Ensures correct page loads after navigation

---

### 🧬 FakerJS.Inputs.spec.ts
- Uses Faker.js to generate realistic input data
- Avoids hard-coded values
- Ensures correct page loads after navigation

---

### 🧱 pomUploadFile.spec.ts
- Demonstrates file upload using POM abstraction
- Clean separation of test logic and UI interaction
- Improves test repeatability and realism

---

## 🧩 Page Object Model (POM)

All locators and UI actions are encapsulated within page classes to ensure:
- Maintainability
- Scalability
- Readable test files

---

## 🔐 SignInUtils

Contains shared authentication and global setup logic to prevent duplicated login code and improve test performance.

---

## 🔌 Plugins & Integrations

### 📊 Allure – Playwright Test Reporter
- Rich execution reports
- Screenshots and failure traces
- CI/CD ready

### 🎭 Faker.js
- Dynamic and realistic test data generation

### 🕵️ Playwright Extra – Stealth Plugin
- Reduces bot detection
- Improves automation reliability

### 🔐 Playwright Extra – reCAPTCHA Plugin
- Supports automation on protected flows

---

## ⚙️ Running the Tests

```bash
npm install -D @playwright/test@latest (Test Runner)
npm install playwright (dependencies & APIs)
npx playwright test
npx playwright show-report
allure serve allure-results
```

---

## 🧠 What This Project Demonstrates

- Real-world Playwright automation
- Flake-resistant design
- Clean TypeScript architecture
- Enterprise-ready tooling

---

## 👤 Author

PapaSmurf79 
Automation Engineer | Playwright | TypeScript
