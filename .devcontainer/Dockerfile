# Use the official Bun image (already has `bun` user)
FROM oven/bun:latest

# Match the path where Dev Containers will mount your workspace
# You can hardcode your repo name here
WORKDIR /workspaces/yaowang908.github.io

# Install extra tools as root
USER root
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Switch back to bun user provided by the base image
USER bun

# Default command - Dev Containers will override this anyway
CMD ["sleep", "infinity"]
