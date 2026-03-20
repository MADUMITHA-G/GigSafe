#  GigSafe: Income Protection for Food Delivery Partners
An AI-powered parametric insurance infrastructure that protects gig workers from income loss due to real-world disruptions.

##  📌problem statement
India’s food delivery partners on platforms like Swiggy and Zomato form the backbone of the on-demand economy. However, their income is highly vulnerable to external disruptions such as extreme weather (heavy rain, flooding), local restrictions, platform outages, and sudden drops in order demand.

Since delivery partners earn on a per-order basis, even short-term disruptions can significantly reduce their working hours, leading to 20–30% loss in income.

Unlike traditional employees, they lack:

- stable or fixed wages    
- paid leave or downtime compensation
- access to fast and reliable income protection

As a result, whenever disruptions occur, delivery partners are forced to bear the full financial impact, with no safety net to protect their daily earnings.


## 🔍 Real-World Scenario

Ravi, a delivery partner in Chennai, typically earns ₹900 per day by completing 20–25 orders.

On a heavy rainfall day:

* order demand drops significantly
* flooded roads reduce mobility
* he completes only 5–6 orders

His income drops to ₹250–₹300 for the day.

Despite being available and willing to work, Ravi loses over *60% of his income* due to external disruption — with no compensation.

## 💡Solution Overview

GigSafe is an *embedded parametric income protection platform* designed for gig workers.

It automatically compensates workers for income loss caused by disruptions using:

* real-time disruption detection
* platform activity signals
* automated parametric triggers

### Key Characteristics

* No manual claims
* Automatic payout within 24 hours
* Weekly micro-premium model
* AI-powered fraud detection
* Zone-based disruption detection

## ⚙️ System Workflow (Simplified)

1. Worker onboarded → insurance automatically activated
2. Weekly premium deducted from earnings
3. System continuously monitors disruptions
4. Dual-trigger verification is performed
5. Worker eligibility is validated
6. Fraud detection checks are executed
7. Tiered payout is calculated
8. Parametric claim is triggered
9. Payout processed within 24 hours

## 🎯 Target Users

### 👤 Persona 1: Delivery Worker

* Works 8–10 hours/day
* Earns ₹800–₹1200/day
* Income depends on completed deliveries
* Highly vulnerable to weather and disruptions

### 🏢 Persona 2: Delivery Platform

* Needs consistent workforce availability
* Faces service degradation during disruptions
* Wants to improve worker retention and reliability

## 🔑 Core Innovation: Dual-Trigger Parametric Model

Traditional parametric insurance uses a *single trigger*, leading to inaccurate payouts.

GigSafe introduces a *dual-trigger system*:

### Trigger 1 — External Event

* rainfall / flooding
* curfew / restriction
* platform outage

### Trigger 2 — Economic Impact

* delivery activity drop
* worker activity drop
* demand reduction

✅ Payout is triggered *only when both conditions are satisfied*, ensuring accuracy and reducing false claims.

---

## 💰 Weekly Premium Model

Premium is calculated dynamically using:

    Premium = Base × Zone Risk × Seasonal Factor

Example:

* Base premium = ₹25
* Zone multiplier = 1.2
* Seasonal factor = 1.1

Final premium = ₹33/week

### Why this works:

* adapts to changing risk conditions
* maintains sustainable insurance economics
* ensures affordability for workers

---

## 💸 Payout Model (Economically Sustainable)

To ensure sustainability, GigSafe uses a *tiered payout model* based on disruption duration:

| Duration  | Compensation        |
| --------- | ------------------- |
| 2–4 hours | 25% of daily income |
| 4–8 hours | 50% of daily income |
| 8+ hours  | 70% of daily income |

### Additional Constraints:

* Maximum *3 payouts per month per worker*
* Payout based on *historical average income*

This ensures:

* fair compensation
* controlled risk exposure
* sustainable loss ratio

---

## 🧠 How AI Works in GigSafe

GigSafe uses *lightweight, explainable AI models* to support decision-making.

### 1️⃣ Risk Scoring

* Inputs: historical disruptions, zone data, weather patterns
* Output: zone risk multiplier for pricing

### 2️⃣ Fraud Detection

* Inputs:

  * movement patterns
  * activity history
  * network conditions
* Method: anomaly detection (Isolation Forest–style logic)

### 3️⃣ Cluster Detection

* identifies groups of users with similar suspicious behavior
* detects coordinated fraud attacks

👉 AI supports decisions while core verification remains rule-based and explainable.

---

## 🧾 Eligibility Rules

Workers qualify for payout only if:

* they were *active before disruption*
* they belong to the affected zone
* they have not exceeded payout limits

### Activity Definition:

* completed at least one delivery in last 2 hours
  OR
* accepted a delivery request recently

This prevents *intentional inactivity fraud*.

---

## 📍 Geographic Model

Disruption detection is performed at the *zone level*, not city level.

### Why?

* disruptions vary across city regions
* improves accuracy
* reduces unnecessary payouts
* increases insurer confidence

---

## 🛡️ Adversarial Defense & Anti-Spoofing Strategy

### Core Principle

“No single signal determines payout eligibility”

GigSafe uses *multi-signal verification + temporal consistency*

---

### Multi-Signal Verification

* *Location:* GPS trajectory consistency, teleportation detection
* *Network:* IP–GPS mismatch, network anomalies
* *Activity:* delivery history, session continuity
* *Cross-user:* coordinated behavior detection
* *Environmental:* weather vs activity correlation

---

### Temporal Rule

Workers must be present in a zone for at least:

👉 *30 minutes before disruption*

---

### Fraud Handling

| Risk Level | Action               |
| ---------- | -------------------- |
| Low        | Instant payout       |
| Medium     | Delayed verification |
| High       | Manual review        |

---

### Outcome

* prevents GPS spoofing
* detects coordinated fraud
* increases attacker cost
* ensures fairness

---

## 🏗️ System Architecture

### Core Services

* Worker Service
* Premium Service
* Risk Modeling Service
* Disruption Detection Service
* Economic Impact Service
* Eligibility Service
* Fraud Detection Service
* Payout Service
* Insurance Integration Service
* Ledger Service

---

### Tech Stack

* Backend: Node.js (NestJS)
* Event Streaming: Kafka
* AI: Python
* Database: PostgreSQL + Redis
* Cloud: AWS

---

## 🖥️ Platform Design

* backend infrastructure + web dashboard
* no separate worker app
* integrates with delivery platforms

---

## 💼 Business Model

### Revenue

* premium commission
* analytics services
* fraud detection services

### Value

*Workers*

* income protection
* fast payouts

*Platforms*

* workforce stability
* retention

*Insurers*

* scalable risk model
* reduced fraud

---

## 🛡️ Why Not Built by Platforms?

GigSafe provides:

* cross-platform risk intelligence
* standardized parametric triggers
* insurance integration infrastructure

👉 Platforms cannot easily replicate cross-platform insights.

---

## 🎯 Conclusion

GigSafe enables:

* automated income protection
* accurate disruption detection
* sustainable insurance economics
* scalable risk infrastructure

It transforms gig worker protection into a *real-time, data-driven system*.
