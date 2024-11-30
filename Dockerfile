#Use the official Node image with version
FROM node:20-alpine

#Create the app folder/or directory in the docker container
WORKDIR /app

#Copy all files to the current current directory(app)
# first dot means all files from the current app directory in the machine
#second dot means to the docker directory specified above(app)
COPY . .

#Run commands
#Install dependencies, and anything else just like the teminal, 
#incase of any other command, add a separate RUN limne

RUN npm install 

#install browser after packages ===
RUN npx playwright install

RUN sudo apt update && sudo apt install -y \
libnss3 \
libxss1 \
libasound2 \
libatk1.0-0 \
libatk-bridge2.0-0 \
libcups2 \
libdbus-1-3 \
libdrm2 \
libgbm1 \
libgdk-pixbuf2.0-0 \
libgtk-3-0 \
libpango-1.0-0 \
libxcomposite1 \
libxrandr2 \
libxdamage1 \
libxshmfence1 \
ca-certificates \
fonts-liberation \
libappindicator3-1 \
lsb-release \
xdg-utils \
wget

# Also download new browser binaries and their dependencies:
#RUN npx playwright install --with-deps


#Install Browser

#Expose port where application is 

EXPOSE 8080

#Set entry command for the node application

CMD [ "node", "index.js" ]

