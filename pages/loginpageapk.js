class loginpageapk {
  constructor(page, testData2) {
    if (!testData2) throw new Error("testData2 is undefined!");
    this.page = page;

    // Extract the actual URL string
    this.url = testData2.url?.hyperlink || testData2.url?.text || '';
    this.username = testData2.username;
    this.password = testData2.password;

    // Define locators
    this.usernameField = page.getByRole('textbox', { name: 'Username' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async login(usernameApk = this.username, passwordApk = this.password) {
    // Wait for fields to appear
    await this.usernameField.waitFor({ state: 'visible' });
    await this.passwordField.waitFor({ state: 'visible' });

    // Fill credentials
    await this.usernameField.fill(usernameApk);
    await this.passwordField.fill(passwordApk);

    // Click Sign In
    await this.signInButton.click();
  }
}

module.exports = { loginpageapk };
