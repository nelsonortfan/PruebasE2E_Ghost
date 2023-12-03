# PruebasE2E_Ghost

## Semana 1 enterga

Go to folder Semana1_EstrategiaFinal
Video: https://uniandes-my.sharepoint.com/:v:/g/personal/ji_bernal27_uniandes_edu_co/EdnP_88qsVVAveu0Ag_S4voBaByAcBq7ZejQzD1bpBH9MQ?e=AD5hR8&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D

Go to the folder 120_Tests/Cypress_Tests_E2E and use the readme in order to execute the 120 tests using the different techniques of generating data:

- [Cypress](./120_Tests/Cypress_Tests_E2E/README.md)
  Since this produces a large amount of login events ensure ghost is setup to allow this.

Example spam section of config.development.json for local ghost

```
"spam": {
    "user_login": {
        "minWait": 1,
        "maxWait": 1,
        "freeRetries": 5000000000,
        "lifetime":1
    },
    "global_block": {
      "minWait": 1,
      "maxWait": 1,
      "freeRetries": 5000000000,
      "lifetime":1
    },
    "private_block":{
      "minWait": 1,
      "maxWait": 1,
      "freeRetries": 5000000000,
      "lifetime":1
    },
    "global_reset":{
      "minWait": 1,
      "maxWait": 1,
      "freeRetries": 5000000000,
      "lifetime":1
    },
    "user_reset":{
      "minWait": 1,
      "maxWait": 1,
      "freeRetries": 5000000000,
      "lifetime":1
    },
    "member_login":{
      "minWait": 1,
      "maxWait": 1,
      "freeRetries": 5000000000,
      "lifetime":1
    }
}
```

### The Readme.md of each tool is in the folder of each tool. Links:

Since this produces a large amount of login events ensure ghost is setup to allow this.
https://forum.ghost.org/t/too-many-login-attempts/15621

- [Cypress](./Cypress_Tests_E2E/README.md)
- [Kraken](./Kraken_Tests_E2E/README.md)
- [VRT Report Script](./VRT_Scritps/README.md)

##### ResembleJS Report

Go to VRT_Scritps folder and follow the readme

- [Link to VRT Report - ResembleJS](./VRT_Scritps/results/report.html)

##### BackStopJs Report

Go to folders VRT_Scritps -> BackstopReport and follow the readme instrucions
Follwoing report may take a while loading

- [Link to VRT Report - BackstopJS](https://uniandes-my.sharepoint.com/personal/ji_bernal27_uniandes_edu_co/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fji%5Fbernal27%5Funiandes%5Fedu%5Fco%2FDocuments%2FBackstopJS%20Report%20%2811%5F19%5F2023%209%5F03%5F51%20PM%29%2Ehtml&parent=%2Fpersonal%2Fji%5Fbernal27%5Funiandes%5Fedu%5Fco%2FDocuments&ga=1)

### Integrates

- Juan Andrés Ardila - ja.ardila2@uniandes.edu.co
- Nelson Ortiz Farfan - n.ortizf@uniandes.edu.co
- Angel Racini Meza - a.racini@uniandes.edu.co
- Jairo Ivan Bernal Acosta - ji.bernal27@uniandes.edu.co
