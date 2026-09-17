# Lab 7: Setting Up a Relational Database with RDS
**Duration:** Part A 5 min (before the break) + Part B 25 min · **Region:** your assigned Region

## 🎯 Objectives
- Launch a managed MySQL database inside your VPC
- Connect to it from your EC2 instance and create a table
- Find where backups and Multi-AZ live

> RDS takes 5–10 minutes to create. Do Part A now, take your break, come back to Part B.

---

# Part A — Launch (5 min)

## Exercise 7.1: DB Subnet Group (2 min)
1. Search **RDS** → **Subnet groups** → **Create DB subnet group**.
2. Name `userN-db-subnets`, description `lab`, VPC `userN-vpc`.
3. Availability Zones: select the **two AZs your subnets are in**. Subnets: select **both** of your subnets. **Create**.

## Exercise 7.2: Create the Database (3 min)
**Databases** → **Create database** → **Standard create**. Everything not listed stays default:

| Setting | Value |
|---|---|
| Engine | **MySQL** |
| Template | **Free tier** (or Dev/Test if not shown) |
| DB instance identifier | `userN-db` |
| Master username / password | `admin` / a password you write down |
| DB instance class | `db.t3.micro` (or db.t4g.micro) |
| Storage autoscaling | uncheck |
| Compute resource | Don't connect to an EC2 compute resource |
| VPC | `userN-vpc` |
| DB subnet group | `userN-db-subnets` |
| Public access | **No** |
| VPC security group | Choose existing → remove `default`, select **`userN-db-sg`** |
| Additional configuration → Initial database name | `labdb` |
| Deletion protection | uncheck |

**Create database**. ☕ Take your break.

---

# Part B — Use It (25 min)

## Exercise 7.3: Endpoint (2 min)
**Databases** → `userN-db` (status **Available**) → **Connectivity & security** → copy the **Endpoint**.

## Exercise 7.4: Connect from EC2 (13 min)
In the Instance Connect terminal for `userN-web-1`:
```bash
sudo dnf install -y mariadb105
mysql -h <your-endpoint> -u admin -p
```
Enter your password, then:
```sql
USE labdb;
CREATE TABLE visitors (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50));
INSERT INTO visitors (name) VALUES ('userN'), ('Cloud Practitioner');
SELECT * FROM visitors;
EXIT;
```

> This worked only because `userN-web-1` carries `userN-web-sg`, which `userN-db-sg` trusts. Your laptop could not connect.

## Exercise 7.5: Backups and High Availability (10 min)
On `userN-db` in the RDS console:
1. **Maintenance & backups** tab: automated backups with a retention period and a backup window — AWS runs these for you.
2. **Modify** (top right) → scroll to **Availability & durability**: *Multi-AZ* is a single option that adds a standby in another AZ with automatic failover. Scroll to **DB instance class**: this is how you scale. **Cancel** — do not apply.
3. **Monitoring** tab: CPU, connections and storage graphs from CloudWatch.

---

## ✅ Keep
`userN-db`, `userN-db-subnets` — deleted in Lab 8.

## 🧠 Knowledge Check
1. Who patches MySQL on `userN-db`? Who creates the tables?
2. Multi-AZ or read replica: which improves availability?
