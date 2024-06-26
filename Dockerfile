# Use a imagem oficial do Node.js como base
FROM node:21.7.2

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do aplicativo
RUN yarn 

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# Exponha a porta para acessar o aplicativo
EXPOSE ${PORT}

# Comando para iniciar a aplicação
CMD [ "yarn", "start" ]
