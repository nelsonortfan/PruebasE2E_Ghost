Ensure you use node v18.18.1
Create file cypress.env.json and use cypress.env.json.example as a base
ghost_url: Url for recent version of Ghost
ghost_url_old: Url for older version of Ghost
ghost_email: Email for the ghost admin
ghost_password: password for the ghost admin

To run

Is recommended to use a fresh install of ghost since other configrations may change what is shown affecting the existing tests.

```
npm install
cypress run
```

Tu run member tests in Ghost v.3.42

1. Go to labs/members (<ghost_url_old>/#/settings/labs/members)
2. Click "Enable Members" checkbox
3. You may run the members_old tests
