# locker

Körs på pihole.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

[Run Bun as a daemon](https://bun.com/guides/ecosystem/systemd) with systemd.

```systemd
[Unit]
Description=Lock doors when alarm is set
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/locker/
ExecStart=/root/.bun/bin/bun run index.ts
Restart=always
RuntimeMaxSec=7d

[Install]
WantedBy=multi-user.target
```
