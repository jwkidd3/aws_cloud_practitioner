# AWS Cloud Practitioner

**A one-day, hands-on introduction to Amazon Web Services aligned to the AWS Certified Cloud Practitioner (CLF-C02) exam**

[![AWS](https://img.shields.io/badge/AWS-Cloud%20Practitioner-FF9900)](https://aws.amazon.com/certification/certified-cloud-practitioner/)
[![Duration](https://img.shields.io/badge/Duration-1%20Day-blue)](#)
[![Format](https://img.shields.io/badge/Format-70%25%20Labs%20%2F%2030%25%20Theory-232F3E)](#)

## Course Overview

This course provides a comprehensive introduction to Amazon Web Services (AWS). It covers the fundamental concepts of cloud computing, core AWS services, security best practices, and cost optimization strategies. By the end of this course, learners will have a solid understanding of AWS and be able to design, deploy, and manage cloud-based applications on the AWS platform.

**Length:** 1 day (9:00 AM – 4:00 PM)
**Format:** ~70% hands-on labs / ~30% theory (225 min labs, 105 min theory, plus breaks and lunch)
**Level:** Introductory — no prior AWS experience assumed
**Environment:** AWS Management Console in a shared AWS account, Region **us-east-2 (Ohio)**. No IDE or local tooling required.

## Course Objectives

Upon completion of this course, learners will be able to:

- Explain the core concepts of cloud computing and the benefits of using AWS
- Identify and describe key AWS services, including EC2, S3, VPC, IAM, and more
- Understand the AWS global infrastructure and regions
- Create and manage AWS resources using the AWS Management Console and CLI
- Implement basic security best practices on AWS
- Optimize AWS costs using various strategies
- Prepare for the AWS Certified Cloud Practitioner exam

## Course Outline

| Module | Topics |
|---|---|
| **1. Introduction to Cloud Computing** | What is cloud computing · benefits · types (public, private, hybrid, multi-cloud) · IaaS / PaaS / SaaS |
| **2. Core AWS Services** | **2A Security, Identity & Compliance:** IAM, security groups & NACLs, KMS · **2B Networking & Content Delivery:** VPC, Route 53, CloudFront · **2C Compute:** EC2 (instance types, AMIs, key pairs, security groups), Lambda · **2D Storage:** S3, EBS · **2E Databases:** RDS, DynamoDB |
| **3. AWS Global Infrastructure** | Regions and Availability Zones · edge locations · Global Accelerator |
| **4. Billing and Cost Optimization** | Pricing models · Cost Explorer · Reserved Instances and Savings Plans · rightsizing · Auto Scaling |
| **5. Best Practices and Troubleshooting** | Building secure and reliable applications · common troubleshooting techniques · Well-Architected Framework · exam preparation |

Module 2 is taught in five short blocks, each immediately followed by its lab, so teaching content always precedes hands-on work.

## Daily Schedule

| Time | Block | Min |
|---|---|---|
| 9:00 – 9:05 | Welcome & environment check | 5 |
| 9:05 – 9:17 | **Module 1:** Introduction to Cloud Computing | 12 |
| 9:17 – 9:27 | **Module 2A:** Security, Identity & Compliance — IAM, KMS | 10 |
| 9:27 – 9:57 | 🔬 **Lab 1:** Configuring IAM Roles and Policies | 30 |
| 9:57 – 10:07 | **Module 2B:** Networking & Content Delivery — VPC, SG/NACL, Route 53, CloudFront | 10 |
| 10:07 – 10:37 | 🔬 **Lab 2:** Configuring Security Groups and Network ACLs | 30 |
| 10:37 – 10:52 | ☕ Break | 15 |
| 10:52 – 11:00 | **Module 2C:** Compute — EC2 | 8 |
| 11:00 – 11:25 | 🔬 **Lab 3:** Creating EC2 Instances | 25 |
| 11:25 – 11:30 | **Module 2C:** Deploying applications on EC2 | 5 |
| 11:30 – 12:00 | 🔬 **Lab 4:** Deploying a Web Application on EC2 | 30 |
| 12:00 – 1:00 | 🍽️ Lunch | 60 |
| 1:00 – 1:08 | **Module 2D:** Storage — S3 & EBS | 8 |
| 1:08 – 1:33 | 🔬 **Lab 5:** Using S3 for Object Storage | 25 |
| 1:33 – 1:40 | **Module 2C:** Serverless — Lambda | 7 |
| 1:40 – 2:05 | 🔬 **Lab 6:** Implementing Serverless Functions with Lambda | 25 |
| 2:05 – 2:13 | **Module 2E:** Databases — RDS & DynamoDB | 8 |
| 2:13 – 2:18 | 🔬 **Lab 7 Part A:** Launch the RDS instance | 5 |
| 2:18 – 2:33 | ☕ Break (RDS provisions meanwhile) | 15 |
| 2:33 – 2:58 | 🔬 **Lab 7 Part B:** Connect to and explore RDS | 25 |
| 2:58 – 3:06 | **Module 3:** AWS Global Infrastructure | 8 |
| 3:06 – 3:18 | **Module 4:** Billing and Cost Optimization | 12 |
| 3:18 – 3:48 | 🔬 **Lab 8:** Implementing Cost Optimization Strategies + cleanup | 30 |
| 3:48 – 4:00 | **Module 5:** Best Practices, Troubleshooting & Exam Preparation | 12 |

**Totals:** labs 225 min · theory 105 min · breaks/lunch 90 min.

## Hands-on Labs

Every lab runs in the console with a per-student `userN-` naming prefix, and each lab builds on the previous one — the VPC from Lab 2 hosts the servers from Labs 3–4 and the database from Lab 7; the IAM role from Lab 1 is proven from EC2 in Labs 3 and 5. Lab 8 ends with an ordered cleanup checklist.

| Lab | Title | Duration | Core task |
|---|---|---|---|
| [1](lab-exercises/lab01/README.md) | Configuring IAM Roles and Policies | 30 min | Group + user with a managed policy; test least privilege; EC2 role |
| [2](lab-exercises/lab02/README.md) | Configuring Security Groups and Network ACLs | 30 min | VPC (2 AZs) via wizard; web and DB security groups; one NACL Deny rule |
| [3](lab-exercises/lab03/README.md) | Creating EC2 Instances | 25 min | Key pair; launch Amazon Linux 2023 with the role; connect via Instance Connect |
| [4](lab-exercises/lab04/README.md) | Deploying a Web Application on EC2 | 30 min | Install Apache + page; create AMI; launch second server with user data |
| [5](lab-exercises/lab05/README.md) | Using S3 for Object Storage | 25 min | Versioned bucket; static website with bucket policy; read from EC2 via role |
| [6](lab-exercises/lab06/README.md) | Implementing Serverless Functions with Lambda | 25 min | Python function; test + logs; Function URL |
| [7](lab-exercises/lab07/README.md) | Setting Up a Relational Database with RDS | 5 + 25 min | MySQL in the VPC behind the DB security group; connect from EC2; find backups/Multi-AZ |
| [8](lab-exercises/lab08/README.md) | Implementing Cost Optimization Strategies | 30 min | Pricing Calculator comparison; Budget; rightsize an instance; cleanup |

## Course Materials

```
aws_cloud_pract/
├── README.md                                # This file — overview and schedule
├── build-pdfs.sh                            # Regenerates everything under pdf/ from the sources (~1 min)
├── tools/print.mjs                          # Chrome DevTools PDF printer used by build-pdfs.sh
├── presentations/
│   └── aws_cloud_practitioner.html          # Reveal.js deck for the whole day (single file, 58 slides)
├── pdf/                                     # PDF copies of every deliverable (rebuild with ./build-pdfs.sh)
│   ├── aws_cloud_practitioner_slides.pdf    # Deck, one page per slide
│   ├── aws_cloud_practitioner_lab_manual.pdf# All 8 labs in one student handout
│   └── README.pdf
└── lab-exercises/
    ├── lab01/README.md                      # IAM roles and policies
    ├── lab02/README.md                      # Security groups and network ACLs (VPC build)
    ├── lab03/README.md                      # Creating EC2 instances
    ├── lab04/README.md                      # Deploying a web application on EC2
    ├── lab05/README.md                      # S3 object storage
    ├── lab06/README.md                      # Lambda serverless functions
    ├── lab07/README.md                      # RDS relational database
    └── lab08/README.md                      # Cost optimization + cleanup
```

Every deliverable exists in its source format (HTML / Markdown) and as a PDF. After editing any source, run (needs Google Chrome, Node 22+, pandoc and poppler):

```bash
./build-pdfs.sh
```

## Getting Started

### For Students
1. Get your username (`userN`), sign-in URL and password from the instructor.
2. Begin with [Lab 1 — Configuring IAM Roles and Policies](lab-exercises/lab01/README.md) when the instructor reaches the first lab callout.
3. Complete Labs 1–8 in order; each lab lists what to keep for later labs and what to clean up.

## Exam Alignment (CLF-C02)

| Exam domain | Weight | Where it is covered |
|---|---|---|
| 1. Cloud Concepts | 24% | Module 1, Module 3, Module 5 (Well-Architected) |
| 2. Security and Compliance | 30% | Module 2A, Lab 1, Lab 2, Module 5 |
| 3. Cloud Technology and Services | 34% | Modules 2B–2E, Module 3, Labs 2–7 |
| 4. Billing, Pricing and Support | 12% | Module 4, Lab 8, Module 5 (support plans) |

The exam is 65 questions in 90 minutes, passing score 700/1000. Module 5 closes with eight practice questions and a study plan.
