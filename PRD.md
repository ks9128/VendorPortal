# Product Requirements Document (PRD)
## Vendor Management Mini-Portal

### 1. Overview
**Objective:** Build a full-stack web module to assess architecture, UI/UX, and code quality.
**Deadline:** 48 Hours (Due: Dec 5, 19:27).
**Tech Stack:** React/Next.js (Frontend), Node.js (Backend), PostgreSQL/MongoDB (Database).

### 2. Core Features

#### 2.1 Vendor Registration
- **Fields:** Vendor Name, Owner Name, Contact Number, Email, Business Category (Dropdown), City, Description, Logo (Upload), Password.
- **Functionality:** Form validation, API submission, Password hashing (bcrypt), Success screen.

#### 2.2 Vendor Login & Dashboard
- **Auth:** Email + Password login.
- **Dashboard:**
    - Profile Summary.
    - Update Details.
    - Manage Products (CRUD).

#### 2.3 Product Management (Vendor Only)
- **Actions:** Add, Edit, Delete products.
- **Fields:** Product Name, Image, Short Description, Price Range.
- **Security:** Only the owner can edit their products.

#### 2.4 Public Vendor Profile (`/vendor/{vendorId}`)
- **Display:** Vendor details (Logo, Name, Category, Desc) + List of Products.
- **Product Card:** Image, Name, Desc, Price.

#### 2.5 Vendor Listing (Public)
- **Features:** List all vendors.
- **Filters:** Search by Name, Filter by Category, Sort by Rating.
- **Card:** Logo, Name, Category, Avg Rating, "View Profile" button.

#### 2.6 Feedback System (`/vendor/{vendorId}/feedback`)
- **Form:** Client Name, Project Name, Rating (1-5), Comments.
- **Logic:** Save review, Auto-update Vendor's Average Rating.

#### 2.7 Admin Panel (Basic)
- **View:** Table of all vendors.
- **Columns:** Name, Category, Rating, No. of Reviews.
- **Action:** Click to view details.

### 3. Database Schema (MongoDB)

#### Vendors Collection
- `vendorName`, `ownerName`, `email`, `password`, `contactNumber`
- `businessCategory`, `city`, `description`, `logo`
- `averageRating`, `numberOfReviews`
- `refreshToken`

#### Products Collection
- `vendorId` (Ref: Vendor)
- `name`, `image`, `shortDescription`, `priceRange`

#### Reviews Collection
- `vendorId` (Ref: Vendor)
- `clientName`, `projectName`, `rating`, `comment`

### 4. Deliverables
1.  **GitHub Repo:** `/frontend`, `/backend`, `README.md`.
2.  **Deployed Link:** Vercel/Render.
3.  **Postman Collection:** API Documentation.
