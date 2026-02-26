import { test as base } from '@playwright/test';
import { AdmissionPage } from '../pages/AdmissionPage';
import { ExamsPage } from '../pages/ExamsPage';
import { ApplicationStatusPage } from '../pages/ApplicationStatusPage';
import { CourseAndProgramInformationPage } from '../pages/CourseAndProgramInformationPage';
import { DocumentRequirementPage } from '../pages/DocumentRequirementsPage';
import { PaymentPage } from '../pages/PaymentPage'
import { ExamAnnoucePage } from '../pages/ExamAnnoucePage';
import { MyAnnoucement } from '../pages/MyAnnoucement';
import { ConfirmRegistration } from '../pages/ConfirmRegistration';
import { MyCalendarPage } from '../pages/MyCalendarPage';
import { EducationReportingPage } from '../pages/EducationReportingPage';
import { MajorSubjectPage } from '../pages/MajorSubjectPage';
import { DepartmentInformationPage } from '../pages/DepartmentInformationPage';

type MyFixtures = {
  admissionPage: AdmissionPage;
  examsPage: ExamsPage;
  applicationStatusPage : ApplicationStatusPage
  courseAndprogramInformationPage : CourseAndProgramInformationPage
  documentRequirementsPage : DocumentRequirementPage
  paymentPage : PaymentPage
  examAnnoucePage : ExamAnnoucePage
  myAnnoucement : MyAnnoucement
  confirmRegistration : ConfirmRegistration
  myCalendarPage : MyCalendarPage
  educationReportingPage : EducationReportingPage
  majorSubjectPage : MajorSubjectPage
  departmentInformationPage : DepartmentInformationPage
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
  examAnnoucePage: async({page} , use) => {
    const examAnnoucePage = new ExamAnnoucePage(page)
    await use(examAnnoucePage)
  },
  myAnnoucement: async ({page} , use) => {
    const myAnnoucement = new MyAnnoucement(page)
    await use(myAnnoucement)
  },
  confirmRegistration: async ({page} , use) => {
    const confirmRegistration = new ConfirmRegistration(page)
    await use(confirmRegistration)
  },
  myCalendarPage: async({page} , use) => {
    const myCalendarPage = new MyCalendarPage(page)
    await use(myCalendarPage)
  },
  educationReportingPage: async ({page} , use) => {
    const educationReportingPage = new EducationReportingPage(page)
    await use(educationReportingPage)
  },
  majorSubjectPage:async ({page} , use) => {
    const majorSubjectPage = new MajorSubjectPage(page)
    await use(majorSubjectPage)
  },
  departmentInformationPage:async ({page} , use)=> {
    const departmentInformationPage = new DepartmentInformationPage(page)
    await use(departmentInformationPage)
  },



});

export { expect } from '@playwright/test';