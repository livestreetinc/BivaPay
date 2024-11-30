#Use the official Node image with version
FROM node:20-alpine
# Use the official Playwright image as the base (recommended)
FROM mcr.microsoft.com/playwright:v1.38.0-jammy

#Create the app folder/or directory in the docker container
WORKDIR /app

#Copy all files to the current current directory(app)
# first dot means all files from the current app directory in the machine
#second dot means to the docker directory specified above(app)
COPY . .

#Run commands
#Install dependencies, and anything else just like the teminal, 
#incase of any other command, add a separate RUN limne

# Install any additional dependencies you need (if any)
RUN apt-get update && apt-get install -y \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libpango-1.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxshmfence1 \
    fonts-liberation \
    libnss3 \
    libxss1 \
    ca-certificates \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js and Playwright dependencies
RUN npm install

RUN npx playwright install --with-deps

#Expose port where application is 

EXPOSE 8080

#Set entry command for the node application

CMD [ "node", "index.js" ]

