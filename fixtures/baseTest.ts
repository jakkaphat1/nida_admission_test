import { test as base } from '@playwright/test';
import { AdmissionPage } from '../pages/AdmissionPage';
import { ExamsPage } from '../pages/ExamsPage';
import { ApplicationStatusPage } from '../pages/ApplicationStatusPage';
import { CourseAndProgramInformationPage } from '../pages/CourseAndProgramInformationPage';
import { DocumentRequirementPage } from '../pages/DocumentRequirementsPage';
import { PaymentPage } from '../pages/PaymentPage'

type MyFixtures = {
  admissionPage: AdmissionPage;
  examsPage: ExamsPage;
  applicationStatusPage : ApplicationStatusPage
  courseAndprogramInformationPage : CourseAndProgramInformationPage
  documentRequirementsPage : DocumentRequirementPage
  paymentPage : PaymentPage
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
  courseAndprogramInformationPage: async ({ page }, use) => {
    const courseAndprogramInformationPage = new CourseAndProgramInformationPage(page);
    await use(courseAndprogramInformationPage);
  },
  documentRequirementsPage: async ({ page }, use) => {
    const documentRequirementsPage = new DocumentRequirementPage(page);
    await use(documentRequirementsPage);
  },
  paymentPage: async ({ page } , use) => {
    const paymentPage = new PaymentPage(page)
    await use(paymentPage)
  },


});

export { expect } from '@playwright/test';