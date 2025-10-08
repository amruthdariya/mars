class returnapprovalpage {
  constructor(page,testData3,testData4) {
    this.page = page;
    this.url = testData3.url?.hyperlink || testData3.url?.text || testData3.url;
    this.username = testData3.username;
    this.password = testData3.password;
    this.username2 = testData4.username;
    this.password2 = testData4.password;
     this.usernameField = page.locator('input[type="text"]');
    this.passwordField = page.locator('input[type="password"]');
    this.loginBtn = page.locator('//span[text()="Login"]');
    this.RIADropdown = page.locator("//v-list-item-content[@id='button_1']");
    this.returnApproval = page.locator("//span[text()='Return Approval']");
    this.d2cSales = page.locator("//span[text()='D2C Sales Return']");
    this.firstRequest = page.locator("(//td/span/a)[1]");
    this.selectMethodDropdown = page.locator("(//div//i[@role='button'])[5]");
    this.refundOption = page.locator("//div[text()='Refund with Return of item without Depreciation']");
    this.refundPercentage = page.locator("(//input[@type='text'])[4]");
    this.commentField = page.locator("(//input[@type='text'])[5]");
    this.approveBtn = page.locator("//span[text()='Approve']");
    this.confirmMsg = page.locator("//div[@class='v-card-actions mt-2']");
    this.okBtn = page.locator("//span[text()=' Ok ']");
    this.userMenu = page.locator("//span[@class='pull-right'][1]");
    this.logoutBtn = page.getByText('Logout', { exact: true });
  }
 async navigate() {
    await this.page.goto(this.url);
  }

  async login() {
    await this.usernameField.fill(this.username);
    await this.passwordField.fill(this.password);
    await this.loginBtn.click();
  }
  async login2() {
    await this.usernameField.fill(this.username2);
    await this.passwordField.fill(this.password2);
    await this.loginBtn.click();
  }
  async navigateToReturnApproval() {
    await this.RIADropdown.click();
    await this.returnApproval.click();
    await this.d2cSales.click();
    await this.firstRequest.click();
  }

  async approveRefund(percentage, comment) {
    await this.selectMethodDropdown.click();
    await this.refundOption.click();
    await this.refundPercentage.fill(percentage);
    await this.commentField.fill(comment);
    await this.approveBtn.click();
    const msg = await this.confirmMsg.textContent();
    console.log("Confirmation: ", msg);
    await this.okBtn.click();
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutBtn.click();
    await this.page.waitForTimeout(2000);
  }
}

module.exports = { returnapprovalpage };
