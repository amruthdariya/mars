const { _android } = require('@playwright/test');
test.describe.configure({ mode: 'serial' });
import { test,expect } from '@playwright/test';
const { remote } = require('webdriverio');
const caps = require('../utils/capabilities');
const assert = require('assert');
const { readTestData} = require('../utils/filereader');
let record;
let tagId;
let pickupReqId;
let driver;


function generateTagId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `T-${result}`;
}

test('Dispatch process', async({page})=>{
 test.setTimeout(60000);
    await page.goto('https://rims-demo.blubirch.com/', {timeout: 80000});
    await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).click();
    await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).fill('svastiadmin@yopmail.com');
    await page.getByRole('textbox', { name: 'Enter Password' }).click();
    await page.getByRole('textbox', { name: 'Enter Password' }).fill('blubirch12!@');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByText('RIMS').click();


    const dispatchModule=page.locator("(//span[text()='Dispatch'])[1]");
  await dispatchModule.click();
  await page.waitForTimeout(3000);
   const checkBox=page.locator("(//tr[@class='v-data-table__tr']/td)[1]");
    await checkBox.click();
  await checkBox.click();
 const  createReqBtn=page.locator("//span[text()='Create Pickup Request']");
 await createReqBtn.click();
 const assignExeBtn=page.locator("//span[text()='Assign Executive']");
 await assignExeBtn.click();
 const assignToDropdown=page.locator("(//div[@class='v-field__append-inner']/i)[7]");
    await assignToDropdown.click();
    await page.getByText("davaexecutive2@yopmail.com").click();
    //await page.locator("//span[text()='Create Request']").click();
    await assignToDropdown.click();
const submitBtn=page.locator("//span[text()='Submit']");
await submitBtn.click();
  const confmsg= await page.locator("//div[@class='v-card-text text-center']").textContent();
  console.log(confmsg);

  const match = confmsg.match(/P-[0-9]+/i);
   pickupReqId = match ? match[0] : null
  console.log("Sub Request ID:", pickupReqId);
   const OKBtn=page.locator("//span[text()='Ok']");
  await OKBtn.click();
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

    test('should login successfully with valid credentials', async () => {
         tagId = generateTagId();
       // test.setTimeout(4000);
        //console.log("22222222222");
    //     // Locate elements
        const usernameField = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/edtEmail');
         await usernameField.waitForDisplayed({ timeout: 5000 });
        await usernameField.setValue('davaexecutive2@yopmail.com');
        
        const passwordField = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/edtPassword');
        await passwordField.waitForDisplayed({ timeout: 5000 });
         await passwordField.setValue('blubirch123');
         const loginButton = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btnSignIn');
         await loginButton.click();
         const pickandPackBtn =await driver.$('//android.widget.TextView[@resource-id="com.blubirch.rims.whirlpoolDemo:id/itemTV" and @text="Pick & Pack"]');
         await pickandPackBtn.click();

         const requestIDSearch =await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/edtRequestId"]');
         await requestIDSearch.click();
         await requestIDSearch.setValue(pickupReqId);
         const  pickupReq=await driver.$('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.blubirch.rims.whirlpoolDemo:id/rvItemList"]/android.view.ViewGroup[1]');
         await pickupReq.click();
         const scanSubLoc = await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Scan Sub-location ID"]');
         await scanSubLoc.click();
         await scanSubLoc.setValue('r694_002');
         const scanTagId= await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Scan Tag/Box/Toat ID"]');
         await scanTagId.click();
         await scanTagId.setValue('T-9H0G0U');
         const arrowBtn = await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnPack"]');
         await arrowBtn.click();
         const proceedBtn = await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnRight"]');
         await proceedBtn.click();
         const scanTagId2 = await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Scan Tag/Box/Toat ID"]');
         await scanTagId2.click();
         await scanTagId2.setValue('T-9H0G0U');
         const scanSubLoc2 = await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Scan Sub-Location ID"]');
         await scanSubLoc2.setValue('GCC_01');
         const arrowBtn2 =await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnPack"]');
         await arrowBtn2.click();
         const submitBtn2 =driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnRight"]');
         await submitBtn2.click();
         const pickupConfrmMsgElem = await driver.$('//android.widget.TextView[@resource-id="com.blubirch.rims.whirlpoolDemo:id/md_text_message"]').getText();
         await pickupConfrmMsgElem.waitForExist({ timeout: 5000 });
         console.log("Pickup confirm message:", pickupConfrmMsgElem);
         const okBtnInPickup = await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/md_button_positive"]');
         await okBtnInPickup.click();

    });

});

test('Assign Packaging request',async({page})=>{
    test.setTimeout(60000);
    await page.goto('https://rims-demo.blubirch.com/', {timeout: 80000});
    await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).click();
    await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).fill('svastiadmin@yopmail.com');
    await page.getByRole('textbox', { name: 'Enter Password' }).click();
    await page.getByRole('textbox', { name: 'Enter Password' }).fill('blubirch12!@');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByText('RIMS').click();


    const dispatchModule=page.locator("(//span[text()='Dispatch'])[1]");
  await dispatchModule.click();

  const clkUpdatePackagingReq=page.locator("//span[text()='Pending Packaging']");
  await clkUpdatePackagingReq.click();
   const checkBox=page.locator("(//tr[@class='v-data-table__tr']/td)[1]");
   await page.waitForTimeout(3000);
    await checkBox.click();
 const  createReqBtn=page.locator("//span[text()='Create Packaging Request']");
 await createReqBtn.click();
 const assignExeBtn=page.locator("//span[text()='Assign Executive']");
 await assignExeBtn.click();
 const assignToDropdown=page.locator("(//div[@class='v-field__append-inner']/i)[6]");
