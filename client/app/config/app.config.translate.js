(function() {
    'use strict';

    angular
        .module('app')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig($translateProvider, $translatePartialLoaderProvider, APP_LANGUAGES) {
        /**
         *  each module loads its own translation file - making it easier to create translations
         *  also translations are not loaded when they aren't needed
         *  each module will have a il8n folder that will contain its translations
         */
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json' //configure the default language structure (applies to all modules even app)
                                                    //lang and part are reserved keywords
        });

        $translatePartialLoaderProvider.addPart('app'); //app/il8n/{lang}.json
                                                        //app/modules/authentication/il8n/{lang}.json should be this

        // make sure all values used in translate are sanitized for security
        $translateProvider.useSanitizeValueStrategy('sanitize');

        // cache translation files to save load on server
        $translateProvider.useLoaderCache(true);

        // setup available languages in translate
        var languageKeys = [];
        for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
            languageKeys.push(APP_LANGUAGES[lang].key);
        }

        /**
         *  try to detect the users language by checking the following
         *      navigator.language
         *      navigator.browserLanguage
         *      navigator.systemLanguage
         *      navigator.userLanguage
         */
        $translateProvider
        .registerAvailableLanguageKeys(languageKeys, {
            'en_US': 'en',
            'en_UK': 'en'
        })
        .use('en');

        // store the users language preference in a cookie
        $translateProvider.useLocalStorage();


        //$translateProvider.preferredLanguage('en');

    }
})();