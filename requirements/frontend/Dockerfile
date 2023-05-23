FROM node

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
WORKDIR /app/

ENTRYPOINT ["/entrypoint.sh"]
CMD ["yarn", "start"]
# CMD ["tail", "-f", "/dev/null"]