# Sentinel Safe - Real-time safety assessment Application

## SDG

- 16 - Peace, Justice, and Strong Institutions
- 10 - Reduced Inequalities

## About

- Integrates real-time data to assess route safety using machine learning algorithms.
- Provides a user-friendly interface for inputting route preferences and receiving instant safety assessments.
- Displays color-coded risk factors on a map interface for clear insights.
- Enables users to contribute to model accuracy through reviews and feedback.
- Features a community forum for emergency assistance, connecting users with nearby community members.
- Join us in revolutionizing safety assessment and route planning for safer communities.

## Setting up The Project - Manually

1. Clone the repo: `git clone https://github.com/kpriyanshu2003/crowd-management.git`
2. Create a Firebase project and get the Firebase config
3. Generate a `serviceAccount.json` file from the Firebase project and place it in the model folder
4. Create a Mapbox account and get the Mapbox token
5. Create a `.env` file for each folder ( client, server, model ) in the format as shown in the `.env.example` file
6. Install Dependencies ( client and server ): `yarn install`
7. Run `yarn postinstall` to install the Prisma client
8. Create a new virtual environment ( python 3.10 ) and activate it
9. Install the Python dependencies : `pip install -r requirements.txt`
10. Use the `starter.bat` in Windows or `starter.sh` in Linux to start the client, server, and model

## Setting up The Project - Using Docker

In Progress

## Working with Prisma

1. Install Prisma CLI : `npm install -g prisma`
2. Create a new migration: `prisma migrate dev --name mirgration_name --schema ./src/prisma/schema.prisma`
3. Apply the migration: `prisma migrate deploy`
4. Generate the Prisma Client: `prisma generate --schema ./src/prisma/schema.prisma`
5. Reset the database: `prisma migrate reset`

## Important Links

- [Github Repo](https://github.com/kpriyanshu2003/sentinel-safe)
- [Project Documentation - Google Docs](https://docs.google.com/document/d/1M7hBQe6ZlM93tzn4Zx94W_Uv-G94pq3cpE2SbLXcWdE/edit?usp=sharing)
- [Architecture Design - FigJam Board](https://www.figma.com/file/uow36SSsMLHZKVcZtEHEvv/Sentinal-Safe---Architecture-and-UserFlow?type=whiteboard&node-id=0-1&t=QnY1lzG6fu24MZrB-0)
- [Youtube Video](https://youtu.be/CIJmzuCRWDg)
- [Presentation - Canva](https://www.canva.com/design/DAF9u4fUdrk/KoJrNl-asDcLF90t449PbA/edit?utm_content=DAF9u4fUdrk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

- [Deployed Client](https://sentinel-safe.vercel.app/)
- [Deployed Server](https://sentinel-safe-backend.vercel.com/)

<!-- - [Docker Image - Client](https://hub.docker.com/r/kpriyanshu2003/sentinel-safe-client) -->
<!-- - [Docker Image - Server](https://hub.docker.com/r/kpriyanshu2003/sentinel-safe-server) -->
<!-- - [Docker Image - Model](https://hub.docker.com/r/kpriyanshu2003/sentinel-safe-model) -->

## Contributors

- [Kumar Priyanshu](https://github.com/kpriyanshu2003)
- [Akangkha Sarkar](https://github.com/Akangkha)
- [Swati Mishra](https://github.com/swatimishra02)
- [Debarghya Roy](https://github.com/DebarghyaRoy02)

## Open Source Projects Used - Python Models

- [Ultralytics](https://github.com/ultralytics/ultralytics)
- [Ultralytics YOLOv5](https://github.com/ultralytics/yolov5)
- [Open CV](https://github.com/opencv/opencv)
