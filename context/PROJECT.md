# PROJECT.md — Streaming Subscription Cost Tracker

## Problem
People with several streaming subscriptions can lose track of their services and the monthly price they pay. In two earlier interviews recorded in HW5's `context/FEATURES.md`, both participants underestimated how many subscriptions they had.

## Reframe
Instead of automatically detecting subscriptions from sensitive bank or streaming credentials, provide a simple, manual-entry dashboard where users can see their current services, their combined estimated monthly spending, and optional renewal dates.

## Value proposition
A lightweight, inspectable, no-bank-login tracker for people who want visibility into recurring streaming costs. Users enter service name, monthly price and optionally a renewal date. This final-project starting point intentionally does not cancel subscriptions, manage payments, authenticate to accounts, or make streaming-content recommendations.

## Success measures
- **Outcome:** a user can correctly identify their listed subscriptions and monthly total after entering their own (or fictional demo) records. Baseline from interviews: both respondents initially underestimated the number of subscriptions.
- **Leading indicator:** a test user completes a save, reload, read, and delete cycle without assistance.
- **Guardrail:** no real sensitive financial records should be entered until user-specific authentication and data privacy are implemented. The present D1 backend shares its entries across users.

## Origin
This application was ported from [HW5](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5) on November 11, 2026. The original HW5 context discusses additional recommendation features; those are not claimed to be implemented here.
