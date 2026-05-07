# QA Portfolio — Automation Testing (Playwright)

![CI](https://github.com/ctrlfaith/qa-portfolio-automation/actions/workflows/playwright.yml/badge.svg)

Automation test suite for [saucedemo.com](https://www.saucedemo.com) using Playwright + JavaScript.  
เป็นส่วนหนึ่งของ QA Portfolio โดยต่อเนื่องจาก [Manual Testing Project](https://github.com/ctrlfaith/qa-portfolio-manual-testing)

---

## Features ที่ครอบคลุม

| Feature | Test Cases | หมายเหตุ |
|---------|-----------|---------|
| Login | TC-A-001 ถึง TC-A-005 | Happy path, locked out, invalid credentials, known bug |
| Cart | TC-A-006 ถึง TC-A-008 | Add, remove, badge count |
| Checkout | TC-A-009 ถึง TC-A-011 | Validation, cancel, complete flow |
| Sorting | TC-A-012 ถึง TC-A-018 | หลาย user type รวม known bugs |

**ผลรวม: 54 tests — Passed 39 / Failed 15 (known bugs)**

---

## Known Bugs ที่ตรวจพบ

Test ที่ fail ตั้งใจให้ fail เพื่อ document bugs ที่พบจากการ manual testing

| TC | Bug | User |
|----|-----|------|
| TC-A-005 | Username เป็น case-sensitive | standard_user |
| TC-A-014 | Sort dropdown ไม่ทำงาน | problem_user |
| TC-A-016 | Sort แล้วขึ้น error popup | error_user |
| TC-A-017 | ราคาสินค้าเรียงผิด | visual_user |
| TC-A-018 | รูปสินค้าแรกแสดงผิด | visual_user |

---

## Project Structure

```
qa-portfolio-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml    # CI/CD pipeline
├── tests/
│   ├── login.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   └── sorting.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

---

## How to Run

**1. Clone และติดตั้ง dependencies**

```bash
git clone https://github.com/ctrlfaith/qa-portfolio-automation.git
cd qa-portfolio-automation
npm ci
```

**2. ติดตั้ง Playwright browsers**

```bash
npx playwright install
```

**3. Run ทุก test**

```bash
npx playwright test
```

**4. Run เฉพาะ browser ที่ต้องการ**

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

**5. Run เฉพาะไฟล์ที่ต้องการ**

```bash
npx playwright test tests/login.spec.js
```

**6. ดู HTML Report**

```bash
npx playwright show-report
```

---

## CI/CD

ทุกครั้งที่ push หรือเปิด Pull Request ไปที่ branch `main` หรือ `master` GitHub Actions จะ run test อัตโนมัติและ upload HTML report ไว้ใน Artifacts (เก็บ 30 วัน)

---

## Tools

- [Playwright](https://playwright.dev/) — Automation framework
- [GitHub Actions](https://github.com/features/actions) — CI/CD
- Browsers: Chromium, Firefox, WebKit

---

## Related Projects

- [API Testing (Postman)](https://github.com/ctrlfaith/qa-portfolio-api-testing)
- [Manual Testing + Bug Report](https://github.com/ctrlfaith/qa-portfolio-manual-testing)
