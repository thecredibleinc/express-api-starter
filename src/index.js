import server from './boot/server';
import logger from './utils/logger';

server.listen(server.get('port'), server.get('host'), () => {
  logger.info(`Server started at http://${server.get('host')}:${server.get('port')}/api/v1`);
});
