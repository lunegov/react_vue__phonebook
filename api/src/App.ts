import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import phoneRouter from './routes';

const app = new Koa();
const PORT = 3000;

app.use(bodyParser());

app.use(phoneRouter.routes());
app.use(phoneRouter.allowedMethods());

app.listen(PORT, () => {
  console.log(`Сервер TypeScript запущен на http://localhost:${PORT}`);
});
