FROM tiangolo/nginx-rtmp
RUN apt update && apt install -y ffmpeg
COPY ./nginx.conf /etc/nginx/nginx.conf