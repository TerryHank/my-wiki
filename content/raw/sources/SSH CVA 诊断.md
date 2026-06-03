# ssh.cvalab.top / cva SSH diagnosis

Date: 2026-05-25 Asia/Shanghai

Goal: make `ssh cva` reach local host `192.168.10.118` as `root` and enable public-key login.

Verified local target:
- `root/shichengshi@192.168.10.118` password login works.
- Installed `C:\Users\TerryHank\.ssh\id_ed25519.pub` into `/root/.ssh/authorized_keys` append-only.
- Direct key login works: `ssh -i ~/.ssh/id_ed25519 root@192.168.10.118` returned `KEY_LOGIN_OK:root` and hostname `10x10`.
- Target SSH config: `permitrootlogin yes`, `pubkeyauthentication yes`, `passwordauthentication yes`.
- Target host key: `SHA256:ukTTyeabapZ8v3rvqi/swr+qCNe27avdpxmXi9ZwaII`.

Verified Cloudflare/cva path:
- Local SSH config `Host cva` uses `cloudflared.exe access ssh --hostname ssh.cvalab.top`.
- Target machine cloudflared service is active, tunnel ID `c1ba039c-a750-46e7-ad52-31616a46e2ce`.
- Remote-config ingress on target includes `ssh.cvalab.top -> ssh://localhost:22`.
- `ssh cva` and clean `cloudflared access tcp --hostname ssh.cvalab.top` both return SSH host key `SHA256:XVKRujKB73qC5TZy28fwMaXf1yzRvyuwDQyQUnUuDqI` and then `Permission denied (password)`.

Conclusion:
- Local host `192.168.10.118` is fixed for direct SSH/key login.
- `ssh.cvalab.top` is not currently landing on this host's sshd, despite the host running a cloudflared connector with a matching ingress rule.
- Most likely Cloudflare Zero Trust has a conflicting Access/public-hostname route or another connector/tunnel serving `ssh.cvalab.top` with host key `SHA256:XVKR...`.

Next fix in Cloudflare dashboard/API:
- In Zero Trust -> Networks -> Tunnels, ensure only the intended tunnel/public hostname routes `ssh.cvalab.top` to this connector/service.
- Remove or disable any older connector/tunnel/public hostname/Access SSH app that also serves `ssh.cvalab.top`.
- After changing Cloudflare routing, `ssh cva` should show server host key `SHA256:ukTT...`; then the installed public key will authenticate.
