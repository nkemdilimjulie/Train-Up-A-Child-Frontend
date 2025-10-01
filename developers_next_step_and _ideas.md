## 🔗 Stripe Checkout Flow

```text
FRONTEND (Next.js)                      BACKEND (Django)                    STRIPE
-------------------                     ----------------                  --------
User clicks "Donate" button
   |
   |  POST /api/donations/create-checkout-session/   (with amount, e.g., 50)
   | -------------------------------------------------------->
   |                                                          Backend receives request
   |                                                          Creates Stripe Checkout Session:
   |                                                          session = stripe.checkout.Session.create(...)
   |                                                          Returns JSON with session.url
   |
   |  Backend responds: { "url": "https://checkout.stripe.com/..." }
   | <--------------------------------------------------------
   |
Frontend JS receives the URL
   |
   | window.location.href = data.url
   v
Stripe Checkout Page opens
   |
   | User enters card info & pays OR cancels
   v
Stripe redirects:
   /success?session_id=...  OR  /cancel
   |
   | Frontend `/success/page.js` reads session_id if needed
   | Frontend `/cancel/page.js` shows cancel message

````

## 🛠️ How It Works

1. **User clicks "Donate"**  
   - A button on the frontend calls your Django backend to create a Stripe Checkout session.  

2. **Backend creates Checkout session**  
   - Django uses the Stripe API to create a **`Session`** with donation details (amount, metadata).  
   - The backend responds with a **`url`** from Stripe.

3. **Frontend redirects to Stripe**  
   - The frontend takes **`session.url`** and redirects the user to Stripe’s secure payment page.  

4. **User completes or cancels payment**  
   - On success, Stripe redirects to your **`/success`** page.  
   - On cancel, Stripe redirects to your **`/cancel`** page.

5. **Frontend displays result**  
   - **`/success`** page confirms payment (you can show amount, donor name, etc.).  
   - **`/cancel`** page explains that payment was canceled.  

---




### 🔗 URL Overview

| URL                                           | Purpose                                      |
|----------------------------------------------|---------------------------------------------|
| `/donate`                                    | Donation page with button                   |
| `/api/donations/create-checkout-session/`    | Backend endpoint to create Stripe session   |
| `https://checkout.stripe.com/...`            | Stripe-hosted payment page                  |
| `/success?session_id=...`                    | Redirect page for successful payment        |
| `/cancel`                                    | Redirect page if user cancels payment       |


# 🚀 Testing Locally

Start Django backend:

python manage.py runserver


Start Next.js frontend:

npm run dev


Go to http://localhost:3000, click Donate, and complete a test payment.

Use Stripe’s test cards
, e.g.,

4242 4242 4242 4242
Exp: 12/34   CVC: 123


Stripe will redirect you to /success or /cancel.

This setup is now fully working in development.
When deploying, replace http://localhost:3000 and http://localhost:8000 with your production frontend/backend URLs in your settings.py and frontend fetch() calls.

# Next Step and Debugging/Modification

+  at chatGPT: Stripe create_checkout_session: Step 5: Test the flow locally
Frontend and backend stripe payment testing - continue to debug the errors

+ add backend APIs to connect and use the PostgreSQL DB data 

+ add Login, Register, Documentation, Sponsor buttons at the Homepage - app/page.js whereby Sponsor button redirects users to Sponsors nav/page and Documentation button redirects users to Documentation nav/page

+ Also at Donate nav/page add below ``Donate $50`` button, other donate buttons like ``Donate $20``, ``Donate $10``, ``Donate $5``,  ``Donate $100``