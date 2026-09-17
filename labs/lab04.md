# Lab 4: Deploying a Web Application on EC2
**Duration:** 30 minutes · **Region:** your assigned Region

## 🎯 Objectives
- Install a web server and deploy a page on your instance
- Create an AMI from it and launch a second identical server in another AZ

---

## Exercise 4.1: Deploy on web-1 (10 min)
In the Instance Connect terminal for `userN-web-1`:
```bash
sudo dnf install -y httpd
sudo systemctl enable --now httpd
echo "<h1>Hello from $(ec2-metadata -i | cut -d' ' -f2) in $(ec2-metadata -z | cut -d' ' -f2)</h1>" | sudo tee /var/www/html/index.html
```
In the EC2 console copy the **Public IPv4 address** of `userN-web-1` and open `http://<public-ip>` in a new tab (http, not https). You should see the instance ID and the AZ of subnet 1.

> Page not loading? In order: instance Running → security group allows HTTP 80 → you typed `http://` → `sudo systemctl status httpd` shows active.

## Exercise 4.2: Create an AMI (5 min)
1. Select `userN-web-1` → **Actions** → **Image and templates** → **Create image**.
2. Image name `userN-web-ami` → **Create image**.
3. **AMIs** (left menu) — it shows *Pending* for 2–4 minutes, then *Available*. Read ahead while you wait.

## Exercise 4.3: Launch web-2 from the AMI (15 min)
The AMI has Apache and the page baked in, but the page still names web-1. A **user-data** script runs at first boot to fix that automatically.

1. **AMIs** → select `userN-web-ami` (Available) → **Launch instance from AMI**.
2. Same settings as Lab 3, except:

| Setting | Value |
|---|---|
| Name | `userN-web-2` |
| Key pair | `userN-key` |
| VPC | `userN-vpc` |
| Subnet | **`userN-subnet-public2-…` (subnet 2 — the other AZ)** |
| Auto-assign public IP | Enable |
| Security group | existing → `userN-web-sg` |
| IAM instance profile | `userN-ec2-role` |
| Advanced details → **User data** | paste below |

```bash
#!/bin/bash
echo "<h1>Hello from $(ec2-metadata -i | cut -d' ' -f2) in $(ec2-metadata -z | cut -d' ' -f2)</h1>" > /var/www/html/index.html
```

3. **Launch instance**. When Running, browse to **its** public IP. Different instance ID, **different AZ** — and you never logged in.

> Manual install → AMI → user data is how one server becomes a fleet. A load balancer in front of both is the next step (lecture).

---

## ✅ Keep running
`userN-web-1`, `userN-web-2`, `userN-web-ami` — cleaned up in Lab 8.

## 🧠 Knowledge Check
1. What does an AMI capture that user data does not?
2. Why put web-2 in a different Availability Zone?
