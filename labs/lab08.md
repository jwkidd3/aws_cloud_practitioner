# Lab 8: Implementing Cost Optimization Strategies
**Duration:** 30 minutes · **Region:** your assigned Region

## 🎯 Objectives
- Compare On-Demand and Savings Plan pricing for your web server
- Create a budget alert
- Rightsize an instance
- Clean up everything so nothing is billed overnight

---

## Exercise 8.1: Price It (6 min)
1. Open https://calculator.aws → **Create estimate** → **Add service** → **Amazon EC2** → **Configure**.
2. Region: **your assigned Region**, Linux, instance **t3.micro**, quantity **2**, utilization 100%.
3. **Payment option: On-Demand** → note the monthly cost.
4. Change to **Compute Savings Plans, 1 year, No upfront** → note the new monthly cost.

> Same servers, ~30% cheaper for a one-year commitment. Commit for the steady baseline; stay On-Demand for spikes and experiments.

## Exercise 8.2: Budget (6 min)
1. Search **Billing** → **Budgets** → **Create budget** → **Customize (advanced)** → **Cost budget** → **Next**.
2. Name `userN-budget`, Monthly, Fixed, amount **10** USD → **Next**.
3. **Add alert threshold**: 80%, **Actual**, your email → **Next** → **Next** → **Create budget**.

## Exercise 8.3: Rightsize (6 min)
`userN-web-2` is oversized for a page that serves one line of HTML.
1. **EC2** → **Instances** → select `userN-web-2` → **Instance state** → **Stop instance**. Wait for *Stopped*.
2. **Actions** → **Instance settings** → **Change instance type** → **t3.nano** → **Apply**.
3. **Instance state** → **Start instance**. Browse to its (new) public IP — same page, half the price.

## Exercise 8.4: Clean Up (12 min)
Work top to bottom.

| ☐ | Resource | Where | How |
|---|---|---|---|
| ☐ | `userN-web-1`, `userN-web-2` | EC2 → Instances | Instance state → **Terminate** |
| ☐ | `userN-web-ami` | EC2 → AMIs | Actions → **Deregister AMI** → check *Delete associated snapshots* |
| ☐ | `userN-key` | EC2 → Key Pairs | Delete |
| ☐ | `userN-db` | RDS → Databases | Actions → **Delete** → uncheck *final snapshot* and *retain backups* → type `delete me` |
| ☐ | `userN-db-subnets` | RDS → Subnet groups | Delete (after the database is gone) |
| ☐ | `userN-hello` | Lambda | Actions → Delete |
| ☐ | `userN-bucket-XXXX` | S3 | **Empty** first, then **Delete** |
| ☐ | `userN-vpc` | VPC → Your VPCs | Actions → **Delete VPC** (removes its subnets, IGW, `userN-web-sg` and `userN-db-sg`). If refused, the RDS instance is still deleting — wait and retry. |
| ☐ | `userN-budget` | Billing → Budgets | Delete |
| ☐ | `userN-dev`, `userN-developers`, `userN-ec2-role` | IAM | Delete each |

**Final check:** EC2 Instances shows only *terminated* rows with your name; RDS and S3 show nothing of yours.

---

## 🧠 Knowledge Check
1. Which option would you pick for a server that runs 24×7 for three years? For a two-hour experiment?
2. What would still cost money if you had *stopped* the instances instead of terminating them?
