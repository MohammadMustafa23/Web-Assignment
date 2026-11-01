# Cynbit Website Improvement Prototype

A frontend improvement project developed as part of the **Cynbit Full Stack Developer Intern Assessment**.

The main focus is improving the Careers experience, simplifying job applications, and making the application process more user-friendly.

**Live Demo:** https://demo-web-brown-ten.vercel.app/

**Original Website:** https://www.cynbit.in/

---

## 1. Project Overview

While exploring Cynbit's website, I identified opportunities to improve the Careers section, particularly the job discovery and application experience.

I redesigned the Careers page and introduced a four-step application form with better navigation, validation, error handling, and automatic draft saving.

The project also includes additional website audit findings that can be considered for future improvements.

## 2. Implemented Features

### Careers Page
- Improved Careers landing page.
- Job cards with application drawer interaction.
- Functional job category filters.
- Responsive user interface.
- Live Demo: https://demo-web-brown-ten.vercel.app/careers


### Application Form
- Four-step application workflow.
- Previous / Next navigation.
- Progress indicator.
- Centralized form state management.
- Automatic draft saving using `localStorage`.
- Draft restoration after page reload.
- Field-wise validation.
- Clear error messages and handling.

## 3. Application Workflow

| Step | Section |
|---|---|
| 01 | Basic Information |
| 02 | Academic & Professional Background |
| 03 | Location & Presence |
| 04 | Architectural Narrative |

The form allows candidates to complete their application step by step, navigate between sections, and continue from previously saved draft information.

## 4. Technology Stack

- React.js
- Vite
- JavaScript
- CSS
- Browser localStorage
- Lucide React
- Vercel

## 5. Additional Website Audit Findings

During the website review, I identified these additional improvement opportunities:

| Area | Observation |
|---|---|
| Sidebar | Closing interaction can be improved. |
| Case Studies | Category filtering needs improvement. |
| BitElevate | Advertised Full Stack GitHub repository returns a public 404 error. |
| Footer | Office location navigation can be improved. |
| Contact | Customers may need better guidance when explaining project requirements. |

These findings were documented but are not part of the completed primary implementation.

## 6. Future Improvements

- Backend integration for actual application submissions.
- Database storage and application management.
- Candidate application status tracking.
- Guided multi-step Contact inquiry.
- Improved Case Studies filtering.
- Better sidebar accessibility.
- Verification of BitElevate resource links.
- Office location and Google Maps integration.

## 7. Scope and Limitations

This is an independent frontend prototype.

Application drafts are stored in the user's browser using `localStorage`. They are not synchronized with a server or Cynbit's recruitment system.

Actual application submission, centralized database storage, and administrative management are outside the current scope.

## 8. Conclusion

The project focuses on improving the Careers experience through structured application steps, better navigation, client-side validation, and draft persistence.

The additional audit findings document other opportunities to improve Cynbit's website in future iterations.

---

**Developed by:** Mohammad Mustafa

**Assessment:** Full Stack Developer Intern — Cynbit
