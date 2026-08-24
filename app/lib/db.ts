import postgres from 'postgres';

const globalForDb = globalThis as unknown as {
  conn: ReturnType<typeof postgres> | undefined;
};

// Force SSL 'require' for secure connection to cloud PostgreSQL providers (like Neon)
const conn = globalForDb.conn ?? postgres(process.env.DATABASE_URL || '', {
  ssl: 'require',
});

if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn;

export default conn;
