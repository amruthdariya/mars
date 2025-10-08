const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginpage');
const { Console } = require('console');
const { creeaterequestpage } = require('../pages/createrequestpage');
const { loginpageapk } = require('../pages/loginpageapk');
const { InspectionPage } = require('../pages/inspectionpage');
const { returnapprovalpage } = require('../pages/returnapprovalpage');
const { prdpages } = require('../pages/prdpages');
const { getTestData } = require('../utils/excelutil');
const { ReverseLogisticsPage, reverselogisticspage } = require('../pages/reverselogisticspage');
const { _android } = require('@playwright/test');
//import { test,expect } from '@playwright/test';
const { remote } = require('webdriverio');
const caps = require('../utils/capabilities');
const prd = require('../utils/prddatacreation');
const assert = require('assert');
test.describe.configure({ mode: 'serial' });

/////
const { readCsvColumn} = require('../utils/filereader');
//Generate Random number
const ts = new Date().toISOString().replace(/\D/g, '')
let record;
let pickupReqId;
let driver;

let subrequestId;
let testData;
let testData2;
let testData3;
let testData4;
let testData5;
let testData6;
let tagId;
let irdno;
let articleid;
let serialNumber1;
let serialNumber2;

test('Use CSV date in test', async ({ page }) => {
  const filePath = 'C:/Users/Blubirch.DESKTOP-EN2LGLN/PLAYWRIGHT AUTOMATION/testdata/prd_file.csv';
   irdno = readCsvColumn(filePath, 'INWARD_REFERENCE_DOCUMENT_NUMBER');
   articleid = readCsvColumn(filePath, 'SKU_CODE');
    serialNumber1 = readCsvColumn(filePath, 'SERIAL_NUMBER1');
     serialNumber2 = readCsvColumn(filePath, 'SERIAL_NUMBER2');
  ///
  
});


    function generateTagId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `T-${result}`;
}

test.beforeAll(async () => {
    testData = await getTestData('Sheet1', 'D2C_Ticket');
    console.log("Loaded Test Data:", testData);
    if (!testData) throw new Error("testData is undefined! Check your Excel sheet.");
});
test.beforeAll(async () => {
    testData2 = await getTestData('Sheet1', 'Inspection');
    console.log("Loaded Test Data:", testData2);
    if (!testData2) throw new Error("testData is undefined! Check your Excel sheet.");
});
test.beforeAll(async()=>{
   testData3 = await getTestData('Sheet1', 'Return approval');
    console.log("Loaded Test Data:", testData3);
    if (!testData3) throw new Error("testData is undefined! Check your Excel sheet.");
})

test.beforeAll(async()=>{
   testData4 = await getTestData('Sheet1', 'Return approval2');
    console.log("Loaded Test Data:", testData4);
    if (!testData4) throw new Error("testData is undefined! Check your Excel sheet.");
})
test.beforeAll(async()=>{
   testData5 = await getTestData('Sheet1', 'Reverse logistics');
    console.log("Loaded Test Data:", testData5);
    if (!testData5) throw new Error("testData is undefined! Check your Excel sheet.");
})
test.beforeAll(async()=>{
   testData6 = await getTestData('Sheet1', 'PRD');
    console.log("Loaded Test Data:", testData6);
    if (!testData6) throw new Error("testData is undefined! Check your Excel sheet.");
})




//Login and create D2C Sales request
test('1-D2C Ticket Creation', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page,testData);
  tagId = generateTagId();
  console.log('tagid generated.................',tagId);
 // const url="https://rims-demo.blubirch.com/";
  await loginPage.navigate();
  await loginPage.login();
  await loginPage.verifyLogin();
  
