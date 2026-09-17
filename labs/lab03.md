# Lab 3: Creating EC2 Instances
**Duration:** 25 minutes · **Region:** your assigned Region

## 🎯 Objectives
- Create a key pair and launch an Amazon Linux instance into your VPC
- Connect to it from the browser and confirm it is using its IAM role

---

## Exercise 3.1: Key Pair (2 min)
1. **EC2** → **Key Pairs** → **Create key pair**.
2. Name `userN-key`, type RSA, format `.pem` → **Create key pair**. The file downloads; keep it.

## Exercise 3.2: Launch the Instance (10 min)
**Instances** → **Launch instances**:

| Setting | Value |
|---|---|
| Name | `userN-web-1` |
| AMI | **Amazon Linux 2023** (Quick Start) |
| Instance type | `t3.micro` |
| Key pair | `userN-key` |
| Network settings → **Edit** → VPC | `userN-vpc` |
| Subnet | `userN-subnet-public1-…` (subnet 1) |
| Auto-assign public IP | **Enable** |
| Firewall | **Select existing security group** → `userN-web-sg` |
| Advanced details → IAM instance profile | `userN-ec2-role` |

**Launch instance** → **View all instances**. Wait for **Running** and **2/2 checks passed** (1–2 min).

## Exercise 3.3: Look Around (4 min)
Select `userN-web-1` and check the tabs at the bottom:
- **Details:** Public IPv4 address, Private IPv4 address, Availability Zone, IAM Role
- **Security:** the rules from `userN-web-sg`
- **Storage:** the 8 GiB EBS root volume

## Exercise 3.4: Connect (9 min)
1. **Connect** → **EC2 Instance Connect** tab → **Connect**. A terminal opens in the browser.
2. Run:
```bash
cat /etc/os-release | head -2      # which OS
ec2-metadata -i -z                  # instance ID and AZ
aws sts get-caller-identity         # who am I? → the userN-ec2-role
aws s3 ls                           # allowed by the role, no access keys anywhere
```

> If Connect fails: check the instance is Running, has a public IP, and `userN-web-sg` allows SSH. If `aws s3 ls` fails, the IAM role was not attached.

Leave the terminal open — Lab 4 continues here.

---

## ✅ Keep running
`userN-web-1` — used in Labs 4, 5 and 7.

## 🧠 Knowledge Check
1. Where did the credentials for `aws s3 ls` come from?
2. What did the AMI decide, and what did the instance type decide?
