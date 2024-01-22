import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import postRoutes from './routes/postRoutes';
import pageRoutes from './routes/pageRoutes';
import statusRoutes from './routes/statusRoutes';
import batchRoutes from './routes/batch.route';
import cacheRoutes from './routes/cache.route';
import morgan from 'morgan';
import cors from 'cors';

const port = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('tiny'));
app.use('/api/post', postRoutes);
app.use('/api/page', pageRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/batch', batchRoutes);
app.use('/api/cache', cacheRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
