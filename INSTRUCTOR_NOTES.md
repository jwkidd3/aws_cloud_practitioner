# Instructor Pre-Flight Checklist — AWS Cloud Practitioner (1 Day)

Read this **at least two business days before class**. The course assumes one shared AWS account with N students (typically 8–25), all working in **us-east-2 (Ohio)** through the AWS Management Console. There is no Cloud9 and no local tooling: students need only a modern browser (plus a second browser profile or private window for Lab 1).

---

## 1. Account and Student Identities

- **One IAM user per student**, named after the assigned username (`user1` … `userN`), console access with a password, **no access keys**.
- Attach **`AdministratorAccess`** (students create IAM users, roles, VPCs, RDS instances, budgets). If your organization forbids that, the minimum is: `IAMFullAccess`, `AmazonEC2FullAccess`, `AmazonVPCFullAccess`, `AmazonS3FullAccess`, `AWSLambda_FullAccess`, `AmazonRDSFullAccess`, `CloudWatchFullAccess`, `AWSBudgetsActionsWithAWSResourceControlAccess`, plus `ce:*` for Cost Explorer.
- Set an **account alias** so the sign-in URL is memorable, and put the URL, username and initial password on a printed card per seat.
- Enable **MFA on the root user**; do not share root.
- Turn **on** the IAM account password policy you want students to see (they only read it).

### Student assignment card

| Student | Username | Sign-in URL |
|---|---|---|
| Alice | user1 | https://<alias>.signin.aws.amazon.com/console |
| Bob | user2 | … |

Username rules: lowercase letters and digits only. Every lab resource is prefixed `userN-`; S3 bucket names add four random digits for global uniqueness.

---

## 2. Service Quotas (request increases 24–48 h ahead)

Check **Service Quotas → us-east-2** for each item. Numbers assume N students plus a margin of 2.

| Quota | Service | Default | Needed | Why |
|---|---|---|---|---|
| VPCs per Region | VPC | 5 | **N + 2** | Lab 2: one VPC per student |
| Internet gateways per Region | VPC | 5 | **N + 2** | Created with each VPC |
| Security groups per Region | VPC | 2,500 | fine | — |
| Network ACLs per VPC | VPC | 200 | fine | — |
| **Running On-Demand Standard (A, C, D, H, I, M, R, T, Z) instances (vCPUs)** | EC2 | often **5** on newer accounts | **4 × N** | Labs 3–4: 2 × t3.micro (2 vCPU each) per student |
| AMIs per Region | EC2 | 50,000 | fine | — |
| Key pairs | EC2 | 5,000 | fine | — |
| DB instances | RDS | 40 | **N + 2** | Lab 7 |
| DB subnet groups | RDS | 50 | N + 2 | Lab 7 |
| Buckets per account | S3 | 10,000 (general purpose) | fine | 1 per student |
| Concurrent executions | Lambda | 1,000 | fine | — |
| Budgets per account | Budgets | 20,000 | fine | — |

Verify the two that bite:

```bash
aws service-quotas get-service-quota --service-code vpc --quota-code L-F678F1CE --region us-east-2 \
  --query 'Quota.{Name:QuotaName,Value:Value}'                       # VPCs per Region
aws service-quotas get-service-quota --service-code ec2 --quota-code L-1216C47A --region us-east-2 \
  --query 'Quota.{Name:QuotaName,Value:Value}'                       # On-Demand Standard vCPUs
```

---

## 3. Account-Level Settings That Must Be Right

