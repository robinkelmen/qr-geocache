FROM nginx:alpine
COPY index.html qr-video.html jsQR.embed.js sw.js manifest.json /usr/share/nginx/html/
EXPOSE 80
