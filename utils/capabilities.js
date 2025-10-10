// capabilities.js
module.exports = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {

        //Local
        // platformName: 'Android',
        // deviceName: 'RZCX20C3RVT', // your emulator/device name
        // app: '../testdata/RIMS2-1.0.104.apk', // full path to your APK
        // automationName: 'UiAutomator2',
        // appWaitActivity: '*', // wait for any activity
        // newCommandTimeout: 300,
        // autoGrantPermissions: true // <-- auto-accepts all runtime permissions
        
        // BrowserStack
        platformName: 'Android',
        deviceName: 'Android Emulator',
        // platformVersion: '9.0',
        app: '../testdata/RIMS2-1.0.104.apk', // replace with your BrowserStack app URL
        automationName: 'UiAutomator2',
        appWaitActivity: '*',
        newCommandTimeout: 300,
        autoGrantPermissions: true   
    }
};
