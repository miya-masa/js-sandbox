/*!
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
(function() {
    'use strict';
    var ContactManager = new Marionette.Application();

    ContactManager.addRegions({
        mainRegion: '#main-region'
    });


    ContactManager.Contact = Backbone.Model.extend({});
    ContactManager.ContactCollection = Backbone.Collection.extend({
        model: ContactManager.Contact,
        comparator: 'firstName'
    });

    // 追加
    ContactManager.ContactItemView = Marionette.ItemView.extend({
        tagName: 'li',
        template: '#contact-list-item-template'
    });
    // CollectionView
    ContactManager.ContactsView = Marionette.CollectionView.extend({
        tagName: 'ul', // デフォルトでは div タグになります。
        childView: ContactManager.ContactItemView
    });

    ContactManager.onStart = function() {

        // CollectionはArrayの中にObjectでモデルをつっこみます。
        var contacts = new ContactManager.ContactCollection([{
            firstName: 'Bob',
            lastName: 'Brigham',
            phoneNumber: '555-0163'
        }, {
            firstName: 'Alice',
            lastName: 'Arten',
            phoneNumber: '555-0184'
        }, {
            firstName: 'Charlie',
            lastName: 'Campbell',
            phoneNumber: '555-0129'
        }]);
        // CollectionViewのインスタンス
        var contactsListView = new ContactManager.ContactsView({
            collection: contacts
        });
        //    var alice = new ContactManager.Contact({
        //        firstName: 'Alice',
        //        lastName: 'Arten',
        //        phoneNumber: '555-0184'
        //    });
        // viewのインスタンス
        //    var aliceView = new ContactManager.ContactView({
        //        model: alice
        //    });
        // mainRegionにviewを表示
        ContactManager.mainRegion.show(contactsListView);

        console.log('Hello Marionette!!');
    };
    ContactManager.start();
})();
