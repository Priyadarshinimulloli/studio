# BhojanConnect Dashboard

A modern, AI-powered dashboard for street food vendors to manage raw material sourcing, supplier relationships, orders, and logistics. Built with Next.js, React, and Firebase.

---

## Overview

**BhojanConnect** empowers street food vendors by providing transparent sourcing of raw materials, trusted supplier discovery, and efficient group ordering — supported by real-time geo-tracking, AI-driven intelligence, and seamless communication tools. The platform is designed for intuitive use, actionable insight, and community-driven cost savings.

---

## Key Features

### Order Management
- **Order Status Tracker:** Visualize the progress of current orders (pending, in-progress, delivered) for quick monitoring.
- **Group Order Meter:** Track progress of group orders with dynamic fulfillment meters and bulk discounts.

### Supplier Intelligence
- **AI Supplier Recommendations:** Personalized supplier suggestions based on menu, locality, and past ratings.
- **Supplier Listings:** Browse and filter suppliers by product, price, location, trust score, and verification.
- **Trust Score Generator:** AI-calculated supplier reliability based on reviews, delivery history, and quality.

### Price Optimization
- **Price Comparison Tool:** Compare prices for raw materials across suppliers to ensure fair deals.

### Communication & Support
- **Vendor Alerts:** Real-time notifications for offers, urgent issues, and delivery updates.
- **Integrated Chat:** Direct messaging with suppliers and group order members.
- **Issue Reporting:** Quickly report and track problems for fast resolution.

### Personalization & History
- **Wishlist:** Save favorite suppliers and products for future ordering.
- **Order History:** Detailed logs of all past orders with supplier and delivery status info.

### Live Map Geo-Tracking
- **Interactive Map:** Powered by react-leaflet and OpenStreetMap, showing:
  - Verified supplier locations with trust scores.
  - Animated delivery vehicles and real-time group order routes.
  - Product availability highlights.

---

## Technology Stack

| Layer             | Technology                               |
|-------------------|----------------------------------------|
| Frontend          | Next.js, React, TypeScript, Tailwind CSS |
| Mapping           | react-leaflet, leaflet, OpenStreetMap  |
| Backend / Realtime | Firebase                              |
| Icons & Fonts     | lucide-react, Playfair & PT Sans fonts |

---
## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
npm install
```

### Running the Project

```bash
npm run dev
```

Visit [http://localhost:9002](http://localhost:9002) to view the dashboard.

---

## File Structure

- `src/app/dashboard/page.tsx` — Main dashboard layout and widgets.
- `src/components/LiveMapGeoTracking.tsx` — Live map for supplier and delivery visualization.
- `src/components/*` — Modular dashboard features (order tracking, recommendations, chat, etc.).
- `src/app/page.tsx` — Landing page.

---