await assignToDropdown.click();
await page.getByText("davaexecutive2@yopmail.com").click();
//await page.locator("//span[text()='Create Request']").click();
await assignToDropdown.click();
const submitBtn=page.locator("//span[text()='Submit']");
await submitBtn.click();
  const confmsg= await page.locator("//div[@class='v-card-text text-center']").textContent();
  console.log(confmsg);

  const match = confmsg.match(/P-[0-9]+/i);
   pickupReqId = match ? match[0] : null
  console.log("Sub Request ID:", pickupReqId);
   const OKBtn=page.locator("//span[text()='Ok']");
  await OKBtn.click();
});


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

test('should login successfully with valid credentials2', async () => {

       // test.setTimeout(4000);
        //console.log("22222222222");
    //     // Locate elements
        const usernameField = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/edtEmail');
         await usernameField.waitForDisplayed({ timeout: 5000 });
        await usernameField.setValue('davaexecutive2@yopmail.com');
        
        const passwordField = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/edtPassword');
        await passwordField.waitForDisplayed({ timeout: 5000 });
         await passwordField.setValue('blubirch123');
         const loginButton = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btnSignIn');
          await loginButton.waitForDisplayed({ timeout: 5000 });
         await loginButton.click();
         const pickandPackBtn =await driver.$('//android.widget.TextView[@resource-id="com.blubirch.rims.whirlpoolDemo:id/itemTV" and @text="Pick & Pack"]');
          await pickandPackBtn.waitForDisplayed({ timeout: 5000 });
         await pickandPackBtn.click();

         const requestIDSearch =await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/edtRequestId"]');
          await requestIDSearch.waitForDisplayed({ timeout: 5000 });
         await requestIDSearch.click();
         await requestIDSearch.setValue(pickupReqId);
         const  packReq=await driver.$('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.blubirch.rims.whirlpoolDemo:id/rvItemList"]/android.view.ViewGroup[1]');
          await packReq.waitForDisplayed({ timeout: 5000 });
         await packReq.click();
        const scanBoxId= await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Scan Box ID"]');
         await scanBoxId.waitForDisplayed({ timeout: 5000 });
        await scanBoxId.setValue('BX90903');
        const scaTagIdd=await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Scan Tag/Box Id"]');
         await scaTagIdd.waitForDisplayed({ timeout: 5000 });
        await scaTagIdd.setValue('T-5BW2XL');
        const arrowBtn3=await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnPack"]');
         await arrowBtn3.waitForDisplayed({ timeout: 5000 });
        await arrowBtn3.click();
        const submitBtn = await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnLeft"]');
        await submitBtn.waitForDisplayed({ timeout: 5000 });
        await submitBtn.click();
        const complteRequest=await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnCompleteRequest"]');
         await complteRequest.waitForDisplayed({ timeout: 5000 });
        await complteRequest.click();

         const packConfrmMsgElem = await driver.$('//android.widget.TextView[@resource-id="com.blubirch.rims.whirlpoolDemo:id/md_text_message"]').getText();
         await packConfrmMsgElem.waitForExist({ timeout: 5000 });
         console.log("Packaging confirm message:", packConfrmMsgElem);
         const okBtnInPickup = await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/md_button_positive"]');
         await okBtnInPickup.click();
});
});

test.only('pending dispatch', async({page})=>{
    test.setTimeout(60000);
    await page.goto('https://rims-demo.blubirch.com/', {timeout: 80000});
    await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).click();
    await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).fill('svastiadmin@yopmail.com');
    await page.getByRole('textbox', { name: 'Enter Password' }).click();
    await page.getByRole('textbox', { name: 'Enter Password' }).fill('blubirch12!@');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByText('RIMS').click();


    const dispatchModule=page.locator("(//span[text()='Dispatch'])[1]");
    await dispatchModule.click();
    const pendingDispatchTab=page.locator("//span[text()='Pending Dispatch']");
    await pendingDispatchTab.click();
    const checkBox=page.locator("(//tr[@class='v-data-table__tr']/td)[1]");
   await page.waitForTimeout(3000);
   await checkBox.click();
   const updateDispatchBtn=page.locator("//span[text()='Update Dispatch ']");
   await updateDispatchBtn.click();
   await page.getByLabel("ORD Number").fill("ORRD09483");
   const modeDropdown=page.locator("(//div[@class='v-field__append-inner']/i)[5]");
   await modeDropdown.click();
   await page.locator("//div[text()='Dispatch']").click();
   const lpDropdown=page.locator("(//div[@class='v-field__append-inner']/i)[6]");
  await lpDropdown.click();
  await page.getByText("Nagaraj logistics (123456789)").click();
  await page.getByLabel("Vehicle Number").fill("KA0987843");
  await page.getByLabel("STN").fill("S8979");
  page.waitForTimeout(2000);
  const fileInput = page.locator('//input[@type="file"]');
await fileInput.setInputFiles('C:\\Users\\Blubirch.DESKTOP-EN2LGLN\\Pictures\\img7.jpg');


  // Set the file(s) to upload
  //await fileChooser.setFiles('C:\\Users\\Blubirch.DESKTOP-EN2LGLN\\Pictures\\img7.jpg');
  await page.waitForTimeout(3000);
  await page.locator("//span[text()='Submit']").click();
  const confMsg=page.locator("//div[@class='v-card-text text-center']").textContent();
  console.log('dispatched', confMsg);
  await page.locator("//span[text()='Ok']").click();

  console.log('****************Thank you********************');
});