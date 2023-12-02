# Compare how a post looks with different resolution on different navigators

Uses chromiums as the standard and compares all other browsers to it

## Instructions

1. Create a post on ghost js
2. create file config.json
3. add the detail url (not the editor view) f the created posts config.json under urls. Ensure is part of the array

```
{
    "urls":["http://localhost:2369/this-a-post-to-tesst/"],
    ...
}
```

4. Install playwright browesers `npx playwright install`
5. Execute with `node index.js`
6. The generated report will be under results/{urlIndex}
