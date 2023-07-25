import express from 'express';
import { NextFunction, Request, Response } from 'express';
import orders from './data/orders.json';

const app = express();

// Enable CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('');
});

/**
 * Fetches a list of orders, paginated.
 * Parameters:
 *   page (number) the current page, starting at 1
 *   pageSize (number) the number of orders on a page, starting at 1
 */
app.get('/orders', (req: Request, res: Response) => {
  const pageString = req.query.page as string;
  const pageSizeString = req.query.pageSize as string;

  const page = req.query.page ? Math.max(1, parseInt(pageString, 10)) : 1;
  const pageSize = req.query.pageSize ? Math.max(1, parseInt(pageSizeString, 10)) : 100;

  const items = orders.slice(pageSize * (page - 1), pageSize * page);

  res.send({
    page,
    pageSize,
    total: orders.length,
    count: items.length,
    items
  });
});

app.listen(4300, () => console.log('Server active on port 4300!'));
