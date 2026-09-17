# Lab 1: Configuring IAM Roles and Policies
**Duration:** 30 minutes · **Region:** your assigned Region · **Prefix everything with your username:** `userN-`

## 🎯 Objectives
- Create an IAM group and user with a managed policy
- See least privilege in action by signing in as that user
- Create an IAM role for EC2 (used in Labs 3 and 5)

---

## Exercise 1.1: Sign In (3 min)
1. Open the sign-in URL from your instructor and sign in with your IAM user name and password.
2. Top-right **Region selector** → choose **your assigned Region**. Every lab today runs there; check it whenever a console page looks empty.
3. Search for **IAM** and open it. Note the Region now shows **Global** — IAM is not Regional.

## Exercise 1.2: Create a Group (4 min)
1. **User groups** → **Create group**.
2. Name: `userN-developers`.
3. Under permissions policies, check **`AmazonS3ReadOnlyAccess`**.
4. **Create user group**.

## Exercise 1.3: Create a User (5 min)
1. **Users** → **Create user**. Name: `userN-dev`.
2. Check **Provide user access to the AWS Management Console** → *I want to create an IAM user*.
3. **Custom password**: pick one you'll remember. **Uncheck** *must create a new password at next sign-in*. **Next**.
4. **Add user to group** → check `userN-developers` → **Next** → **Create user**.
5. Copy the **Console sign-in URL** shown on the confirmation page.

## Exercise 1.4: Test Least Privilege (13 min)
1. Open a **private/incognito window** and go to the sign-in URL. Sign in as `userN-dev`. Set the Region to your assigned Region.
2. Open **S3**. You can see the bucket list — the policy allows listing.
3. Choose **Create bucket**, type any name, and click **Create bucket** at the bottom. Read the error: `s3:CreateBucket` is not allowed.
4. Open **EC2** → **Instances**. You are denied — the policy says nothing about EC2, so it is implicitly denied.
5. Sign out and close the private window.

> IAM starts from "deny everything." `userN-dev` can do exactly what `AmazonS3ReadOnlyAccess` allows and nothing else.

## Exercise 1.5: Create a Role for EC2 (5 min)
1. Back in your main window: **IAM** → **Roles** → **Create role**.
2. **Trusted entity:** AWS service. **Use case:** EC2. **Next**.
3. Check **`AmazonS3ReadOnlyAccess`**. **Next**.
4. **Role name:** `userN-ec2-role` → **Create role**.

In Lab 3 you attach this role to a server; in Lab 5 the server reads S3 with it — no access keys needed.

---

## ✅ Keep for later labs
`userN-developers`, `userN-dev`, `userN-ec2-role` — all deleted in Lab 8.

## 🧠 Knowledge Check
1. Why could `userN-dev` list buckets but not create one?
2. What is the difference between a user and a role?
