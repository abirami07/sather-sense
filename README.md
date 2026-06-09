# Sather Sense

**Accessible indoor navigation for visually impaired users.**

Sather Sense is an accessibility-first indoor navigation platform built for complex buildings such as UC Berkeley's Wheeler Hall and Dwinelle Hall. The system combines OCR-based location detection, route planning, voice guidance, and haptic feedback to help users navigate indoor spaces more independently.

> Built for SodaHacks 2026.

## Overview

Indoor navigation is difficult for visually impaired users because GPS is unreliable inside buildings and many spaces have confusing layouts, floor transitions, and unclear signage. Sather Sense addresses this by using building graph data, OCR-assisted localization, and accessible multimodal guidance.

The repository contains two main apps:

- `mobile/` — Expo + React Native + TypeScript mobile app for navigation.
- `web-admin/` — React + Vite + TypeScript admin portal for uploading and annotating floor plans.

## Features

### Mobile app

- OCR-assisted indoor location detection
- Voice-guided navigation flow
- Haptic feedback cues for accessible guidance
- Building graph routing for Wheeler Hall and Dwinelle Hall
- Destination input and route planning screens
- Arrival confirmation flow
- Accessibility-focused UI components

### Web admin portal

- Dashboard for managing indoor navigation assets
- Floor plan upload page
- Floor annotation workflow skeleton
- Future support for building/floor graph management

## Tech Stack

### Mobile

- React Native
- Expo
- TypeScript
- React Navigation
- Speech-to-text / text-to-speech service structure
- Haptics service structure

### Web Admin

- React
- Vite
- TypeScript

## Repository Structure

```text
sather-sense/
├── mobile/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── navigation/
│   │   ├── screens/
│   │   ├── services/
│   │   ├── theme/
│   │   ├── types/
│   │   └── utils/
│   ├── app.json
│   ├── babel.config.js
│   ├── package.json
│   └── tsconfig.json
├── web-admin/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## Getting Started

### Run the mobile app

```bash
cd mobile
npm install
npm start
```

Then open the app using Expo Go or a simulator.

### Run the web admin portal

```bash
cd web-admin
npm install
npm run dev
```

## Architecture

```text
Mobile App
  ↓
OCR / Location Detection
  ↓
Route Planning Engine
  ↓
Instruction Generation
  ↓
Speech + Haptic Guidance

Web Admin Portal
  ↓
Floor Plan Upload
  ↓
Floor Annotation
  ↓
Future Building Graph Management
```

## Impact

Sather Sense was designed to make indoor navigation more accessible by combining software engineering, graph-based routing, and assistive interaction design. The project demonstrates a full product workflow: a mobile user-facing app, an admin portal, structured building data, and accessibility-focused services.

## Future Improvements

- Integrate live OCR through Google ML Kit or a similar OCR provider
- Add backend support for saving building maps and annotations
- Add real-time localization improvements
- Add more UC Berkeley buildings
- Improve route instructions for stairs, elevators, and accessibility constraints
- Add user testing with visually impaired users
