# PruebasE2E_Ghost

## Semana 1

### E2E with data valdiations tests

- `Semana1_EstrategiaFinal/Cypress_Tests_E2E` 31 pruebas de integraciones , hisotrial , pages y settings.

### VTR tests

- `Semana1_EstrategiaFinal/VRT/BackstopReportPages` -> Comparar 2 versiones de ghost para pages como visitante
- `Semana1_EstrategiaFinal/VRT/postDetailRegression` -> Compaarar un post como visitante en diferentes navegadores y diferentes tamaños de pantalla

### explorations tests

- `Semana1_EstrategiaFinal/monkey-cypress` -> dashboard como administrdor
- `Semana1_EstrategiaFinal/monkey-Pages` -> Ir al sitio como visitante
- `Semana1_EstrategiaFinal/moneky-tags` -> Validación de tags como administrdor
- `Semana1_EstrategiaFinal/Rippiet-Tags` -> Exploración de tags como administrdor
- `Semana1_EstrategiaFinal/RippietPages`-> Ir al sitio como visitante

## Remeneded ghost config

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
