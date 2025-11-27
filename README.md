# Project Setup

Follow these steps to run the project locally.

## 1. Install Dependencies

Install the required packages for both the **client** and **server** directories.

```bash
cd client
npm install

cd ../server
npm install
```

---

## 2. Generate Prisma Client

While inside the **server** directory:

```bash
npx prisma generate
```

---

## 3. Run Database Migrations

Still inside the **server** directory:

```bash
npx prisma migrate dev
```

---

## 4. Start the Project

Run both the client and server (in separate terminals):

### Client:

```bash
cd client
npm run dev
```

### Server:

```bash
cd server
npm run dev
```