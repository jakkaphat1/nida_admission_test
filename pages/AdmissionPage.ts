import { Page, Locator } from '@playwright/test';

export interface StudentInfo {
  firstEngName: string;
  lastEngName: string;
  // TelNumber: string;
  // email: string;
  inCountryAddress: boolean;
  
  address : string;
  province  : string;
  district  : string;
  subDistrict : string;

  graduatedInCountry: string;
  graduatedDate: string;
  universityName: string;
  educationalQualification: string;
  gpa: string;
  honor : string;

  experienceYear: string;
  experienceMonth: string;
  allExperienceYear?: string;
  allExperienceMonth?: string;
  careerType: string;

  currentWorkPlace: string;
  salary: string;
  workPosition: string;
  workType : string;
  workTelNumber: string;

  currentWorkPlace2: string;
  salary2: string;
  workPosition2: string;
  workType2 : string;
  workTelNumber2: string;

  ieltsScore: string;
  toeicScore: string;
  toeflcbtScore: string;
  toeflibtScore: string;
  toeflitpScore: string;
  gmatScore: string;
  nidateapScore: string;

}


export class AdmissionPage {


  /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
  page: Page;
  url = 'https://admissions-uat.nida.ac.th/';
  emailSelector = 'input[name="email"]';
  loginButtonSelector = 'button:has-text("เข้าใช้งานระบบ")';
  projectCardSelector = 'div.flex.flex-col.overflow-hidden.rounded-xl.border';
  googleLoginSelector = 'button:has-text("Login with Google")';
  duplicateProjectPopupText: Locator;
  confirmProjectDuplicateButton: Locator;

  firstEngNameInput: Locator;
  lastEngNameInput: Locator;
  inCountryAddressRadio: Locator;

  addressInput : Locator;
  provinceInput  : Locator;
  districtInput  : Locator;
  subDistrictInput : Locator;

  graduatedInCountryRadio: Locator;
  graduatedDateInput: Locator;
  graduatedDateIcon: Locator;
  calendarPopup: Locator;
  universityNameInput: Locator;
  educationalQualificationInput: Locator;
  gpaInput: Locator;
  honorInput : Locator;

  workStatusRadio: Locator;
  experienceYearInput: Locator;
  experienceMonthInput: Locator;
  allexperienceYearInput: Locator;
  allexperienceMonthInput: Locator;
  careerTypeInput: Locator;

  currentWorkPlaceInput: Locator;
  salaryInput: Locator;
  workPositionInput: Locator;
  workTypeInput: Locator;
  workTelNumberInput: Locator;
  addWorkExperienceButton: Locator;

  currentWorkPlaceInput2: Locator;
  salaryInput2: Locator;
  workPositionInput2: Locator;
  workTypeInput2: Locator;
  workTelNumberInput2: Locator;
  
  ieltsScoreInput: Locator;
  toeicScoreInput: Locator;
  toeflcbtScoreInput: Locator;
  toeflibtScoreInput: Locator;
  toeflitpScoreInput: Locator;
  gmatScoreInput: Locator;
  nidateapScoreInput: Locator;


  question1Radio: Locator;
  question2Radio: Locator;
  /**
 * TEST DATA SECTION
 * ---------------------------------------------------------------- */
  email = 'jakkaphat.w@kkumail.com'
  

    /**
 * Initialize SECTION
 * ---------------------------------------------------------------- */
  //ประกาศตัวแปร Locator สำหรับใช้ใน Method ของ Constructor
  loginEmailInput: Locator;
  loginButton: Locator;
  googleLoginButton: Locator;
  noScoreText: Locator;
  registerWrittenExamButon : Locator;
  saveButton: Locator;
  nextButton: Locator;

  /**
* GETTERS SECTION
* ---------------------------------------------------------------- */
  registerButtonByProject(projectName: string): Locator { // dynamic getter
    return this.page.locator(this.projectCardSelector)
      .filter({ hasText: projectName })
      .getByRole('button', { name: 'สมัครเรียน' });
  }



