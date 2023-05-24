FROM node

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
WORKDIR /app/

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["yarn", "start"]
# CMD ["tail", "-f", "/dev/null"]