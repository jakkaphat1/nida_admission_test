import { test as base } from '@playwright/test';
import { CommonPage } from '../pages/CommonPaeg';
import { AdmissionPage } from '../pages/Student/AdmissionPage';
import { ExamsPage } from '../pages/Student/ExamsPage';
import { ApplicationStatusPage } from '../pages/Student/ApplicationStatusPage';
import { CourseAndProgramInformationPage } from '../pages/Officer/CourseAndProgramInformationPage';
import { DocumentRequirementPage } from '../pages/Officer/DocumentRequirementsPage';
import { PaymentPage } from '../pages/Student/PaymentPage'
import { ExamAnnoucePage } from '../pages/Student/ExamAnnoucePage';
import { MyAnnoucement } from '../pages/Student/MyAnnoucement';
import { ConfirmRegistration } from '../pages/Student/ConfirmRegistration';
import { MyCalendarPage } from '../pages/Student/MyCalendarPage';
import { EducationReportingPage } from '../pages/Student/EducationReportingPage';
import { MajorSubjectPage } from '../pages/Officer/MajorSubjectPage';
import { DepartmentInformationPage } from '../pages/Officer/DepartmentInformationPage';
import { FacultyInformationPage } from '../pages/Officer/FacultyInformationPage';
import { EducationCenterInformationPage } from '../pages/Officer/EducationCenterInformationPage';
import { AdmissionScheduleInformationPage } from '../pages/Officer/AdmissionScheduleInformationPage';
import { AdmissionCalendarInformationPage } from '../pages/Officer/AdmissionCalendarIInformationPage';
import { CourseOpenPage } from '../pages/Officer/CourseOpenPage';
import { SubjectWrittenExamPage } from '../pages/Officer/SubjectWrittenExamPage';
import { VerifyWrittenExamApplicationPage } from '../pages/Officer/VerifyWrittenExamApplicationPage';
import { EligibleWrittenExamPage } from '../pages/Officer/EligibleWrittenExamPage';
import { AnnouceWriitenExamScorePage } from '../pages/Officer/AnnouceWriitenExamScorePage';
import { VerifyLearningApplicationPage } from '../pages/Officer/VerifyLearningApplicationPage';
import { EligibleLearningPage } from '../pages/Officer/EligibleLearningPage';
import { AnnouceLearningResultPage } from '../pages/Officer/AnnouceLearningResultPage';
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
  annouceWrittenExamScorePage : AnnouceWriitenExamScorePage
  verifyLearningApplicationPage : VerifyLearningApplicationPage
  eligibleLearningPage : EligibleLearningPage
  annouceLearningResultPage : AnnouceLearningResultPage
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
  annouceWrittenExamScorePage : async ({page},use) => {
    const annouceWrittenExamScorePage = new AnnouceWriitenExamScorePage(page)
    await use(annouceWrittenExamScorePage)
  },
  verifyLearningApplicationPage : async ({page},use) => {
    const verifyLearningApplicationPage = new VerifyLearningApplicationPage(page)
    await use(verifyLearningApplicationPage)
  },
  eligibleLearningPage : async ({page},use) => {
    const eligibleLearningPage = new EligibleLearningPage(page)
    await use(eligibleLearningPage)
  },
  annouceLearningResultPage : async ({page},use) => {
    const annouceLearningResultPage = new AnnouceLearningResultPage(page)
    await use(annouceLearningResultPage)
  },
  


});

export { expect } from '@playwright/test';