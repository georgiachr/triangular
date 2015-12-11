(function() {
    'use strict';

    angular
        .module('app')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig(triSettingsProvider, APP_LANGUAGES) {
        // set app name & logo (used in loader, sidemenu, login pages, etc)
        triSettingsProvider.setName('ARITI');
        triSettingsProvider.setLogo('assets/images/logo.png');
        // set current version of app (shown in footer)
        triSettingsProvider.setVersion('1.0.1');

        /*
         this.addLanguage = addLanguage;
         this.setLogo = setLogo;
         this.setName = setName;
         this.setCopyright = setCopyright;
         this.setVersion = setVersion;
         */

        //APP_LANGUAGES = [{name: 'English', key: 'en'},{name: 'Ελληνικά', key: 'el'}];

        // setup available languages in triangular
        for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
            triSettingsProvider.addLanguage({
                name: APP_LANGUAGES[lang].name,
                key: APP_LANGUAGES[lang].key
            });
        }
    }
})();