# Cynbit Website Improvement Prototype

> A frontend improvement project focused on enhancing the Careers experience, simplifying job applications, and identifying additional opportunities to improve the Cynbit website.

---

## 🌐 Live Demo
**Live Website:** https://demo-web-brown-ten.vercel.app/

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Implemented Features](#2-implemented-features)
- [3. Careers Application Workflow](#3-careers-application-workflow)
- [4. Additional Website Audit Findings](#4-additional-website-audit-findings)
- [5. Future Improvement Roadmap](#5-future-improvement-roadmap)
- [6. Project Scope and Limitations](#6-project-scope-and-limitations)
- [7. Implementation Summary](#7-implementation-summary)

---

## 1. Project Overview

The primary objective of this project was to improve the Careers section of Cynbit's website by creating a more structured, accessible, and user-friendly job application experience.

The existing application experience was redesigned around a **four-step application workflow**, supported by step-wise validation, progress tracking, navigation controls, and automatic draft persistence.

In addition to the primary implementation, a broader website review was conducted to identify other areas where usability, navigation, and functionality could be improved.

### Project Focus

| Area                 | Objective                                                      |
| -------------------- | -------------------------------------------------------------- |
| Careers Experience   | Improve the careers landing page and job discovery experience. |
| Application Workflow | Simplify the job application process through multiple steps.   |
| Form Usability       | Provide clear validation and error feedback.                   |
| Draft Persistence    | Preserve application progress using browser storage.           |
| Website Audit        | Identify additional opportunities for future improvements.     |

---

## 2. Implemented Features

The following features were implemented as part of the primary prototype.

### Careers Page

| No. | Feature                                      | Implementation Status |
| :-: | -------------------------------------------- | :-------------------: |
| 01  | Improved Careers landing page                |     ✅ Completed      |
| 02  | Job cards and application drawer interaction |     ✅ Completed      |
| 03  | Job category filtering                       |     ✅ Completed      |

### Multi-Step Application System

| No. | Feature                                           | Implementation Status |
| :-: | ------------------------------------------------- | :-------------------: |
| 04  | Four-step application form                        |     ✅ Completed      |
| 05  | Previous and Next navigation                      |     ✅ Completed      |
| 06  | Application progress indicator                    |     ✅ Completed      |
| 07  | Centralized form state management                 |     ✅ Completed      |
| 08  | Draft saving and restoration using `localStorage` |     ✅ Completed      |
| 09  | Field-wise form validation                        |     ✅ Completed      |
| 10  | Validation messages and error handling            |     ✅ Completed      |

### Key Benefits

- **Structured application:** Breaks a lengthy application into manageable steps.
- **Better navigation:** Candidates can move between steps using Previous and Next controls.
- **Progress visibility:** A progress indicator communicates the current stage.
- **Reduced data loss:** Saved drafts can be restored when candidates return.
- **Improved validation:** Field-level feedback helps candidates correct incomplete or invalid information.

---

## 3. Careers Application Workflow

The application form is organized into four stages to make the candidate experience more manageable.

| Step | Section                            | Information Collected                             |
| :--: | ---------------------------------- | ------------------------------------------------- |
|  01  | Basic Information                  | Personal and contact details                      |
|  02  | Academic & Professional Background | Education, qualifications, and technical skills   |
|  03  | Location & Presence                | Location, address, resume, and professional links |
|  04  | Architectural Narrative            | Candidate statement and application confirmation  |

### Application Experience

The workflow includes:

1. Enter the required information in each stage.
2. Validate the current step before proceeding.
3. Navigate between completed and previous steps.
4. Save application progress automatically in browser storage.
5. Review the information and confirm the application.

---

## 4. Additional Website Audit Findings

During the review of Cynbit's website, several additional areas were identified as potential opportunities for improvement.

These findings were documented separately because the primary development scope focused on the Careers Application experience.

| Website Area       | Audit Observation                                                                 | Recommended Improvement                                                          |
| ------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Sidebar Navigation | The closing interaction could be more intuitive and accessible.                   | Add a visible close button, outside-click support, and Escape-key functionality. |
| Case Studies       | Category-based filtering needs improvement.                                       | Implement functional category filters for better project discovery.              |
| BitElevate         | The advertised Full Stack GitHub repository appears to return a public 404 error. | Verify the destination and provide a valid resource link or fallback.            |
| Footer             | Office location discovery could be improved.                                      | Add office location information and an Open in Maps action.                      |
| Contact Page       | Customers may need more guidance when describing project requirements.            | Introduce a guided, multi-step project inquiry experience.                       |

> **Note:** These are additional audit observations, not features delivered as part of the primary prototype.

---

## 5. Future Improvement Roadmap

The following enhancements represent potential next steps for future iterations of the website.

| Priority | Proposed Enhancement            | Expected Benefit                                                                   |
| :------: | ------------------------------- | ---------------------------------------------------------------------------------- |
|   High   | Backend Integration             | Enable secure application submission, database storage, and administrative review. |
|   High   | Application Status Tracking     | Allow candidates to check the progress of submitted applications.                  |
|  Medium  | Guided Contact Inquiry          | Help customers explain their project requirements through a structured form.       |
|  Medium  | Case Studies Filtering          | Improve project discovery through functional category filters.                     |
|  Medium  | Sidebar Accessibility           | Improve keyboard navigation and closing interactions.                              |
|  Medium  | BitElevate Resource Reliability | Resolve broken or outdated external repository destinations.                       |
|   Low    | Office Location Navigation      | Provide better location information and direct map access.                         |

### Detailed Future Scope

**1. Backend Integration**

Connect the application form to a secure backend and database to support actual application submission, reliable data storage, and administrative review.

**2. Application Status Tracking**

Introduce an application tracking system that allows candidates to view updates on their submitted applications.

**3. Guided Contact Inquiry**

Develop a multi-step project inquiry form to help customers communicate their requirements, goals, and expectations more clearly.

**4. Case Studies Filtering**

Improve project discovery with functional category-based filters and an organized case studies experience.

**5. Sidebar Accessibility**

Improve the sidebar interaction by adding visible controls, keyboard navigation, Escape-key support, and outside-click handling.

**6. BitElevate Resource Reliability**

Verify external repository references and replace broken destinations with valid resources or appropriate fallback links.

**7. Office Location Navigation**

Improve the footer with office location details and a direct Google Maps navigation option.

---

## 6. Project Scope and Limitations

The completed prototype focuses primarily on frontend improvements to the Careers section and its application workflow.

| Area                                  | Current Scope                    |
| ------------------------------------- | -------------------------------- |
| Careers Page                          | Implemented                      |
| Job Listing Experience                | Implemented                      |
| Multi-Step Application                | Implemented                      |
| Client-Side Validation                | Implemented                      |
| Draft Persistence                     | Implemented using `localStorage` |
| Backend Submission                    | Future scope                     |
| Database Integration                  | Future scope                     |
| Administrative Application Management | Future scope                     |
| Application Status Tracking           | Future scope                     |

### Important Implementation Note

Application drafts are stored in the user's browser using `localStorage`. Actual server-side application submission, centralized storage, and administrative management require backend integration and are not included in the current frontend prototype.

---

## 7. Implementation Summary

The project delivers a focused improvement to Cynbit's Careers experience, with particular attention to application usability, structured navigation, form validation, and draft persistence.

The additional website audit findings provide a clear direction for future development without expanding the scope of the current implementation.

**Primary Deliverable:** An improved Careers page with an interactive four-step job application experience.

**Development Approach:** Focused frontend implementation, reusable React components, structured form state management, and client-side validation.

**Future Direction:** Backend integration, application tracking, accessibility improvements, and broader website functionality.

---

_This repository contains the source code for the working prototype developed as part of the Cynbit Full Stack Developer Intern technical assessment._
