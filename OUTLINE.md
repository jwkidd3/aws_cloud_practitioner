# AWS Cloud Practitioner

- **Length:** 1 day (9:00 AM – 4:00 PM)
- **Level:** Introductory — no prior AWS experience assumed
- **Format:** ~70% hands-on labs / ~30% theory (225 minutes of labs, 105 minutes of lecture, plus breaks and lunch)
- **Environment:** AWS Management Console in a shared AWS account; each student works in an assigned Region. No IDE or local tooling required.

This course provides a comprehensive introduction to Amazon Web Services (AWS). It covers the fundamental concepts of cloud computing, core AWS services, security best practices, and cost optimization strategies. By the end of this course, learners will have a solid understanding of AWS and be able to design, deploy, and manage cloud-based applications on the AWS platform.

---

## Course Objectives

Upon completion of this course, learners will be able to:

- Explain the core concepts of cloud computing and the benefits of using AWS
- Identify and describe key AWS services, including EC2, S3, VPC, IAM, and more
- Understand the AWS global infrastructure and regions
- Create and manage AWS resources using the AWS Management Console and CLI
- Implement basic security best practices on AWS
- Optimize AWS costs using various strategies
- Prepare for the AWS Certified Cloud Practitioner exam

---

## Module 1: Introduction to Cloud Computing

- What is cloud computing?
- Benefits of cloud computing
- Types of cloud computing (public, private, hybrid, multi-cloud)
- Key cloud computing concepts (IaaS, PaaS, SaaS)

## Module 2: Core AWS Services

- **Security, Identity, and Compliance:** IAM (Identity and Access Management) · Security Groups and Network ACLs · Key Management Service (KMS)
- **Networking and Content Delivery:** VPC (Virtual Private Cloud) · Route 53 · CloudFront
- **Compute Services:** EC2 (Elastic Compute Cloud) — instance types, AMIs, key pairs, security groups · Lambda
- **Storage Services:** S3 (Simple Storage Service) · EBS (Elastic Block Store)
- **Database Services:** RDS (Relational Database Service) · DynamoDB

## Module 3: AWS Global Infrastructure

- Regions and Availability Zones
- Edge Locations
- Global Accelerator

## Module 4: Billing and Cost Optimization

- Understanding AWS Pricing Models
- Cost Explorer
- Reserved Instances and Savings Plans
- Rightsizing Instances
- Auto-Scaling

## Module 5: Best Practices and Troubleshooting

- Best practices for building secure and reliable applications on AWS
- Common troubleshooting techniques
- AWS Well-Architected Framework
- Exam preparation

---

## Hands-on Labs

Module 2 is taught in five short blocks, each followed immediately by its lab, so teaching content always precedes hands-on work. Each lab builds on the previous one: the VPC from Lab 2 hosts the servers from Labs 3–4 and the database from Lab 7, and the IAM role from Lab 1 is used from EC2 in Labs 3 and 5. The final lab ends with a complete cleanup checklist.

| Lab | Title | Duration |
|---|---|---|
| 1 | Configuring IAM Roles and Policies | 30 min |
| 2 | Configuring Security Groups and Network ACLs | 30 min |
| 3 | Creating EC2 Instances | 25 min |
| 4 | Deploying a Web Application on EC2 | 30 min |
| 5 | Using S3 for Object Storage | 25 min |
| 6 | Implementing Serverless Functions with Lambda | 25 min |
| 7 | Setting Up a Relational Database with RDS | 30 min |
| 8 | Implementing Cost Optimization Strategies | 30 min |

---

## Certification Alignment

The course maps to the four domains of the **AWS Certified Cloud Practitioner (CLF-C02)** exam — 65 questions in 90 minutes, passing score 700/1000.

| Exam domain | Weight | Covered in |
|---|---|---|
| 1. Cloud Concepts | 24% | Modules 1, 3 and 5 |
| 2. Security and Compliance | 30% | Module 2 (Security), Labs 1–2, Module 5 |
| 3. Cloud Technology and Services | 34% | Module 2, Module 3, Labs 2–7 |
| 4. Billing, Pricing and Support | 12% | Module 4, Lab 8, Module 5 |
