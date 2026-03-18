#  GigSafe: Income Protection for Food Delivery Partners
##  📌problem statement
India’s food delivery partners on platforms like Swiggy and Zomato form the backbone of the on-demand economy. However, their income is highly vulnerable to external disruptions such as extreme weather (heavy rain, flooding), local restrictions, platform outages, and sudden drops in order demand.

Since delivery partners earn on a per-order basis, even short-term disruptions can significantly reduce their working hours, leading to 20–30% loss in income.

Unlike traditional employees, they lack:

- stable or fixed wages    
- paid leave or downtime compensation
- access to fast and reliable income protection

As a result, whenever disruptions occur, delivery partners are forced to bear the full financial impact, with no safety net to protect their daily earnings.


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

*Premium = Base × Zone Risk × Seasonal Factor*

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

## 🧠 AI/ML Integration

AI is integrated in three key areas:

### 1️⃣ Risk Scoring

* zone-level risk prediction
* seasonal risk adjustment

### 2️⃣ Fraud Detection

* anomaly detection
* GPS spoofing detection
* coordinated inactivity patterns
* suspicious behavior clustering

### 3️⃣ Future Scope

* disruption prediction
* dynamic pricing refinement

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

## 🔐 Fraud Prevention Mechanisms

GigSafe handles gig-specific fraud risks such as:

* GPS spoofing
* fake inactivity
* shared accounts
* multi-platform misuse

Using:

* AI anomaly detection
* behavioral analysis
* activity verification

---

## 🏗️ System Architecture Overview

The platform is designed as a *scalable microservices + event-driven system*.

### Core Components:

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

### Infrastructure:

* Event Streaming: Kafka
* Backend: Node.js (NestJS)
* AI Layer: Python
* Database: PostgreSQL + Redis
* Cloud: AWS

---

## 🖥️ Platform Design Choice

GigSafe is built as a:

### 👉 Backend Infrastructure + Web Dashboard

* Workers interact via existing delivery apps
* No separate mobile app required
* Web dashboard used by platforms and insurers

This ensures:

* seamless integration
* minimal friction for workers
* scalability

---

## 🧩 Business Model

GigSafe operates as a *B2B2C insurtech platform*.

### Revenue Streams:

* percentage of premium distribution
* analytics subscription for platforms
* fraud detection services for insurers

### Value Proposition:

*For Workers*

* income protection
* fast payouts

*For Platforms*

* improved retention
* workforce stability

*For Insurers*

* scalable gig insurance
* reduced fraud risk

---

## 🛡️ Why Not Built by Platforms?

While platforms like delivery apps have internal data, GigSafe provides:

* cross-platform risk intelligence
* standardized parametric triggers
* insurance integration infrastructure
* regulatory-compliant risk modeling

This makes GigSafe a *neutral risk infrastructure layer* for the gig economy, rather than a platform-specific feature.

## 🎯 Conclusion

GigSafe addresses a critical gap in the gig economy by providing:

* automated income protection
* accurate disruption detection
* sustainable insurance economics
* scalable risk infrastructure

This solution transforms gig worker protection from a *reactive system* into a *proactive, automated, and data-driven model*.

