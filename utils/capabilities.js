// capabilities.js
module.exports = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
        platformName: 'Android',
        deviceName: 'RZCX20C3RVT', // your emulator/device name
        app: 'C:/Users/Blubirch.DESKTOP-EN2LGLN/PLAYWRIGHT AUTOMATION/testdata/RIMS2-whirlpoolDemo-1.0.104.apk', // full path to your APK
        automationName: 'UiAutomator2',
        appWaitActivity: '*', // wait for any activity
        newCommandTimeout: 300,
        autoGrantPermissions: true // <-- auto-accepts all runtime permissions
        
    }
};
