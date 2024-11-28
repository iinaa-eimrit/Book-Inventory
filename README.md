# Build Full Stack Bookstore App (MERN)

## How to Run This Project

### Frontend Setup

1. **Clone or Unzip the Project:**
   - Clone the repository or extract the project folder.

2. **Navigate to the Frontend Directory:**
   cd frontend

3. **Create Environment Variables:**
   - In the `frontend` root directory (same level as `package.json`), create a `.env.local` file with the following content:
   # Configure Firebase
   VITE_API_KEY="AIzaSyCXvDIC4MPrkaMdeg_O2iij88wLpfj3qBA"
   VITE_AUTH_DOMAIN="book-store-mern-app.firebaseapp.com"
   VITE_PROJECT_ID="book-store-mern-app"
   VITE_STORAGE_BUCKET="book-store-mern-app.appspot.com"
   VITE_MESSAGING_SENDER_ID="205632822247"
   VITE_APP_ID="1:205632822247:web:b0db0ec66bf6de0bbb3b42"

4. **Install Dependencies:**

   npm install


5. **Run the Frontend:**

   npm run dev


---

### Backend Setup

1. **Clone or Unzip the Project:**
   - Clone the repository or extract the project folder.

2. **Navigate to the Backend Directory:**

   cd backend


3. **Install Dependencies:**

   npm install


4. **Create Environment Variables:**
   - In the `backend` root directory (same level as `package.json`), create a `.env` file with the following content:

   # MongoDB URL
   DB_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/book-store?retryWrites=true&w=majority"

   # JWT Secret Key
   JWT_SECRET_KEY="bc992a20cb6706f741433686be814e3df45e57ea1c2fc85f9dbb0ef7df12308a669bfa7c976368ff32e32f6541480ce9ec1b122242f9b1257ab669026aeaf16"


   > **Note:** 
   > - Replace `<username>` and `<password>` with your MongoDB credentials.
   > - Update the JWT secret key as per your security needs.

5. **Run the Backend:**

   npm run start:dev
