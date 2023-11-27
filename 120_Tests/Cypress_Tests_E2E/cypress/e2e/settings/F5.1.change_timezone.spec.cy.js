const { faker } = require("@faker-js/faker");
const settingsPage = require("../../pages/settingsPage");
var timezone;
var timezoneNames
describe('Cambiar el timezone del sitio y verificar que se haya guardado bien', () => {
    beforeEach(()=>{
        // Given - Un ambiente normal de trabajo en Ghost en settings/General
        cy.viewport(1000, 660);
        cy.login()
        cy.goToPage("settings/general")
        cy.wait(1000)

        timezone = faker.number.int({ min: 0, max: 65 }) //random number between 1 and 66
        timezoneNames = [
            {
                0: '(GMT -11:00) Midway Island, Samoa',
                1: '(GMT -10:00) Hawaii',
                2: '(GMT -9:00) Alaska',
                3: '(GMT -8:00) Chihuahua, La Paz, Mazatlan',
                4: '(GMT -8:00) Pacific Time (US & Canada); Tijuana',
                5: '(GMT -7:00) Arizona',
                6: '(GMT -7:00) Mountain Time (US & Canada)',
                7: '(GMT -6:00) Central America',
                8: '(GMT -6:00) Central Time (US & Canada)',
                9: '(GMT -6:00) Guadalajara, Mexico City, Monterrey',
                10: '(GMT -6:00) Saskatchewan',
                11: '(GMT -5:00) Bogota, Lima, Quito',
                12: '(GMT -5:00) Eastern Time (US & Canada)',
                13: '(GMT -5:00) Indiana (East)',
                14: '(GMT -4:00) Caracas, La Paz',
                15: '(GMT -4:00) Atlantic Time (Canada); Greenland',
                16: '(GMT -4:00) Santiago',
                17: '(GMT -3:30) Newfoundland',
                18: '(GMT -3:00) Buenos Aires, Brasilia, Georgetown',
                19: '(GMT -2:00) Fernando de Noronha',
                20: '(GMT -1:00) Azores',
                21: '(GMT -1:00) Cape Verde Is.',
                22: '(GMT) UTC',
                23: '(GMT +0:00) Casablanca, Monrovia',
                24: '(GMT +0:00) Dublin, Edinburgh, London',
                25: '(GMT +1:00) Amsterdam, Berlin, Rome, Stockholm, Vienna',
                26: '(GMT +1:00) Belgrade, Bratislava, Budapest, Prague',
                27: '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris',
                28: '(GMT +1:00) Sarajevo, Skopje, Warsaw, Zagreb',
                29: '(GMT +1:00) West Central Africa',
                30: '(GMT +2:00) Athens, Beirut, Bucharest, Istanbul',
                31: '(GMT +2:00) Cairo, Egypt',
                32: '(GMT +2:00) Harare',
                33: '(GMT +2:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius',
                34: '(GMT +2:00) Jerusalem',
                35: '(GMT +2:00) Pretoria',
                36: '(GMT +3:00) Baghdad',
                37: '(GMT +3:00) Kuwait, Nairobi, Riyadh',
                38: '(GMT +3:00) Moscow, St. Petersburg, Volgograd',
                39: '(GMT +3:30) Tehran',
                40: '(GMT +4:00) Abu Dhabi, Muscat',
                41: '(GMT +4:00) Baku, Tbilisi, Yerevan',
                42: '(GMT +4:30) Kabul',
                43: '(GMT +5:00) Islamabad, Karachi, Tashkent',
                44: '(GMT +5:00) Yekaterinburg',
                45: '(GMT +5:30) Chennai, Calcutta, Mumbai, New Delhi',
                46: '(GMT +5:45) Katmandu',
                47: '(GMT +6:00) Almaty, Novosibirsk',
                48: '(GMT +6:00) Astana, Dhaka, Sri Jayawardenepura',
                49: '(GMT +6:30) Rangoon',
                50: '(GMT +7:00) Bangkok, Hanoi, Jakarta',
                51: '(GMT +7:00) Krasnoyarsk',
                52: '(GMT +8:00) Beijing, Chongqing, Hong Kong, Urumqi',
                53: '(GMT +8:00) Irkutsk, Ulaan Bataar',
                54: '(GMT +8:00) Kuala Lumpur, Perth, Singapore, Taipei',
                55: '(GMT +9:00) Osaka, Sapporo, Tokyo',
                56: '(GMT +9:00) Seoul',
                57: '(GMT +9:00) Yakutsk',
                58: '(GMT +9:30) Adelaide',
                59: '(GMT +9:30) Darwin',
                60: '(GMT +10:00) Brisbane, Guam, Port Moresby',
                61: '(GMT +10:00) Canberra, Hobart, Melbourne, Sydney, Vladivostok',
                62: '(GMT +11:00) Magadan, Soloman Is., New Caledonia',
                63: '(GMT +12:00) Auckland, Wellington',
                64: '(GMT +12:00) Fiji, Kamchatka, Marshall Is.',
                65: '(GMT +12:00) International Date Line West'
        }
        ]
    })
    it('Change site timezone', ()=>{
        // When - I change the site name with a new name from Faker
        settingsPage.changeTimezone(timezone);

        // Then - I check the title is changed
        cy.goToPage("settings/general")
        cy.get('span[data-select-text="' + timezoneNames[0][timezone] + '"').should('exist')
        //cy.log(timezoneNames[0][timezone])
    })
  })