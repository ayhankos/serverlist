# Base image olarak Node.js'i seçin
FROM node:18-alpine

# Çalışma dizinini oluşturun
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalayın
COPY package*.json ./

# Bağımlılıkları yükleyin
RUN npm install

# Proje dosyalarını kopyalayın
COPY . .

# Uygulamayı build edin
RUN npm run build

# 3000 portunu açın
EXPOSE 3000

# Next.js uygulamasını başlatın
CMD ["npm", "run", "start"]
