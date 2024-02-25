@echo off

start cmd /k "cd client && yarn dev"
start cmd /k "cd server && yarn dev"
@REM start cmd /k "cd server && prisma studio --schema ./src/prisma/schema.prisma"  @REM for prisma studio
start cmd /k "cd model && python main.py"
