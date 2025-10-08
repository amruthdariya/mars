//const { test, expect } = require('@playwright/test');
const { _android } = require('@playwright/test');
test.describe.configure({ mode: 'serial' });
import { test,expect } from '@playwright/test';
const { remote } = require('webdriverio');
const caps = require('../utils/capabilities');
const assert = require('assert');

test('Login to the application', async({page})=>{
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
  await fileChooser1.setFiles('C:/Users/Blubirch.DESKTOP-EN2LGLN/PLAYWRIGHT AUTOMATION/testdata/PRD_demo.csv');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByRole('link', { name: 'Incomplete PRD' }).click();
})


test.describe('Mobile App Login Test', function () {
    // this.timeout(60000); // Increase timeout for Appium operations
 //console.log("44444444");
    let driver;

    // Before all tests, start the session
    test.beforeAll(async () => {
        driver = await remote(caps);
        //console.log("11111111111111");
    });

    function generateTagId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `T-${result}`;
}

    test('should login successfully with valid credentials', async () => {
         const tagId = generateTagId();
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
         await loginButton.click();
         const secondCard = await driver.$('(//android.widget.FrameLayout[@resource-id="com.blubirch.rims.whirlpoolDemo:id/cvMain"])[2]/android.view.ViewGroup');
await secondCard.click();

const searchIRD = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/editText');
await searchIRD.setValue('Inward-2');
await driver.execute('mobile: performEditorAction', { action: 'search' });
const articleIDSearchbox=driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Article Id/Tag Id"]');
await articleIDSearchbox.setValue('493665939');
await driver.execute('mobile: performEditorAction', { action: 'search' });
const serialNumber1TxtBox=driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Serial Number"]');
await serialNumber1TxtBox.setValue('SN-LP-AZ9F3K2');
await driver.execute('mobile: performEditorAction', { action: 'search' });
const DOASealPresent=driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="Yes"]');
await DOASealPresent.click();
const DOASealIntact = driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="No"]');
await DOASealIntact.click();
const captureImage=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/ivCapture');
await captureImage.click();
const selectImage=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/ivConfirm');
await selectImage.click();
const nextBtn=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btNext');
await nextBtn.click();
const physicalCondition=driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="Like New"]');
await physicalCondition.click();
await captureImage.click();await selectImage.click();
await nextBtn.click();
const poweringOn=driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="Yes"]');
await poweringOn.click();
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


//const serialNumber2TxtBox=driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Serial Number 2"]'); 
//await serialNumber2TxtBox.setValue('DELL-21XK5H79');
//await driver.execute('mobile: performEditorAction', { action: 'search' });
         

    //     // Wait until visible
    //     await usernameField.waitForDisplayed({ timeout: 5000 });
    //     await passwordField.waitForDisplayed({ timeout: 5000 });

    //     // Set values
    //     await usernameField.setValue('testuser');
    //     await passwordField.setValue('testpass');

    //     // Click login
    //     await loginButton.click();

    //     // Validate login success
    //     const homeScreen = await driver.$('id=com.example.app:id/home');
    //     await homeScreen.waitForDisplayed({ timeout: 5000 });

    //     const isDisplayed = await homeScreen.isDisplayed();
    //     assert.strictEqual(isDisplayed, true, 'Home screen should be displayed after login');
    });

    test.only('Liquidation',async({page})=>{
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
  const ClkDisposition=page.locator("//span[text()='Disposition']");
  await ClkDisposition.click();
  const liquidationTab = page.locator("//h4[text()=' Liquidation ']");
  await liquidationTab.click();
  const firstTagID=await page.locator("(//tr//td//span)[1]").textContent();
  console.log(firstTagID);

    })

        // After all tests, end the session
    test.afterAll(async () => {
        if (driver) {
            await driver.deleteSession();
            //console.log("3333333333");
        }
    });
});


