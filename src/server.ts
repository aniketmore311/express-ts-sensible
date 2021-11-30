import 'make-promises-safe';
import { config } from 'dotenv';
config();
import { app } from './app';

const PORT = process.env.PORT || "8080";

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`)
})