// Return Creation
  const returnPage = new creeaterequestpage(page,testData);
  await returnPage.verifyModuleAndStartRequest();
  await returnPage.fillCustomerDetails();
  await returnPage.fillItemDetails(undefined, undefined, tagId);
  await returnPage.submitAndVerifyOTP();
   global.subrequestId = await returnPage.captureSubRequestId();
  await returnPage.searchsubrequestId(global.subrequestId );
  await returnPage.assignServicePartner();
  await page.waitForTimeout(4000);
  await returnPage.assignServiceTechnician();
});
//SERVICE INSPECTION
test('2-Service Technician Inspection', async ({ page }) => {
test.setTimeout(60000);
  const loginPageapk = new loginpageapk(page,testData2);
   const inspectionPage = new InspectionPage(page,testData2);
  //const url="https://qa-fta.web.app/login";
  await loginPageapk.navigate();
  await loginPageapk.login();
  //await loginPageapk.verifyLogin();
// Inspection ticket
  await inspectionPage.openInspectionTicket();
  await inspectionPage.enterArticleAndSerial();

  // Activity
  await inspectionPage.answerQuestions();
  await inspectionPage.uploadFile1(
    page.locator('ion-content').filter({ hasText: 'Packaging Condition Packaging' }).getByRole('img'),
    'C:\\Users\\Blubirch.DESKTOP-EN2LGLN\\Pictures\\img7.jpg'
  );
  await inspectionPage.uploadFile2(
    page.locator('ion-content').filter({ hasText: 'Physical Condition Physical' }).getByRole('img'),
    'C:\\Users\\Blubirch.DESKTOP-EN2LGLN\\Pictures\\img7.jpg'
  );
  await inspectionPage.uploadFile3(
    page.locator('ion-content').filter({ hasText: 'Physical Condition Damage' }).getByRole('img'),
    'C:\\Users\\Blubirch.DESKTOP-EN2LGLN\\Pictures\\img7.jpg'
  );

  // Finish & submit
  await inspectionPage.completeActivity();

});
//RETURN APPROVAL
test('3-Return approval By BSM and RCSM',async({page}) =>{
  test.setTimeout(60000);
  const returnApprovalPage = new returnapprovalpage(page,testData3,testData4);
    await returnApprovalPage.navigate();
    await returnApprovalPage.login();
  // FIRST APPROVER
  await returnApprovalPage.navigateToReturnApproval();
  await returnApprovalPage.approveRefund("89", "Approved for refund");
  await returnApprovalPage.logout();
  // SECOND APPROVER
 // await loginPage.login("APR01", "blubirch@123");
  await returnApprovalPage.navigate();
  await returnApprovalPage.login2();
  await returnApprovalPage.navigateToReturnApproval();
  await returnApprovalPage.approveRefund("89", "Approved for refund");
  //await returnApprovalPage.logout();
});


