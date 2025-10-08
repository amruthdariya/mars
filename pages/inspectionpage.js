class InspectionPage {
  constructor(page,testData2) {
    this.page = page;
    this.serialNumber = testData2.serialNumber; // corrected casing
    this.articleID = testData2.articleId;  
    //this.filePath=testData2.filePath;
    this.inspectionTicket = page.getByText('Inspection Ticket');
    this.firstServiceReq = page.locator("(//ion-card[@class='padding5 margin2px md hydrated'])[1]");
    this.proceedBtn = page.getByRole('button', { name: 'Proceed' });
    this.articleIdField= page.getByRole('textbox', { name: 'Scan Article ID*' });
    this.serialNumberField = page.getByRole('textbox', { name: 'Scan Serial Number*' });
    this.startActivityBtn = page.getByRole('button', { name: 'Start Activity' });
  }

  async openInspectionTicket() {
    await this.inspectionTicket.click();
    await this.firstServiceReq.click();
    await this.proceedBtn.waitFor({ state: 'visible', timeout: 30000 });
    await this.proceedBtn.click();
    await this.page.locator('app-activity-action app-header svg').click();
    await this.proceedBtn.click();
  }

  async enterArticleAndSerial(articleID=this.articleID, serialNumber=this.serialNumber) {
    await this.articleIdField.waitFor({ state: 'visible' });
    await this.serialNumberField.waitFor({ state: 'visible' });
    await this.articleIdField.fill(String(articleID));
    await this.serialNumberField.fill(String(serialNumber));
    await this.startActivityBtn.click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }

   async answerQuestions() {
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('button', { name: 'No' }).click();
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('button', { name: 'Like New' }).click();
  }

  async uploadFile1(locator, filePath) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      locator.click()
    ]);
    await fileChooser.setFiles(filePath);
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('button', { name: 'Not Good' }).click();

  }

  async uploadFile2(locator, filePath) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      locator.click()
    ]);
    await fileChooser.setFiles(filePath);
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('button', { name: 'Minor Dents or Scratches' }).click();
    await this.page.waitForTimeout(3000);
    
}

async uploadFile3(locator, filePath) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      locator.click()
    ]);
     await this.page.waitForTimeout(2000);
    await fileChooser.setFiles(filePath);
    await this.page.waitForTimeout(3000);
  await this.page.locator('ion-radio').filter({ hasText: 'Left' }).click();
  await this.page.getByRole('button', { name: 'OK' }).click();
  await this.page.locator('canvas').click({
    position: {
      x: 771,
      y: 333
    }
  });
  await this.page.locator('ion-radio').click();
  await this.page.getByRole('button', { name: 'OK' }).click();
  await this.page.getByRole('button', { name: 'Finish' }).click();
  await this.page.getByRole('button', { name: 'Next' }).click();
}

  async completeActivity() {
    // symptoms
    await this.page.locator('span').filter({ hasText: 'Symptom' }).first().click();
    await this.page.getByText('Packing').click();
    await this.page.getByText('AMC').click();
    await this.page.getByText('Packing xAMC x').click();
    await this.page.getByRole('button', { name: 'Next' }).click();

    // fault found
    await this.page.locator('span').filter({ hasText: 'Fault Found' }).first().click();
    await this.page.getByRole('listitem').filter({ hasText: 'Packing Carton Damaged' }).click();
    await this.page.getByText('Packing Carton Damaged x').click();
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('radio', { name: 'Yes' }).click();
   await this.page.getByRole('button', { name: 'Next' }).click();
   await this.page.getByRole('radio', { name: 'Yes' }).click();
   await this.page.getByRole('button', { name: 'Next' }).click();

    // parts defective
    await this.page.locator('span').filter({ hasText: 'Parts Defective' }).first().click();
    await this.page.getByText('None').click();
    await this.page.locator('span').filter({ hasText: 'None x' }).first().click();
    await this.page.getByRole('button', { name: 'Next' }).click();

    // parts missing
    await this.page.locator('span').filter({ hasText: 'Parts Missing' }).first().click();
    await this.page.locator('ng-multiselect-dropdown').getByText('None').click();
    await this.page.locator('span').filter({ hasText: 'None x' }).first().click();
    await this.page.getByRole('button', { name: 'Next' }).click();

    // action required
    await this.page.locator('span').filter({ hasText: 'Action Required' }).first().click();
    await this.page.getByText('Part Replacement').click();
    await this.page.locator('span').filter({ hasText: 'Part Replacement x' }).first().click();
    await this.page.getByRole('button', { name: 'Next' }).click();
    // final submit
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

}
module.exports = { InspectionPage };