  /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
  constructor(page: Page) {
    //ผูก Selector เข้ากับ Locator
    this.page = page;
    this.loginEmailInput = page.locator(this.emailSelector);
    this.loginButton = page.locator(this.loginButtonSelector);
    this.googleLoginButton = page.locator(this.googleLoginSelector);
    this.noScoreText = page.getByText('ยังไม่มีคะแนน');
    this.registerWrittenExamButon = page.getByRole('button', { name: 'สมัครสอบข้อเขียน' });
    this.saveButton = page.getByRole('button', { name: 'บันทึก' });
    this.nextButton = page.getByRole('button', { name: 'ถัดไป' });
    this.duplicateProjectPopupText = page.getByText('คุณสมัครโครงการนี้แล้ว!');
    this.confirmProjectDuplicateButton = page.getByRole('button', { name: 'ยืนยัน' });

    // fill Student Info locators
    this.firstEngNameInput = page.locator('#first_name_en');
    this.lastEngNameInput = page.locator('#last_name_en');
    this.inCountryAddressRadio = page.getByRole('radio', { name: 'ที่อยู่ในประเทศ' });
    this.addressInput = page.locator('[id="address.addr_detail"]');
    this.provinceInput = page.locator('.react-select__control').filter({ hasText: 'จังหวัด' }).locator('input');
    this.districtInput = page.locator('.react-select__control').filter({ hasText: 'เขต/อำเภอ' }).locator('input');
    this.subDistrictInput = page.locator('.react-select__control').filter({ hasText: 'แขวง/ตำบล' }).locator('input');
    
    this.graduatedInCountryRadio = page.getByRole('radio', { name: 'จบการศึกษาในประเทศ' });

    this.graduatedDateInput = page.locator('[id="edu_history[0].grad_date"]');
    const dateContainer = page.locator('div')
        .filter({ has: this.graduatedDateInput })
        .last();
    this.graduatedDateIcon = dateContainer.locator('.prefix_suffix_box svg');
    this.calendarPopup = page.locator('.react-datepicker');

    this.universityNameInput = page.locator('[id="edu_history[0].edu_sch_code"] input.react-select__input');
    this.educationalQualificationInput = page.locator('.unext-form-control').filter({ hasText: 'เลือกวุฒิการศึกษา' }).locator('input.react-select__input');
    this.gpaInput = page.locator('[id="edu_history[0].edu_gpa"]');
    this.honorInput = page.locator('.react-select__control').filter({ hasText: 'เลือกเกียรตินิยม' });

    const workExpSection = page.locator('div').filter({ hasText: /^ประสบการณ์ทำงานหลังสำเร็จการศึกษา$/ }).locator('..');
    this.experienceYearInput = workExpSection.locator('.react-select__control').filter({ hasText: 'เลือกปี' });
    this.experienceMonthInput = workExpSection.locator('.react-select__control').filter({ hasText: 'เลือกเดือน' });
    
    const allworkExpSection = page.locator('div').filter({ hasText: /^ประสบการณ์ทำงานทั้งหมด$/ }).locator('..');
    this.allexperienceYearInput = allworkExpSection.locator('.react-select__control').filter({ hasText: 'เลือกปี' });
    this.allexperienceMonthInput = allworkExpSection.locator('.react-select__control').filter({ hasText: 'เลือกเดือน' });
    this.careerTypeInput = page.locator('.react-select__control').filter({ hasText: 'ประเภทอาชีพ' });
    this.workStatusRadio = page.locator('[id="question[0].choice_id-7"]');

    this.currentWorkPlaceInput = page.locator('[id="work_experience[0].comp_name"]');
    this.salaryInput = page.locator('[id="work_experience[0].salary"]');
    this.workPositionInput = page.locator('[id="work_experience[0].comp_position"]');
    this.workTypeInput = page.locator('[id="work_experience[0].biz_type_name"]');
    this.workTelNumberInput = page.locator('[id="work_experience[0].comp_tel"]');
    this.addWorkExperienceButton = page.getByRole('button', { name: 'เพิ่มข้อมูลการทำงาน' });

    this.currentWorkPlaceInput2 = page.locator('[id="work_experience[1].comp_name"]');
    this.salaryInput2 = page.locator('[id="work_experience[1].salary"]');
    this.workPositionInput2 = page.locator('[id="work_experience[1].comp_position"]');
    this.workTypeInput2 = page.locator('[id="work_experience[1].biz_type_name"]');
    this.workTelNumberInput2 = page.locator('[id="work_experience[1].comp_tel"]');

    this.ieltsScoreInput = page.locator('[id="exam_score[0].exam_code"]');
    this.toeicScoreInput = page.locator('[id="exam_score[1].exam_code"]');
    this.toeflcbtScoreInput = page.locator('[id="exam_score[2].exam_code"]');
    this.toeflibtScoreInput = page.locator('[id="exam_score[3].exam_code"]');
    this.toeflitpScoreInput = page.locator('[id="exam_score[4].exam_code"]');
    this.gmatScoreInput = page.locator('[id="exam_score[5].exam_code"]');
    this.nidateapScoreInput = page.locator('[id="exam_score[6].exam_code"]');

    this.question1Radio = page.locator('[id="question[0].choice_id-7"]');
    this.question2Radio = page.locator('[id="question[1].choice_id-16"]');
  }