//REVERSE LOGISTICS
test('4-Logistics Details Update By Logistics Manager', async ({ page }) => {
  test.setTimeout(60000);
  const rlPage=new reverselogisticspage(page,testData5);
  rlPage.navigate();
  rlPage.login();
  await rlPage.navigateToReverseLogistics();
  await rlPage.searchTicket(subrequestId);   // replace with the subrequestId
  await rlPage.updateConfirmation();
  await rlPage.updateAssignment();
  await rlPage.updatePickup();
  await rlPage.updateDrop();
  // Logout
  //await rlPage.logout();
  //console.log("======== Logistics Updated ==============");
  });




  test('5-Upload PRD File', async({page})=>{
    console.log("******RIMS FLOW STARTED******************");
    await page.goto("https://rims-demo.blubirch.com/");
    const userNameTextField=page.locator('//input[@type="text"]');
    await expect(userNameTextField).toBeVisible();
    await userNameTextField.fill("dava_admin");
    const passwordTextField=page.locator('//input[@type="password"]');
    await expect(passwordTextField).toBeVisible();
    await passwordTextField.fill("blubirch@123");
    const logInBtn = page.locator('//span[text()="Login"]');
    await expect(logInBtn).toBeVisible();
    await logInBtn.click();
    await page.getByText('RIMS').click();
    await page.getByRole('link', { name: 'PRD' }).click();
    await page.getByRole('tab', { name: 'Incomplete PRDs' }).click();
    await page.getByRole('button', { name: 'Create PRD' }).click();
    await page.getByRole('button', { name: 'Upload' }).click();
    const attachFile= page.getByRole('button', { name: 'Attach Csv file prepended' });
    //file upload
    const [fileChooser1] = await Promise.all([
      page.waitForEvent('filechooser'),  
      attachFile.click()
    ]);
  
    // Set the file(s) to upload
    await fileChooser1.setFiles('C:/Users/Blubirch.DESKTOP-EN2LGLN/PLAYWRIGHT AUTOMATION/testdata/prd_file.csv');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();
    await page.getByRole('link', { name: 'Incomplete PRD' }).click();
  })
  
  
  test.describe('Mobile App Login Test', function () {
      // this.tC:\Users\Blubirch.DESKTOP-EN2LGLN\Documents/PRD_demo (2).xlsx
   //console.log("44444444");
    
  
      // Before all tests, start the session
       test.beforeAll(async () => {
       driver = await remote(caps);
        //console.log("11111111111111");
      });
  
       test.afterAll(async () => {
          if (driver) {
              await driver.deleteSession();
              //console.log("3333333333");
          }
      });
      
      test('6-Inward the item to Brandcall-Log Disposition', async () => {
           //tagId = generateTagId();
         // test.setTimeout(4000);
          //console.log("22222222222");
      //     // Locate elements
          const usernameField = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/edtEmail');
           await usernameField.waitForDisplayed({ timeout: 5000 });
          await usernameField.setValue('dava_admin');
          
          const passwordField = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/edtPassword');
          await passwordField.waitForDisplayed({ timeout: 5000 });
           await passwordField.setValue('blubirch@123');
           const loginButton = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btnSignIn');
          await loginButton.waitForDisplayed({ timeout: 5000 });
           await loginButton.click();
           const secondCard = await driver.$('(//android.widget.FrameLayout[@resource-id="com.blubirch.rims.whirlpoolDemo:id/cvMain"])[2]/android.view.ViewGroup');
           await secondCard.waitForDisplayed({ timeout: 5000 });
           await secondCard.click();
  
  const searchIRD = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/editText');
  await searchIRD.waitForDisplayed({ timeout: 5000 });
  await searchIRD.setValue(irdno);
  await driver.execute('mobile: performEditorAction', { action: 'search' });
  const articleIDSearchbox=driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Article Id/Tag Id"]');
  await articleIDSearchbox.waitForDisplayed({ timeout: 5000 });
  await articleIDSearchbox.setValue(articleid);
  await driver.execute('mobile: performEditorAction', { action: 'search' });
  //const serialNumber1TxtBox=driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Serial Number"]');
  ////await serialNumber1TxtBox.setValue(serialNumber1);
  await driver.execute('mobile: performEditorAction', { action: 'search' });
  const DOASealPresent=driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="Yes"]');
  await DOASealPresent.waitForExist({ timeout: 10000 });
  await DOASealPresent.click();
  const DOASealIntact = driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="No"]');
  await DOASealIntact.waitForExist({ timeout: 10000 });
  await DOASealIntact.click();
  const captureImage=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/ivCapture');
  await captureImage.waitForExist({ timeout: 10000 });
  await captureImage.click();
  const selectImage=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/ivConfirm');
  await selectImage.click();
  const nextBtn=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btNext');
  await nextBtn.click();
  const physicalCondition=driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="Like New"]');
  await physicalCondition.waitForExist({ timeout: 10000 });
  await physicalCondition.click();
  await captureImage.waitForExist({ timeout: 10000 });
  await captureImage.click();
  await selectImage.click();
  await nextBtn.click();
  //const poweringOn=driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="Yes"]');
  //await poweringOn.click();
  const accessoriesDropdown=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/tvMultiSelectDropDown');
  await accessoriesDropdown.click();
  const none=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/chkItem');
  await none.click();
  const okBtn=driver.$('id=android:id/button1');
  await okBtn.click();
  await accessoriesDropdown.click();
  await none.click();
  await okBtn.click();
  await nextBtn.click();
  const proceedBtn=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btnProceed');
  await proceedBtn.click();
  const enterTagID=driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Tag ID"]');
  await enterTagID.setValue(tagId);
  const generateGRN=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btnGenerateGRN');
  await generateGRN.click();
  
  // After all tests, end the session
     
  });
  });
  
  test('7-Complete putaway process/ Update sublocation', async ({ page }) => {
      test.setTimeout(120000);
      await page.goto('https://rims-demo.blubirch.com/', {timeout: 80000});
      await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).click();
      await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).fill('dava_admin');
      await page.getByRole('textbox', { name: 'Enter Password' }).click();
      await page.getByRole('textbox', { name: 'Enter Password' }).fill('blubirch@123');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.getByText('RIMS').click();
      const clkPutaway=page.getByText("Put Away / Pick Up");
      await clkPutaway.click();
      const checkBox=page.locator("(//tr[@class='v-data-table__tr']/td)[1]");
      await checkBox.click();
      const updateSubLocation=page.locator("//span[text()='Update Sub Location']");
      await updateSubLocation.click();
      const selectLocationDropdown=page.locator("(//div[@class='v-field__append-inner']/i)[5]");
      await selectLocationDropdown.click();
      await page.getByText('r694_002').click();
      await page.locator("//span[text()='Submit']").click();
      const dispositionLink = page.locator("(//span[text()='Disposition'])[1]");
      await dispositionLink.click();

      


  });


  test('Liquidation Flow', async({page})=>{

    page.setDefaultTimeout(180000);
    await page.goto('https://rims-demo.blubirch.com/');
    await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).click();
    await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).fill('dava_admin');
    await page.getByRole('textbox', { name: 'Enter Password' }).click();
    await page.getByRole('textbox', { name: 'Enter Password' }).fill('blubirch@123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByText('RIMS').click();
    await page.locator('v-list-item-content').filter({ hasText: /^Disposition$/ }).locator('div').click();
    await page.waitForTimeout(8000);
    await page.getByRole('link', { name: 'Liquidation' }).click();
    await page.waitForTimeout(6000);
    await page.locator("(//input[@type='checkbox'])[2]").click();
    await page.getByRole('button', { name: 'Other Action' }).click();
    await page.getByText('Mark As E-Waste').click();
    const modal = page.locator('div[role="dialog"]');
    await modal.waitFor({ state: 'visible', timeout: 3000 });
    const noRadio = modal.getByRole('radio', { name: 'No' });
    const isChecked = await noRadio.isChecked();
    if (!isChecked) {
        // If "No" is not already selected, select it
        await noRadio.check();
    }
    await modal.getByRole('button', { name: 'Submit' }).click();
    await modal.getByRole('button', { name: 'Ok' }).click();
    await page.locator("(//input[@type='checkbox'])[2]").click();
    await page.getByRole('button', { name: 'Allocation' }).click();
    await page.getByText('Allocate To B2B').click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('tab', { name: 'Sales Method' }).click();
    await page.waitForTimeout(5000);
    await page.locator("(//input[@type='checkbox'])[2]").click();
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Select Action' }).click();
    await page.getByText('Competitive Bidding').click();
    await page.getByRole('button', { name: 'confirm' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('tab', { name: 'Create Lots' }).click();
    await page.getByText('Competitive').click();
    await page.locator("(//input[@type='checkbox'])[2]").click();
    await page.getByRole('button', { name: 'Lot Creation' }).click();
    await page.getByText('Create Lot', { exact: true }).click();
    test.setTimeout(120000); // waits for 2 minutes
    await page.getByRole('textbox', { name: 'Lot Name Lot Name' }).click();
    await page.getByRole('textbox', { name: 'Lot Name Lot Name' }).fill('Lot 000112');
    await page.getByRole('textbox', { name: 'Lot Description Lot' }).click();
    await page.getByRole('textbox', { name: 'Lot Description Lot' }).fill('Lot 000112 || Ref || WM || TV || 145 items || As in Condition || 14:45');
    await page.getByRole('textbox', { name: 'Bid Value to be Multiple of' }).click();
    await page.getByText('10000', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Buy Now Price (₹) Buy Now' }).click();
    await page.getByRole('textbox', { name: 'Buy Now Price (₹) Buy Now' }).fill('6,500');
    await page.getByRole('textbox', { name: 'Reserve Price (₹) Reserve' }).click();
    await page.getByRole('textbox', { name: 'Reserve Price (₹) Reserve' }).fill('6000');
    await page.getByRole('textbox', { name: 'Floor Price (₹) Floor Price' }).click();
    await page.getByRole('textbox', { name: 'Floor Price (₹) Floor Price' }).fill('5000');
    await page.getByRole('button', { name: 'Lot Images' }).click();
    const dialog = page.getByRole('dialog');
    const fileInput = dialog.locator('input[type="file"]');
    await fileInput.setInputFiles('C:\\Users\\Blubirch.DESKTOP-EN2LGLN\\PLAYWRIGHT AUTOMATION\\testdata\\img17.jpg');
    await page.getByRole('button', { name: 'Submit', exact: true }).click();
    await page.getByRole('button', { name: 'Submit', exact: true }).click();
    await page.getByRole('textbox', { name: 'Bid Start Date Bid Start Date' }).click();
    await page.getByRole('button', { name: '6', exact: true }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('textbox', { name: 'Bid Start Time Bid Start Time' }).click();
    await page.getByRole('button', { name: '17' }).click();
    await page.locator('#v-menu-463').getByText('17').click();
    await page.getByRole('button', { name: '00' }).click();
    await page.locator('#v-menu-464').getByText('00').click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('textbox', { name: 'Bid End Date Bid End Date' }).click();
    await page.getByRole('button', { name: '6', exact: true }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('textbox', { name: 'Bid End Date Bid End Date' }).click();
    await page.getByRole('button', { name: '6', exact: true }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('textbox', { name: 'Bid End Time Bid End Time' }).click();
    await page.getByRole('button', { name: '17' }).click();
    await page.locator('#v-menu-567').getByText('17').click();
    await page.getByRole('button', { name: '15' }).click();
    await page.locator('#v-menu-464').getByText('15').click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('spinbutton', { name: 'Enter the no. of days from' }).click();
    await page.getByRole('spinbutton', { name: 'Enter the no. of days from' }).fill('1');
    await page.getByRole('button', { name: 'SUBMIT' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('tab', { name: 'Publish' }).click();
    await page.getByText('B2B').click();
     });
