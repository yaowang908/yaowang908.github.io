# Use the official Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /workspace

# Install system dependencies if needed
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create bun user if it doesn't exist
RUN groupadd -r bun && useradd -r -g bun bun || true

# Set user to bun (non-root)
USER bun

# Default command (can be overridden)
CMD ["/bin/bash"]

