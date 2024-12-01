# Use the official Playwright image as the base (includes Node.js)
FROM mcr.microsoft.com/playwright:v1.38.0-jammy

# Set the working directory in the container
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

# Install package.json dependenecies
RUN npm install

#Install playwright dependencies
RUN npx playwright install --with-deps

#Install pm2 process manager for the app ==
RUN npm install pm2 -g

# Expose the port the app will run on
EXPOSE 8080

# Use PM2 to run the app
CMD ["pm2-runtime", "index.js"]
