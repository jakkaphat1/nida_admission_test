import { test as base } from '@playwright/test';
import { CommonPage } from '../pages/CommonPaeg';
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
import { FacultyInformationPage } from '../pages/FacultyInformationPage';
import { EducationCenterInformationPage } from '../pages/EducationCenterInformationPage';
import { AdmissionScheduleInformationPage } from '../pages/AdmissionScheduleInformationPage';
import { AdmissionCalendarInformationPage } from '../pages/AdmissionCalendarIInformationPage';
import { CourseOpenPage } from '../pages/CourseOpenPage';
import { SubjectWrittenExamPage } from '../pages/SubjectWrittenExamPage';
import { VerifyWrittenExamApplicationPage } from '../pages/VerifyWrittenExamApplicationPage';
import { EligibleWrittenExamPage } from '../pages/EligibleWrittenExamPage';
type MyFixtures = {
  commonPage : CommonPage;
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
  facultyInformationPage : FacultyInformationPage
  educationCenterInformationPage : EducationCenterInformationPage
  admissionScheduleInformationPage : AdmissionScheduleInformationPage
  admissionCalendarInformationPage : AdmissionCalendarInformationPage
  courseOpenPage : CourseOpenPage
  subjectWrittenExam : SubjectWrittenExamPage
  verifyWrittenExamApplicationPage : VerifyWrittenExamApplicationPage
  eligibleWrittenExamPage : EligibleWrittenExamPage
};

export const test = base.extend<MyFixtures>({
  commonPage:async ({page}, use)=> {
    const commonPage = new CommonPage(page);
    await use(commonPage)
  },
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
  facultyInformationPage:async ({page} ,use) => {
    const facultyInformationPage = new FacultyInformationPage(page)
    await use(facultyInformationPage)
  },
  educationCenterInformationPage:async ({page} , use) => {
    const educationCenterInformationPage = new EducationCenterInformationPage(page)
    await use(educationCenterInformationPage)
  },
  admissionScheduleInformationPage:async ({page} , use) => {
    const admissionScheduleInformationPage = new AdmissionScheduleInformationPage(page)
    await use(admissionScheduleInformationPage)
  },
  admissionCalendarInformationPage:async ({page},use) => {
    const admissionCalendarInformationPage = new AdmissionCalendarInformationPage(page)
    await use(admissionCalendarInformationPage)
  },
  courseOpenPage : async ({page},use) => {
    const coursOpenPage = new CourseOpenPage(page)
    await use(coursOpenPage)
  },
  subjectWrittenExam : async ({page} , use) => {
    const subjectWrittenExam = new SubjectWrittenExamPage(page)
    await use(subjectWrittenExam)
  },
  verifyWrittenExamApplicationPage : async ({page} , use) => {
    const verifyWrittenExamApplicationPage = new VerifyWrittenExamApplicationPage(page)
    await use(verifyWrittenExamApplicationPage)
  },
  eligibleWrittenExamPage : async ({page},use) => {
    const eligibleWrittenExamPage = new EligibleWrittenExamPage(page)
    await use(eligibleWrittenExamPage)
  },
  


});

export { expect } from '@playwright/test';