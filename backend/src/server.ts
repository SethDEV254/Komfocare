import app from './app';
import { config } from './config';
import { prisma } from './services/prisma';

const startServer = async () => {
  try {
    // Attempt database connection check
    await prisma.$connect();
    console.log('✅ PostgreSQL / Prisma Database connection established.');
  } catch (dbError) {
    console.warn('⚠️ Notice: Direct database connection deferred or offline. Starting Express API in resilient mode...', dbError);
  }

  const server = app.listen(config.port, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   🏥 KOMFOCARE HEALTHCARE PLATFORM API IS RUNNING                 ║
║   Compassionate Care, Right at Home.                              ║
║                                                                   ║
║   • Local Server:       http://localhost:${config.port}                    ║
║   • Health Check:       http://localhost:${config.port}/api/health         ║
║   • Environment:        ${config.nodeEnv.toUpperCase().padEnd(16)}                  ║
║   • Railway Ready:      YES (PORT: ${config.port})                          ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
    `);
  });

  // Graceful Shutdown
  const handleShutdown = async (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      await prisma.$disconnect();
      console.log('🔒 Database connections closed. Process terminating.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
};

startServer();
