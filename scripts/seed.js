const fs = require('fs');
const path = require('path');
const postgres = require('postgres');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
let databaseUrl = process.env.DATABASE_URL;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    const match = line.trim().match(/^DATABASE_URL\s*=\s*["']?(.*?)["']?$/);
    if (match) {
      databaseUrl = match[1];
      break;
    }
  }
}

if (!databaseUrl) {
  console.error('Error: DATABASE_URL is not set in environment or .env.local');
  process.exit(1);
}

const sql = postgres(databaseUrl, {
  ssl: { rejectUnauthorized: false }
});

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@acme.com',
    password: 'acme123',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
  {
    id: 'b7b25204-62e9-4e78-9e5c-7d9a8e2cbdf2',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: 'f9d3f101-382a-4db3-98cc-9df5b128522c',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  }
];

const invoices = [
  {
    customer_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
  {
    customer_id: 'b7b25204-62e9-4e78-9e5c-7d9a8e2cbdf2',
    amount: 25000,
    status: 'paid',
    date: '2026-08-20',
  },
  {
    customer_id: 'f9d3f101-382a-4db3-98cc-9df5b128522c',
    amount: 18000,
    status: 'pending',
    date: '2026-08-21',
  }
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

async function seed() {
  try {
    // 1. Create tables
    const schemaSql = fs.readFileSync(path.join(__dirname, '..', 'data', 'schema.sql'), 'utf8');
    console.log('Creating tables...');
    await sql.unsafe(schemaSql);

    // 2. Insert Users
    console.log('Seeding users...');
    for (const user of users) {
      await sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.password})
        ON CONFLICT (email) DO NOTHING;
      `;
    }

    // 3. Insert Customers
    console.log('Seeding customers...');
    for (const customer of customers) {
      await sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO UPDATE SET 
          name = EXCLUDED.name,
          email = EXCLUDED.email,
          image_url = EXCLUDED.image_url;
      `;
    }

    // 4. Insert Invoices
    console.log('Seeding invoices...');
    for (const invoice of invoices) {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date});
      `;
    }

    // 5. Insert Revenue
    console.log('Seeding revenue...');
    for (const rev of revenue) {
      await sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO UPDATE SET revenue = EXCLUDED.revenue;
      `;
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

seed();
