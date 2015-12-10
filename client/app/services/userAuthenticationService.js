/**
 * Created by georgia.chr on 15-Sep-15.
 * This service holds a user, their details and http changes
 * The service can be shared among controllers (define the service's name as dependency injection )
 */

(function () {

    'use strict';

    angular
        .module('app')
        .service('useridentity', UserIdentity);

    /* @ngInject */
    function UserIdentity($http,$cookies) {

        return {
            userRole: null,
            userStatus: false,
            userToken: null,
            userID: null,
            userConfigHeaders: null,
            userName: null,
            userEmail: null,

            setUser: function setUser(data) {
                this.userName = data.user['name'];
                this.userToken = data.user['token'];
                this.userRole = data.user['title'];
                this.userID = data.user['id'];
                this.userEmail = data.user['email'];
            },
            setCookie: function setCookie(data) {
                if (data != undefined)
                    $cookies.putObject("userToken", {
                        userrole: data.user['title'],
                        useremail: data.user['email'],
                        token: data.user['token']
                    });
            }
            ,
            getCookie: function getCookie() {
                return $cookies.getObject("userToken");
            }
            ,
            loginUser: function loginUser(data) {
                this.userStatus = true;
                this.setUser(data);
                this.setHeader();
                this.setCookie(data);
            },

            logoutUser: function logoutUser() {
                this.userStatus = false;
                this.reset();
            },

            reset: function reset() {
                this.userToken = null,
                    this.userID = null,
                    this.userName = null;
                this.userRole = null,
                    this.userConfigHeaders = null
            },

            isLogin: function isLogin() {
                return this.status;
            },
            setLogin: function setLogin() {
                this.status = true;
            },

            setHeader: function setHeaders() {

                $http.defaults.headers.common['X-Auth-Token'] = this.userToken;
                //set the X-AUTH-TOKEN

            },
            resetHeader: function resetHeaders() {
                //console.log('userAuthService - resetHeader');
                this.userConfigHeaders = config;
                this.userConfigHeaders.headers.Authorization = '';
                //set the X-AUTH-TOKEN
            },
            getConfig: function getConfig() {
                return this.userConfigHeaders;
            },
            setUserStatus: function setUserStatus() {
                this.userStatus = true;
            },
            resetUserStatus: function resetUserStatus() {
                this.userStatus = false;
            }


        }

    }

    UserIdentity.$inject = ['$http','$cookies'];

})();