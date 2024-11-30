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

#Install Browser

#Expose port where application is 

EXPOSE 8080

#Set entry command for the node application

CMD [ "node", "index.js" ]
