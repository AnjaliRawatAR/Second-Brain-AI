import express from 'express';
import dotenv from 'dotenv';
import ingestRoutes from './routes/ingest_route.js';
import queryRoutes from './routes/query_route.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/ingest', ingestRoutes);
app.use('/api/query', queryRoutes);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;


// import express from 'express';

// const app = express();
// app.use(express.json());

// export default app;
