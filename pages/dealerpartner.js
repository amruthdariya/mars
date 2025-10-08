const { expect } = require('@playwright/test');
global.subrequestId = null;

class dealerpartner {
  constructor(page, testData) {

    if (!testData) throw new Error("createrequestpage: testData is undefined!");
    if (!testData.serialNumber || !testData.articleId)
      throw new Error("createrequestpage: serialNumber or articleId missing in testData!");

    this.page = page;
    this.serialNumber = testData.serialNumber; // corrected casing
    this.articleID = testData.articleId;  
    this.customerName = testData.customerName;
    this.contactNumber = testData.contactNumber;
    this.location =testData.location;
     // corrected casing
    this.header = page.locator('//div[text()="Return Creation "]');
    this.createRequestBtn = page.locator('//span[text()="Create Request"]');
  }

  async verifyModuleAndStartRequest() {
    const headerText = await this.header.textContent();
    if (headerText === "Return Creation ") {
      console.log("Return creation module is displayed");
      await expect(this.createRequestBtn).toBeVisible();
      await this.createRequestBtn.click();
      await expect(this.page.locator('//span[text()="Return / Claim Requests"]')).toBeVisible();
      console.log("Request type selection page displayed");
      await this.page.locator('//i[@role="button"]').nth(4).click();
      await this.page.getByText('Dealer-Partner Sales Return').click();
      await this.page.getByLabel("Customer/Entity Name*").click();
      await this.page.locator("//div[text()='Dava gajendra - (sales999)']").click();
      await this.page.locator("(//i[@role='button'])[5]").click();
    }
  }

  async fillCustomerDetails(contactNumber=this.contactNumber,location=this.location ) {
  //   await this.page.getByLabel("Customer/Entity Name*").fill(String(customerName));
   await this.page.getByLabel("Contact Number*").fill(String(contactNumber));
  await this.page.getByLabel("Item Location (Address)*").fill(String(location));
   }

  async fillItemDetails(serialNumber = this.serialNumber, articleID = this.articleID,tagId) {
    if (!serialNumber || !articleID)
      throw new Error("fillItemDetails: serialNumber or articleID is undefined!");

    await this.page.evaluate(() => window.scrollBy(0, 500));
    await this.page.locator('(//i[@role="button"])[6]').click();
    await this.page.locator('//div[text()="Serial Number"]').click();
    await this.page.locator('(//label[text()="Serial Number"])[1]').fill(String(serialNumber));
    await this.page.locator('(//label[text()="Article ID"])[1]').fill(String(articleID));
    await this.page.evaluate(() => window.scrollBy(0, 500));
    await this.page.locator("(//label[text()='Add Tag ID'])[1]").fill(String(tagId));
    await this.page.locator("(//label[text()='Add Box ID'])[1]").fill("BX-W398dy");

    // dropdown selections
    await this.page.locator("(//div[@class='v-field__input']//input[@type='text'])[8]").click();
    await this.page.locator("//div[@role='option']//div[text()='Online']").click();

    await this.page.locator("(//div[@class='v-field__input']//input[@type='text'])[9]").click();
    await this.page.locator("//div[text()='Refund Request']").click();

    await this.page.locator("(//div[@class='v-field__input']//input[@type='text'])[10]").click();
    await this.page.locator("//div[text()='Defective or Damaged Product']").click();

    await this.page.locator("(//div[@class='v-field__input']//input[@type='text'])[11]").click();
    await this.page.locator("//div[text()='Inappropriate Size']").click();
  }

  async submitAndVerifyOTP() {
    await this.page.locator('//span[text()="Submit"]').click();

    const [response] = await Promise.all([
      this.page.waitForResponse(resp =>
        resp.url().includes('get_otp_details?&contact_number=7569376877') && resp.status() === 200
      ),
    ]);

    const responseBody = await response.json();
    console.log("API Response:", responseBody);
    const otp = responseBody.otp_verifications[0].details.otp;
    console.log("Captured OTP:", otp);

    await this.page.getByLabel("Enter OTP").fill(String(otp));
    await this.page.locator('(//span[text()="Submit"])[2]').click();
  }

  async captureSubRequestId() {
    const confmsg = await this.page.locator("//div[@class='v-card-text text-center']").textContent();
    console.log(confmsg);
    const match = confmsg.match(/rs-[a-z0-9]+/i);
    subrequestId = match ? match[0] : null;
    console.log("Sub Request ID:", subrequestId);
    await this.page.locator("//span[text()='Ok']").click();
    return subrequestId;
  }

  async searchsubrequestId(subrequestId) {
    await this.page.getByLabel('Search').fill(subrequestId);
    await this.page.keyboard.press('Enter');
    await expect(this.page.locator('(//td/span/a)[1]')).toHaveText(subrequestId);
    await this.page.locator("(//td/span/a)[1]").click();
    //await expect(this.page.locator('(//p)[28]')).toHaveText('Pending Testing');
  }

  async assignServicePartner() {
    await this.page.locator('div').filter({ hasText: /^Service PartnerUpdate$/ }).locator('a').click();
    await this.page.locator("(//input)[3]").click();
    await this.page.getByRole('textbox', { name: 'Assign To Assign To' }).click();
    await this.page.locator("//div[text()='Dava electronics  (SP667)']").click();
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.getByRole('button', { name: 'Ok' }).click();
  }

  async assignServiceTechnician() {
    await this.page.locator('a').filter({ hasText: 'Update' }).click();
    await this.page.getByRole('dialog').getByRole('button', { name: 'Open' }).click();
    await this.page.locator("//div[text()='Rajesh rajesh (ST02)']").click();
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.getByRole('button', { name: 'Ok' }).click();
  }
}

module.exports = { dealerpartner };
