class prdpage {
  constructor(page) {
    this.page = page;
    this.rimsLink = page.getByText('RIMS');
    this.prdLink = page.getByRole('link', { name: 'PRD' });
    this.openPrdsTab = page.getByRole('tab', { name: 'Open PRDs' });
  }

  async navigateToPrd() {
    await this.rimsLink.click();
    await this.prdLink.click();
    await this.openPrdsTab.click();
  }
}

module.exports = { prdpage };
