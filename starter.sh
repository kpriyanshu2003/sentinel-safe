#!/bin/bash

# Create a new detached tmux session named "dev" and start commands in different panes
tmux new-session -d -s dev -n client 'cd client && yarn dev'
tmux new-window -t dev: -n server 'cd server && yarn dev'
# tmux new-window -t dev: -n model 'cd server && prisma studio --schema ./src/prisma/schema.prisma' # for prisma studio
tmux new-window -t dev: -n model 'cd model && python main.py'

# Attach to the tmux session to view the output
tmux attach-session -t dev
