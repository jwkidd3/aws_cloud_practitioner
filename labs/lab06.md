# Lab 6: Implementing Serverless Functions with Lambda
**Duration:** 25 minutes · **Region:** your assigned Region

## 🎯 Objectives
- Create and test a Python Lambda function
- Read its logs in CloudWatch
- Expose it over HTTPS with a Function URL

---

## Exercise 6.1: Create the Function (4 min)
1. Search **Lambda** → **Create function** → **Author from scratch**.
2. Name `userN-hello`, Runtime **Python 3.13** (or newest). Leave the default new role. **Create function**.

## Exercise 6.2: Code and Test (8 min)
1. In the **Code** tab, replace `lambda_function.py` with:
```python
import json

def lambda_handler(event, context):
    print("Event received:", json.dumps(event))
    params = event.get("queryStringParameters") or {}
    name = params.get("name") or event.get("name", "World")
    return {
        "statusCode": 200,
        "body": f"Hello, {name}! Served by Lambda."
    }
```
2. **Deploy**.
3. **Test** → **Create new test event** → name `test1`, JSON `{ "name": "userN" }` → **Save** → **Test**.
4. Read the result panel: the returned body, **Duration**, **Billed duration** and **Max memory used**. That is what you pay for — and nothing while idle.

## Exercise 6.3: Logs (5 min)
1. **Monitor** tab → graphs of invocations and duration.
2. **View CloudWatch logs** → open the newest log stream. Find your `Event received:` line between `START` and `END`.

## Exercise 6.4: Function URL (8 min)
1. **Configuration** → **Function URL** → **Create function URL** → Auth type **NONE** → acknowledge → **Save**.
2. Copy the URL and open it in a browser. Add `?name=userN` to the end and reload.

> You just published an HTTPS endpoint with no server, no security group, no VPC. Compare with Labs 2–4.

---

## ✅ Keep
`userN-hello` — deleted in Lab 8.

## 🧠 Knowledge Check
1. What two things does Lambda bill for?
2. Give one job Lambda is *not* suited for.
