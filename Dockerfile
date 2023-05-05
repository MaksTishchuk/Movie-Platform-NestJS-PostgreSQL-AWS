FROM node:18

WORKDIR /api-server

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 80

RUN chmod +x /api-server/startProduction.sh
RUN chown root:root startProduction.sh

CMD /api-server/startProduction.sh