  // Method
  async goto() {
    await this.page.goto(this.url);
  }

  // Method to fill email
  async fillEmail(email: string) {
    await this.loginEmailInput.fill(email);
  }

  // Method to click login with Google
  async clickLoginWithGoogle() {
    await this.googleLoginButton.click();
  }

  async clickLogin() {
    await this.loginButton.click();

  }

  async clickRegister(projectName: string) {
    const projectCard = this.page.locator('div[aria-label="card"]')
      .filter({ has: this.page.locator('h3', { hasText: projectName }) });

    await projectCard.waitFor({ state: 'visible', timeout: 15000 });

    await projectCard.scrollIntoViewIfNeeded();

    const registerBtn = projectCard.getByRole('button', { name: 'สมัครเรียน' });
    
    await registerBtn.click();
  
  }
  
  async gotoPrograms() {
    await this.page.goto('https://admissions-uat.nida.ac.th/programs');
  }

  async clickRegisterWrittenExam() {
    this.registerWrittenExamButon = this.page.getByRole('button', { name: 'สมัครสอบข้อเขียน' });
    await this.registerWrittenExamButon.click();
  }

  async selectEducationLevel(levelName: string) {
    const dropdown = this.page.locator('.react-select__control')
      .filter({ hasText: 'เลือกระดับการศึกษา' });

    await dropdown.scrollIntoViewIfNeeded();
    await dropdown.click();
    const option = this.page.getByText(levelName, { exact: true });
    await option.click();

    await this.saveButton.click();

    await this.nextButton.click();
  }

  async handleDuplicateProjectPopup() {
    try { 
      await this.duplicateProjectPopupText.waitFor({ state: 'visible' , timeout : 2000 });
      await this.confirmProjectDuplicateButton.click();
    }catch (e) {
      console.log('ไม่เจอ Popup สมัครซ้ำ: ดำเนินการต่อตามปกติ')
    }
  }

