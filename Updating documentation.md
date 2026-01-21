1. Adding another version of the documentation.

copying the last existing version, assigning it a new version number, and applying the latest changes
adding the previously created version number to every config.yaml in each version of the manual:


```
section:
  id: "manual"
  version: "1.0.0"
  versions:
    - "latest"
    - "1.X.0"     # <<<
    - "1.1.0"
    - "1.0.0"
```


assigning the newest documentation version in config.yaml:

`
baseURL: "/manual/1.X.0/"
`

`
github:
  branch: "master/manual/1.X.0"
`

2. Copping java dependencies with licenses from eximeebpms project.

In eximeebpms run:

`mvn clean verify`

then copy file eximeebpms/target/THIRD-PARTY.txt to this project eximeebpms-docs/util/ then run:

`util/trimAndFormat.sh`

then copy conetent of `util/license-book.html` to `manual/<your-version>/content/introduction/third-party-libraries/camunda-bpm-platform-license-book.md`

3. Finally, overwrite the 'latest' folder with this newest version