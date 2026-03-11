FROM python:3.11-slim

WORKDIR /app

# Install system dependencies if any
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything
COPY . .

# Expose common ports
EXPOSE 8000 8001 8002

ENV PYTHONPATH=/app
ENV DISABLE_AUTH=1
ENV RATE_LIMIT_ENABLED=0

# Default command (will be overridden by docker-compose)
CMD ["uvicorn", "api_gateway_local.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
