# Simple Patient Management System

## Features

- Patient Registration and Management: Add, update, and manage patient information.
- Appointment Scheduling: Schedule and manage patient appointments.
- Notification System: Send SMS notifications to patients using Twilio.

## Run Locally

Clone the project

```bash
 git clone https://github.com/yourusername/patient-management-system.git
cd patient-management-system
```

2. Install dependencies:

```bash
npm install
```

3.      Set up environment variables:
    Create a .env.local file in the root directory and add your environment variables:

```
NEXT_PUBLIC_DATABASE_ID=your_appwrite_database_id
NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID=your_appwrite_collection_id
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

4. Run the developement server

```bash
  npm run dev
```

## Acknowledgements

    •	Next.js
    •	TypeScript
    •	Tailwind CSS
    •	shadcn
    •	Appwrite
    •	Twilio
