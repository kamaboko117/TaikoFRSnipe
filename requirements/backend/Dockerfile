FROM node

WORKDIR /app/
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["yarn", "run", "start:dev"]