import { test as base } from '@playwright/test';
import { AdmissionPage } from '../pages/AdmissionPage';

type MyFixtures = {
  admissionPage: AdmissionPage;
};

export const test = base.extend<MyFixtures>({
  admissionPage: async ({ page }, use) => {
    const admissionPage = new AdmissionPage(page);
    await use(admissionPage);
  },
});

export { expect } from '@playwright/test';