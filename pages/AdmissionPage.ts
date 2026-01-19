import { Page, Locator } from '@playwright/test';

export interface StudentInfo {
  firstEngName: string;
  lastEngName: string;
  TelNumber: string;
  email: string;
  inCountryAddress: boolean;
  
  province  : string;
  district  : string;
  subDistrict : string;
  postalCode  : string;

  graduatedInCountry: string;
  graduatedDate: string;
  universityName: string;
  educationalQualification: string;
  gpa: string;
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
  TelNumberInput: Locator;
  emailInput: Locator;
  inCountryAddressRadio: Locator;

  provinceInput  : Locator;
  districtInput  : Locator;
  subDistrictInput : Locator;
  postalCodeInput  : Locator;

  graduatedInCountryRadio: Locator;
  graduatedDateInput: Locator;
  universityNameInput: Locator;
  educationalQualificationInput: Locator;
  gpaInput: Locator;

  workStatusRadio: Locator;
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
    this.TelNumberInput = page.locator('#mobile');
    this.emailInput = page.locator('#email');
    this.inCountryAddressRadio = page.getByRole('radio', { name: 'ที่อยู่ในประเทศ' });
    this.provinceInput = page.locator('#province_code');
    this.districtInput = page.locator('#district_code');
    this.subDistrictInput = page.locator('#subdistrict_code');
    this.postalCodeInput = page.locator('#zipcode');
    this.graduatedInCountryRadio = page.getByRole('radio', { name: 'จบการศึกษาในประเทศ' });
    this.graduatedDateInput = page.locator('[id="edu_history[0].grad_date"]');
    this.universityNameInput = page.locator('[id="edu_history[0].edu_sch_code"]');
    this.educationalQualificationInput = page.locator('[id="edu_history[0].edu_degree_code"]');
    this.gpaInput = page.locator('[id="work_status_code-1"]');
    this.workStatusRadio = page.locator('[id="question[0].choice_id-7"]');
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
    // เจาะจงไปที่ div ที่มี aria-label="card" และมีชื่อโครงการภายใน h3
    const projectCard = this.page.locator('div[aria-label="card"]')
      .filter({ has: this.page.locator('h3', { hasText: projectName }) });

    // ตรวจสอบสถานะการมองเห็น และการมีอยู่ของข้อมูล
    await projectCard.waitFor({ state: 'visible', timeout: 15000 });

    // สั่ง Scroll แบบบังคับเพื่อให้ Card มาอยู่กลางจอ
    await projectCard.scrollIntoViewIfNeeded();

    // หาปุ่ม "สมัครเรียน" ภายใน Card นั้นโดยตรง
    const registerBtn = projectCard.getByRole('button', { name: 'สมัครเรียน' });
    
    // คลิก
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
    // 1. ระบุตำแหน่ง Dropdown
    const dropdown = this.page.locator('.react-select__control')
      .filter({ hasText: 'เลือกระดับการศึกษา' });

    // สั่ง Scroll ไปหาและคลิกเพื่อเปิดเมนู
    await dropdown.scrollIntoViewIfNeeded();
    await dropdown.click();

    // 2. เลือก Option จากเมนูที่เด้งขึ้นมา
    // ใช้ getByText และ exact: true เพื่อความแม่นยำ (กันกรณีมีคำว่า "ปริญญาตรีต่อเนื่อง" โผล่มา)
    const option = this.page.getByText(levelName, { exact: true });
    await option.click();

    // 3. กดปุ่ม บันทึก
    await this.saveButton.click();

    // 4. กดปุ่ม ถัดไป
    await this.nextButton.click();
  }

  async handleDuplicateProjectPopup() {
    try { 
      //รอให้ข้อความ popup ปรากฏขึ้นมาภายใน 2 วิ
      await this.duplicateProjectPopupText.waitFor({ state: 'visible' , timeout : 2000 });
      await this.confirmProjectDuplicateButton.click();
    }catch (e) {
      // ถ้าเกิน 2 วินาทีแล้ว Popup ไม่ขึ้น จะเข้า catch 
      // ไม่ต้องทำอะไร ปล่อยผ่านไป 
      console.log('ไม่เจอ Popup สมัครซ้ำ: ดำเนินการต่อตามปกติ')
    }
  }

  async fillStudentInfo(data: StudentInfo){
    await this.firstEngNameInput.fill(data.firstEngName);
    await this.lastEngNameInput.fill(data.lastEngName);
    await this.TelNumberInput.fill(data.TelNumber);
    await this.emailInput.fill(data.email);

    if (data.inCountryAddress) {
      // CASE: เป็นที่อยู่ในประเทศ
      
      // 1. กดปุ่ม Radio "ในประเทศ"
      await this.inCountryAddressRadio.check();

      // 2. กรอกข้อมูลจังหวัด -> อำเภอ -> ตำบล
      // ต้องเช็คว่ามีข้อมูลส่งมาไหมก่อนกรอก เพื่อกัน error
      if (data.province) {
        await this.provinceInput.fill(data.province);
        await this.page.keyboard.press('Enter');
      }

      if (data.district) {
        await this.districtInput.fill(data.district);
        await this.page.keyboard.press('Enter');
      }

      if (data.subDistrict) {
        await this.subDistrictInput.fill(data.subDistrict);
        await this.page.keyboard.press('Enter');
      }

      if (data.postalCode) {
        await this.postalCodeInput.fill(data.postalCode);
      }
    }  

    await this.page.getByRole('radio', { name: data.graduatedInCountry }).check();
    await this.graduatedDateInput.fill(data.graduatedDate);
    await this.universityNameInput.fill(data.universityName);
    await this.page.keyboard.press('Enter');
    await this.educationalQualificationInput.fill(data.educationalQualification);
    await this.page.keyboard.press('Enter');
    await this.gpaInput.fill(data.gpa);
    await this.workStatusRadio.check();
    await this.question1Radio.check();
    await this.question2Radio.check();
  }



}
