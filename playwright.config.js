// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { TIMEOUT } from 'dns';



/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config=({
  testDir: './tests',
  timeout:60*1000,
  expect:{
    timeout:60*1000,
  },
reporter: [["allure-playwright"]],

  use: {
    browserName:"chromium",
    headless:false,
    screenshot: 'only-on-failure',
    trace:'retain-on-failure'
  },

});

module.exports = config