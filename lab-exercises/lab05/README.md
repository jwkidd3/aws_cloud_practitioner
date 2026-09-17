# Lab 5: Using S3 for Object Storage
**Duration:** 25 minutes · **Region:** us-east-2 (Ohio)

## 🎯 Objectives
- Create a bucket, upload an object, and recover an old version
- Host a static website from S3
- Read the bucket from EC2 using the IAM role

**Before you start:** save this as `index.html` on your computer:
```html
<h1>Served from Amazon S3 — version 1</h1>
```

---

## Exercise 5.1: Create a Bucket (4 min)
1. Search **S3** → **Create bucket**.
2. Region **us-east-2**. Name `userN-bucket-XXXX` (XXXX = any four digits; names are globally unique).
3. **Bucket Versioning: Enable**. Leave everything else default. **Create bucket**.

## Exercise 5.2: Upload and Version (6 min)
1. Open the bucket → **Upload** → **Add files** → `index.html` → **Upload** → **Close**.
2. Click `index.html` → **Open**. *Access Denied* — objects are private by default.
3. Edit the file on your computer to say **version 2** and upload it again.
4. In the Objects list, toggle **Show versions**. Two versions exist; the older one is still there and can be downloaded. That is how versioning protects against overwrites and deletes.

## Exercise 5.3: Static Website (10 min)
1. **Properties** tab → **Static website hosting** → **Edit** → **Enable**. Index document `index.html` → **Save**. Note the **website endpoint** URL.
2. **Permissions** tab → **Block public access** → **Edit** → uncheck **Block all public access** → **Save** → confirm.
3. **Bucket policy** → **Edit** → paste (replace the bucket name) → **Save**:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::userN-bucket-XXXX/*"
  }]
}
```
4. Open the website endpoint in a new tab. Your page appears — no web server involved.

> Two locks had to open: Block Public Access and a bucket policy. That is deliberate — public buckets are the classic S3 mistake.

## Exercise 5.4: Read from EC2 (5 min)
In the Instance Connect terminal for `userN-web-1` (reconnect if needed):
```bash
aws s3 ls s3://userN-bucket-XXXX/
aws s3 cp s3://userN-bucket-XXXX/index.html /tmp/ && cat /tmp/index.html
echo test > /tmp/t.txt && aws s3 cp /tmp/t.txt s3://userN-bucket-XXXX/
```
The last command fails: the role is **read-only**. Least privilege.

---

## ✅ Keep
`userN-bucket-XXXX` — deleted in Lab 8.

## 🧠 Knowledge Check
1. Why did the website return 403 before Exercise 5.3 step 3?
2. Which S3 feature let you get version 1 back?
