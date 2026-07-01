# How to run this documentation with Hugo

- copy `.env.example` to `.env`
- adjust `PORT` if needed
- run `docker-compose up` — builds every `docs/*` branch (same as `build-local.sh`/`Dockerfile`) and serves the result

{{< note title="Running Hugo" class="warning" >}}
All `docs/*` branches must exist locally (`git branch --list 'docs/*'`) for the build to pick them up.
{{< /note >}}