  async fillStudentInfo(data: StudentInfo){
    await this.firstEngNameInput.fill(data.firstEngName);
    await this.lastEngNameInput.fill(data.lastEngName);

    await this.addressInput.fill(data.address);

    if (data.inCountryAddress) {
      await this.inCountryAddressRadio.check();
      if (data.province) {
        await this.provinceInput.click();
        await this.provinceInput.pressSequentially(data.province, { delay: 100 });

        await this.page.keyboard.press('Enter');
      
        await this.page.waitForTimeout(500); 
      }

      if (data.district) {
        await this.districtInput.fill(data.district);
        await this.page.keyboard.press('Enter');
      }

      if (data.subDistrict) {
        await this.subDistrictInput.fill(data.subDistrict);
        await this.page.keyboard.press('Enter');
      }

    }  

    await this.page.getByRole('radio', { name: data.graduatedInCountry }).check();

    if (data.graduatedDate) {
        const targetDay = data.graduatedDate.split('/')[0];
        const dayToClick = parseInt(targetDay).toString();

        await this.graduatedDateInput.click();
        await this.graduatedDateInput.fill(data.graduatedDate);
        await this.page.waitForTimeout(500);

        await this.graduatedDateIcon.click({ force: true });

        const calendar = this.page.locator('.rmdp-calendar');
        await calendar.waitFor({ state: 'visible' });
        await calendar.locator('.rmdp-day:not(.rmdp-deactive)')
            .getByText(dayToClick, { exact: true })
            .click({ force: true });
        await calendar.waitFor({ state: 'hidden' });
    }

    await this.page.keyboard.press('Enter');
    await this.universityNameInput.fill(data.universityName);
    await this.page.keyboard.press('Enter');

    if (data.educationalQualification) {
      // 1. คลิกช่อง
      await this.educationalQualificationInput.click();

      await this.educationalQualificationInput.pressSequentially(data.educationalQualification, { delay: 150 });

      await this.page.locator('.react-select__menu').waitFor({ state: 'visible' });

      await this.page.keyboard.press('Enter');
      
      await this.page.waitForTimeout(500);
  }

    await this.page.keyboard.press('Enter');
    await this.gpaInput.fill(data.gpa);

    if (data.honor) {
      await this.honorInput.click();

      const menu = this.page.locator('.react-select__menu');
      await menu.waitFor({ state: 'visible' });

      await menu.getByText(data.honor, { exact: true }).click();
      await this.page.waitForTimeout(500);
    }

    if (data.experienceYear) {
        await this.experienceYearInput.click(); 
        await this.page.getByRole('option', { name: data.experienceYear, exact: true }).click();
        await this.page.waitForTimeout(300);
    }

    if (data.experienceMonth) {
        await this.experienceMonthInput.click(); 
        await this.page.getByRole('option', { name: data.experienceMonth, exact: true }).click();
    }

    if (data.allExperienceYear) {
        await this.allexperienceYearInput.click();
        await this.page.getByRole('option', { name: data.allExperienceYear, exact: true }).click();
        await this.page.waitForTimeout(300);
    }

    if (data.allExperienceMonth) {
        await this.allexperienceMonthInput.click();
        await this.page.getByRole('option', { name: data.allExperienceMonth, exact: true }).click();
    }

    if (data.careerType) {
        await this.careerTypeInput.click();

        const careerMenu = this.page.locator('.react-select__menu');
        await careerMenu.waitFor({ state: 'visible' });

        await careerMenu.getByText(data.careerType, { exact: true }).click();
        await this.page.waitForTimeout(300);
    }

    await this.workStatusRadio.check();

    if (data.currentWorkPlace) 
      await this.currentWorkPlaceInput.fill(data.currentWorkPlace);
    if (data.salary) 
      await this.salaryInput.fill(data.salary);
    if (data.workPosition) 
      await this.workPositionInput.fill(data.workPosition);
    if (data.workType) 
      await this.workTypeInput.fill(data.workType);
    if (data.workTelNumber) 
      await this.workTelNumberInput.fill(data.workTelNumber);
  
    // กดปุ่ม เพิ่มข้อมูลการทำงาน
    await this.addWorkExperienceButton.waitFor({ state: 'visible' });
    await this.addWorkExperienceButton.click();

    // กรอกข้อมูลที่ทำงานที่ 2 (ถ้ามี)
    if (data.currentWorkPlace2) 
      await this.currentWorkPlaceInput2.fill(data.currentWorkPlace2);
    if (data.salary2) 
      await this.salaryInput2.fill(data.salary2);
    if (data.workPosition2) 
      await this.workPositionInput2.fill(data.workPosition2);
    if (data.workType2) 
      await this.workTypeInput2.fill(data.workType2);
    if (data.workTelNumber2) 
      await this.workTelNumberInput2.fill(data.workTelNumber2);

    // กรอกคะแนนสอบภาษาอังกฤษ
    if (data.ieltsScore)
      await this.ieltsScoreInput.fill(data.ieltsScore);
    if (data.toeicScore)
      await this.toeicScoreInput.fill(data.toeicScore);
    if (data.toeflcbtScore)
      await this.toeflcbtScoreInput.fill(data.toeflcbtScore); 
    if (data.toeflibtScore)
      await this.toeflibtScoreInput.fill(data.toeflibtScore);
    if (data.toeflitpScore)
      await this.toeflitpScoreInput.fill(data.toeflitpScore);
    if (data.gmatScore)
      await this.gmatScoreInput.fill(data.gmatScore);
    if (data.nidateapScore)
      await this.nidateapScoreInput.fill(data.nidateapScore);

    await this.question1Radio.check();
    await this.question2Radio.check();

    await this.saveButton.click();
  }


}
