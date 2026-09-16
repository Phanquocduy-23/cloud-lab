# Câu 51: Khai báo Node.js Image làm Base Image
FROM node:20-alpine

# Câu 52: Thiết lập thư mục làm việc bên trong Frontend Container
WORKDIR /app

# Câu 53: Sao chép package.json và package-lock.json vào Container
COPY package*.json ./

# Câu 54: Cài đặt các package của React Application
RUN npm install

# Câu 55: Sao chép source code React vào Container
COPY . .

# Câu 56 & Câu 57: Build React Application (kết quả sẽ tạo ra thư mục dist)
RUN npm run build

# Lệnh bổ sung: Cài đặt môi trường để chạy code tĩnh từ thư mục dist
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]