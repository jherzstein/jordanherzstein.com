FROM ruby:3.3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    git \
    openssl \
  && rm -rf /var/lib/apt/lists/*

RUN gem install neocities

WORKDIR /

COPY push.sh ./

CMD ["./push.sh"]
