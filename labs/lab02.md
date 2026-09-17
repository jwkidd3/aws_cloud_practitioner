# Lab 2: Configuring Security Groups and Network ACLs
**Duration:** 30 minutes · **Region:** your assigned Region

## 🎯 Objectives
- Build a VPC with two public subnets, an Internet Gateway and a route table
- Create a web security group and a database security group
- Add a rule to a network ACL and compare it with a security group

**What you build (used by Labs 3–7):**
```
VPC userN-vpc 10.0.0.0/16
 ├─ Public subnet 1 (AZ a) ── web server (Lab 3)                security group: userN-web-sg  (80, 22 from anywhere)
 ├─ Public subnet 2 (AZ b) ── web server 2 (Lab 4), RDS (Lab 7)   userN-db-sg (3306 from userN-web-sg)
 └─ Route table: 0.0.0.0/0 → Internet Gateway
```

---

## Exercise 2.1: Create the VPC (8 min)
1. Search **VPC** (confirm your assigned Region is selected) → **Create VPC** → choose **VPC and more**.
2. Settings:

| Setting | Value |
|---|---|
| Name tag auto-generation | `userN` |
| IPv4 CIDR block | `10.0.0.0/16` |
| Number of Availability Zones | **2** |
| Number of public subnets | **2** |
| Number of private subnets | **0** |
| NAT gateways | **None** |
| VPC endpoints | None |

3. **Create VPC**. Wait for the green checks, then **View VPC**.

## Exercise 2.2: Enable Public IPs and Check the Route (5 min)
1. **Subnets** → for **each** of your two `userN-subnet-public…` subnets (the wizard named them after the two AZs it picked in your Region — call them **subnet 1** and **subnet 2** from here on): select it → **Actions** → **Edit subnet settings** → check **Enable auto-assign public IPv4 address** → **Save**. (The wizard does not do this for you.)
2. **Route tables** → open `userN-rtb-public` → **Routes** tab. You will see `10.0.0.0/16 → local` and `0.0.0.0/0 → igw-…`. That second route is what makes the subnets public.

## Exercise 2.3: Web Security Group (5 min)
1. **Security groups** → **Create security group**.
2. Name `userN-web-sg`, description `web server`, **VPC: `userN-vpc`** (not the default).
3. **Inbound rules** → add two:

| Type | Source |
|---|---|
| HTTP | Anywhere-IPv4 |
| SSH | Anywhere-IPv4 |

4. **Create security group**.

## Exercise 2.4: Database Security Group (4 min)
1. **Create security group** again: name `userN-db-sg`, description `database`, VPC `userN-vpc`.
2. **Inbound rules** → add one: Type **MYSQL/Aurora**, Source: start typing `userN-web-sg` and select it.
3. **Create security group**.

> The database trusts *whatever server carries the web security group*, not an IP address. That is the standard AWS pattern.

## Exercise 2.5: Network ACL (8 min)
1. **Network ACLs** → open the one whose VPC is `userN-vpc`. Look at **Inbound rules**: rule 100 allows all traffic; the last `*` rule denies everything else. This is the default NACL — wide open; the security groups do the real filtering.
2. **Edit inbound rules** → **Add new rule**:

| Rule number | Type | Source | Allow/Deny |
|---|---|---|---|
| 50 | SSH (22) | `198.51.100.0/24` | **Deny** |

3. **Save changes**. Rules are evaluated lowest number first, so rule 50 blocks SSH from that range before rule 100 allows everything.

> A security group can only *allow*; a network ACL can also *deny*, and it applies to every instance in the subnet.

---

## ✅ Checkpoint
- `userN-vpc` with 2 subnets, **auto-assign public IP enabled on both**
- `userN-web-sg` (80, 22) and `userN-db-sg` (3306 from web-sg)
- Default NACL has your Deny rule 50

## 🧠 Knowledge Check
1. Which route makes a subnet public?
2. Stateful or stateless: security group? network ACL?
