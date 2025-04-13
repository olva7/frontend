## 🛒 About the Project

**Mi** is a modern and intuitive e-commerce platform dedicated to the management and sale of automotive assets (*estates*).  
It enables seamless interaction between three complementary user profiles: **dealers**, **customers**, and **administrators**, each with access to features and dashboards tailored to their specific needs.

---

### 👨‍🔧 Dealer

- Adds estates with their contact information and image galleries  
- Views the list of their own estates  
- Accesses financing requests related to their estates  

---

### 👤 Customer

- Browses the products available on the platform  
- Views the details of a product (estate)  
- Submits a financing request for a product  
- Tracks the progress and status of their requests  

---

### 🛡️ Administrator

- Accesses e-commerce site statistics  
- Approves or rejects estates submitted by dealers  
- Manages users (customers and dealers)  
- Oversees financing requests  
---

## 🧰 Tech Stack

### Frontend

- **Modern UI**: Built with Angular, leveraging modular components and lazy loading for enhanced performance.
- **Language**: Developed entirely in **TypeScript** for type safety and cleaner code.
- **Routing**: Implements Angular Router for seamless client-side navigation.
- **User Interface**:
  - Custom, responsive UI with a clean and professional design
  - Reactive Forms and custom form controls for efficient form handling
- **Features**:
  - Pagination and search functionality integrated with backend services
  - Dynamic dashboards and user-specific views

### DevOps

- **Docker**: Dockerized frontend for consistent deployment across environments
- **Nginx**: Used as a reverse proxy to serve the Angular application efficiently
  
# Demo

### 🛡️ Administrator

The image below showcases the **login interface** of the *Mi* e-commerce platform.
- Positioned at the center is a **login modal** with a clean, modern design.
- Users are prompted to enter their **email** and **password** to authenticate.
 ![Capture d'écran 2024-06-06 161605](https://github.com/user-attachments/assets/599f4df4-7226-4aff-8386-1a6907419153)
 ![Capture d'écran 2024-06-06 161545](https://github.com/user-attachments/assets/45f533fb-49d6-4bde-b419-d6e42947bb2a)

### 📊 Preview – Administrator Dashboard

This image presents the **Administrator Dashboard** of the *Mi* platform.

- The **main dashboard** displays key metrics:
  - 🛒 Financing requests:  including ` new` since the last visit
  - 📈 Site statistics:  increase compared to the previous week
  - 🏠 Real estate count:  newly registered items
  - 💬 Unread notifications
 
    

- A colorful **pie chart** gives a breakdown of estate categories:
  - Pink: *Immobilier Résidentiel* (Residential)
  - Blue: *Immobilier de Vacances* (Vacation)
  - Yellow: *Terrain* (Land)
![Capture d'écran 2024-06-07 153914](https://github.com/user-attachments/assets/917c08fb-b9ac-4366-b601-796e3fe35e6d)

- The clean and minimal interface ensures intuitive data visualization for administrators, with responsive components and clear navigation options.
  
- The **left sidebar** provides easy navigation across core features:
  - User management (`Gérer les utilisateurs`)
  - Lists of users, financing requests, and estates
  - Access to the landing and main pages

![Capture d'écran 2024-06-07 121450](https://github.com/user-attachments/assets/5af5ca7a-e9a1-4ca0-82a1-25dfa4482a59)
![Capture d'écran 2024-06-07 121317](https://github.com/user-attachments/assets/49b9129a-d021-48ed-9886-70d91245681d)
![Capture d'écran 2024-06-06 163026 (1)](https://github.com/user-attachments/assets/7d6fed29-d087-4e32-a4e6-188ef9e5bb08)
![Capture d'écran 2024-06-07 152826](https://github.com/user-attachments/assets/902aecb3-4e1a-43e1-a4c2-eb86d844a25b)


### 👨‍🔧 Dealer
### 🏡 Preview – Add a New Estate

This interface enables administrators to **add a new real estate property** to the platform.

- The form includes:
  - **Category & Type selection** via dropdowns
  - Text inputs for:
    - 🏷 *Libellé Immobilier* (Title)
    - 📍 *Adresse Immobilier* (Address)
    - 📏 *Surface en m²* (Area)
    - 🧩 *Nombre de composants* (Number of components)
    - 💶 *Prix en m²* and *Prix Total* (Price per square meter and total price)

- The green button allows users to **upload a showcase image**: `Choisir une image vitrine`

- Once all fields are filled, users can submit the new estate using the `Add Estate` button.


![Capture d'écran 2024-06-07 142141](https://github.com/user-attachments/assets/6acdffef-279a-494d-8ea6-4663cf1f2a06)

### 🗂️ Preview – Liste des biens immobiliers

This page displays a **catalog of real estate properties** in a card-based layout.

- 🔍 **Sort and Filter**:
  - Sort by price using the dropdown
  - Search estates by name using the search bar

- 🏠 Each card shows:
  - 📍 Location (e.g., *Tunis*, *Mahdia*)
  - 🖼️ Thumbnail image
  - 🏷 Type (e.g., *Villa*, *Maison d’hôtes*)
  - 💰 Price and 📏 Surface area

- ✅ **Two action buttons on each card**:
  - 🧐 **View Details** button: Opens a detailed view of the selected estate
  - 🖼️ **Add Gallery** button: Allows adding more images to the estate

- 📄 Pagination at the bottom allows users to navigate through all listings.

This interface provides a **clean and user-friendly way** to browse, inspect, and manage real estate entries efficiently.

![Capture d'écran 2024-06-07 142432](https://github.com/user-attachments/assets/29a09c19-a446-49c5-bbb5-a24e4e3775f7)


![Capture d'écran 2024-06-07 143943](https://github.com/user-attachments/assets/fdd11ac3-5d46-49e4-9990-acea1f77a9cf)

![Capture d'écran 2024-06-07 164844](https://github.com/user-attachments/assets/45665c8d-5d56-4141-89b9-7accb00f295d)

🧾 Financing Requests Page
This page displays the list of financing requests submitted by users for the real estate properties added by the assigned dealer.

Each request corresponds to a specific property and is visible only to the dealer who published the estate.

![Capture d'écran 2024-06-07 152425](https://github.com/user-attachments/assets/5ce86457-83d2-41d0-9227-e473b54bf7e4)

### 👤 Customer

🏠 Real Estate Listing Interface
This module provides a sleek and intuitive interface for browsing real estate properties available on the platform. It enables users to search, filter, and interact with property listings, while also offering quick actions for exploring details or requesting financing.
🧰 Estate Actions
- Each card includes two functional buttons:
🔍 View Details – Opens a detailed view of the selected property
- 🖼️ Add Gallery – Upload a photo gallery for the selected estate
- 📑 Pagination
Easily navigate through multiple pages of property listings

![Capture d'écran 2024-06-07 172814](https://github.com/user-attachments/assets/0f77893a-21d1-47ee-8eff-22e43e9c9e8b)

![Capture d'écran 2024-06-07 151228](https://github.com/user-attachments/assets/e5a7aec5-6e78-4bf9-9c30-113489636d34)
![Capture d'écran 2024-06-07 151246](https://github.com/user-attachments/assets/d9b783b8-054a-4a7b-87f1-fbb8043f83c8)

![Capture d'écran 2024-06-07 172500](https://github.com/user-attachments/assets/35af5ca6-892e-4c0d-9c69-a7c94b11915b)