| Setting | Required state | Lab |
|---|---|---|
| **S3 Block Public Access (account level)** | **OFF** — otherwise students cannot uncheck it at the bucket level and the static website in Lab 5.4 stays 403. Re-enable after class. | 5 |
| **Cost Explorer** | Enabled (Billing → Cost Explorer → *Launch*). Takes up to 24 h to populate. | 8 |
| **Cost allocation tag `Owner`** | Activated (Billing → Cost allocation tags). Takes up to 24 h to appear in Cost Explorer. | 8 |
| **Free Tier / credits** | Note whether the account is on the legacy 12-month free tier or the post-July-2025 credit-based plan; adjust the Module 4 pricing slide talk track accordingly. | — |
| **Support plan** | Basic is fine. Mention that full Trusted Advisor checks need Business+. | 8 |
| **Default VPC in us-east-2** | Must exist (students never use it, but Lab 3's "VPC" dropdown shows it and the wizard expects it). Do not let anyone delete it. | 2–3 |
| **EC2 Instance Connect** | Works out of the box for Amazon Linux 2023 with port 22 open from `0.0.0.0/0` (set in Lab 2). Test it before class; if your organization blocks it, add `AmazonSSMManagedInstanceCore` to the role instructions in Lab 1 and use Session Manager. | 3–7 |
| **Lambda Function URLs with auth NONE** | Allowed by default; some SCPs block them — test one before class. | 6 |
| **RDS "Free tier" template** | Only appears on free-tier-eligible accounts. Otherwise Lab 7 says *Dev/Test*; either way the class uses `db.t3.micro` / `db.t4g.micro`. | 7 |

---

## 4. Cost Estimate

Per student for the day (us-east-2, cleaned up by 4 PM): 2 × t3.micro for ~5 h, 1 × db.t3.micro for ~2 h, EBS volumes and one AMI snapshot, negligible S3/Lambda — **under $1 per student**. A forgotten RDS instance costs ~$0.50/day, so **sweep the account after class** (Section 8).

---

## 5. Timing Guidance and Where to Cut

The day is scheduled at 225 min labs / 105 min theory. Every theory block is 5–12 minutes; **do not let Module 2 sprawl** — the deck is built so each 2A–2E block is 3–5 content slides.

| If you are running late by… | Cut this |
|---|---|
| 10 min | Lab 3 Exercise 3.3 (look around) and Lab 7 Exercise 7.5 (backups tour) — narrate from your screen |
| 20 min | Lab 6 Exercise 6.4 (Function URL) and Lab 8 Exercise 8.3 (rightsize) become instructor demos |
| 30 min | Lab 4 Exercise 4.3 (second server from AMI) becomes a demo |

**Never cut Lab 8 cleanup.** If time is truly gone, tell students to stop and run the sweep yourself (Section 8).

**Lab 7 is deliberately split** around the afternoon break: students kick off RDS creation (5 min), break for 15, and return to an *Available* database. Do not move the break.

**AMI creation (Lab 4.2)** takes 2–4 minutes; have students read ahead to 4.3 rather than stare at the console.

**Labs are intentionally minimal** — core task only, no stretch goals. Resist adding "one more thing" on the day; the 70/30 split only holds if every lab finishes inside its slot.

---

## 6. Known Failure Points and Fixes

| Symptom | Cause | Fix |
|---|---|---|
| Lab 3: instance has no public IP / unreachable | "VPC and more" wizard does not enable auto-assign public IPv4 | Lab 2.2 step 1 — verify both subnets |
| Lab 3: Instance Connect "Failed to connect" | No SSH rule on the SG, no public IP, or wrong subnet | Check Security and Networking tabs |
| Lab 3: `aws s3 ls` fails on the instance | IAM instance profile not selected at launch | Actions → Security → Modify IAM role |
| Lab 4: page will not load | Using `https://`, or stale public IP after a stop/start | Use `http://` and the current IP |
| Lab 4: web-2 shows web-1's instance ID | User data not pasted or typo | Re-launch with the user data |
| Lab 5.3: website still 403 | Account-level Block Public Access is ON | Section 3 — must be off before class |
| Lab 5.1: "bucket name already exists" | Global namespace collision | Different digits |
| Lab 6.4: Function URL returns 403 | Auth type left at AWS_IAM | Recreate with NONE |
| Lab 7.2: cannot create database | Subnet group does not span 2 AZs | Both subnets in 7.1 |
| Lab 7.4: `mysql` times out | DB security group is `default` instead of `userN-db-sg` | Modify → Connectivity → fix the SG |
| Lab 8: "Delete VPC" refuses | RDS still deleting (its network interfaces linger a few minutes) | Wait, retry |
| Anything: "not authorized" | Signed in as `userN-dev` (Lab 1 private window) | Check identity top-right |

---

## 7. Room Setup on the Day

- Deck: open `presentations/aws_cloud_practitioner.html` in Chrome or Edge, press `F`. It needs internet access for the Reveal.js CDN. Slides auto-fit; if a projector is unusually narrow, the fit routine re-runs on resize.
- Have your own `user0` identity so you can demo every lab live on the projector.
- Pre-create nothing for students — the point is that they build it.
- Keep the [Lab 8 cleanup table](lab-exercises/lab08/README.md) on screen for the last 12 minutes.

---

## 8. Post-Class Sweep

Run from CloudShell (admin) after students leave. It lists what is left; delete anything still carrying a `userN` name.

```bash
R=us-east-2
echo "== EC2 instances (non-terminated) =="; aws ec2 describe-instances --region $R \
  --filters Name=instance-state-name,Values=pending,running,stopping,stopped \
  --query 'Reservations[].Instances[].{Id:InstanceId,Name:Tags[?Key==`Name`]|[0].Value,State:State.Name}' --output table
echo "== Auto Scaling groups =="; aws autoscaling describe-auto-scaling-groups --region $R --query 'AutoScalingGroups[].AutoScalingGroupName'
echo "== Load balancers =="; aws elbv2 describe-load-balancers --region $R --query 'LoadBalancers[].LoadBalancerName'
echo "== AMIs =="; aws ec2 describe-images --owners self --region $R --query 'Images[].{Id:ImageId,Name:Name}' --output table
echo "== Snapshots =="; aws ec2 describe-snapshots --owner-ids self --region $R --query 'Snapshots[].{Id:SnapshotId,Desc:Description}' --output table
echo "== Volumes (available = unattached) =="; aws ec2 describe-volumes --region $R --filters Name=status,Values=available --query 'Volumes[].VolumeId'
echo "== Elastic IPs =="; aws ec2 describe-addresses --region $R --query 'Addresses[].PublicIp'
echo "== RDS =="; aws rds describe-db-instances --region $R --query 'DBInstances[].DBInstanceIdentifier'
echo "== RDS snapshots =="; aws rds describe-db-snapshots --region $R --snapshot-type manual --query 'DBSnapshots[].DBSnapshotIdentifier'
echo "== VPCs =="; aws ec2 describe-vpcs --region $R --query 'Vpcs[?IsDefault==`false`].{Id:VpcId,Name:Tags[?Key==`Name`]|[0].Value}' --output table
echo "== Lambda =="; aws lambda list-functions --region $R --query 'Functions[].FunctionName'
echo "== DynamoDB =="; aws dynamodb list-tables --region $R --query 'TableNames'
echo "== S3 buckets =="; aws s3 ls | grep -E ' user[0-9]+-'
echo "== Budgets =="; aws budgets describe-budgets --account-id $(aws sts get-caller-identity --query Account --output text) --query 'Budgets[].BudgetName'
echo "== IAM leftovers =="; aws iam list-users --query 'Users[?starts_with(UserName,`user`) && contains(UserName,`-dev`)].UserName'; \
  aws iam list-groups --query 'Groups[?contains(GroupName,`-developers`)].GroupName'; \
  aws iam list-roles --query 'Roles[?starts_with(RoleName,`user`)].RoleName'; \
  aws iam list-policies --scope Local --query 'Policies[?starts_with(PolicyName,`user`)].PolicyName'
```

Then: re-enable account-level S3 Block Public Access, and disable or delete the student IAM users until the next run.

---

## 9. Content Notes

- The deck and labs target **CLF-C02** (65 questions, 90 min, 700/1000; domains 24/30/34/12). The legacy `Slides.pdf` is CLF-C01 material (60 questions, 28/24/36/12, Classic Load Balancer, OpsWorks, per-hour billing, eventual S3 consistency, five pillars) — use it only as background reading; do not present from it.
- Current facts baked into the deck: six Well-Architected pillars; S3 strong consistency; per-second EC2 billing; ALB/NLB/GWLB; Savings Plans; IAM Identity Center; Sustainability pillar; Snowmobile retired.
- Language: describe the course level as "introductory" in all materials and when speaking to the class.
