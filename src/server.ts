import { app } from './app';
import { config } from './config';
import { logger } from './common/logger';

const server = app.listen(config.port, () => {
  logger.info(`Application server running on port ${config.port}`);
});

/**
 * Error handling when client sends incorrect content-length or closes connection too early.
 * https://nodejs.org/api/http.html#http_event_clienterror
 */
server.on('clientError', (error: Error, socket) => {
  logger.warn(error);
  if (!socket.writable) {
    return;
  }
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
