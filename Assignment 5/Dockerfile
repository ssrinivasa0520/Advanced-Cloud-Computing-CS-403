FROM ubuntu:latest
RUN apt-get update && apt-get install -y figlet
WORKDIR /app
COPY script.sh .
RUN chmod +x script.sh
CMD ["./script.sh"]
