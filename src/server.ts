import { app } from './app';

app.listen(app.get('port'), app.get('onListen'));