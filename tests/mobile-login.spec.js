const { remote } = require('webdriverio');
const caps = require('../utils/capabilities');
const assert = require('assert');
const { test, expect } = require('@playwright/test');
test.describe.configure({ mode: 'serial' });
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
       //test.setTimeout(4000);
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
await searchIRD.setValue('INW-02');
await driver.execute('mobile: performEditorAction', { action: 'search' });
const articleIDSearchbox=await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Article Id/Tag Id"]');
await articleIDSearchbox.setValue('493665939');
await driver.execute('mobile: performEditorAction', { action: 'search' });
const serialNumber1TxtBox=await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Serial Number"]');
await serialNumber1TxtBox.setValue('SN-LP-AZ9F3K7');
await driver.execute('mobile: performEditorAction', { action: 'search' });
const DOASealPresent=await driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="Yes"]');
await DOASealPresent.click();
const DOASealIntact = await driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="No"]');
await DOASealIntact.waitForDisplayed({ timeout: 5000 });
await DOASealIntact.click();
const captureImage=await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/ivCapture');
await captureImage.click();
const selectImage=await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/ivConfirm');
await selectImage.click();
const nextBtn=await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btNext');
await nextBtn.click();
const physicalCondition=await driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="Like New"]');
await physicalCondition.click();
await captureImage.click();await selectImage.click();
await nextBtn.click();
const poweringOn=await driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="Yes"]');
await poweringOn.click();
const accessoriesDropdown=await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/tvMultiSelectDropDown');
await accessoriesDropdown.click();
const none=await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/chkItem');
await none.click();
const okBtn=await driver.$('id=android:id/button1');
await okBtn.click();
await accessoriesDropdown.click();
await none.click();
await okBtn.click();
await nextBtn.click();
const proceedBtn=await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btnProceed');
await proceedBtn.click();
const enterTagID=await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Tag ID"]');
await enterTagID.setValue(tagId);
const generateGRN=await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btnGenerateGRN');
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

        // After all tests, end the session
    test.afterAll(async () => {
        if (driver) {
            await driver.deleteSession();
            //console.log("3333333333");
        }
    });
});