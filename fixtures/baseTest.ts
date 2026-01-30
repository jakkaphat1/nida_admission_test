import { test as base } from '@playwright/test';
import { AdmissionPage } from '../pages/AdmissionPage';
import { ExamsPage } from '../pages/ExamsPage';
import { ApplicationStatusPage } from '../pages/ApplicationStatusPage';

type MyFixtures = {
  admissionPage: AdmissionPage;
  examsPage: ExamsPage;
  applicationStatusPage : ApplicationStatusPage
};

export const test = base.extend<MyFixtures>({
  admissionPage: async ({ page }, use) => {
    const admissionPage = new AdmissionPage(page);
    await use(admissionPage);
  },
  examsPage: async ({ page }, use) => {
    const examsPage = new ExamsPage(page);
    await use(examsPage);
  },
  applicationStatusPage: async ({ page }, use) => {
    const applicationStatusPage = new ApplicationStatusPage(page);
    await use(applicationStatusPage);
  },

});

export { expect } from '@playwright/test';