## cài đặt openssl
## thiết lập biến môi trường

- set OPENSSL_CONF=C:\Program Files\OpenSSL-Win64\bin\openssl.cnf
- set Path= C:\Program Files\OpenSSL-Win64\bin

## vào thư mục bin. mở terminal và chạy 3 lệnh sau:

- openssl genrsa -out private.key 1024
- openssl req -new -key private.key -out cert.csr
- openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem


### chú thích 

- openssl genrsa -out private.key 1024: Tạo một khóa RSA có độ dài 1024 bit và lưu vào tệp private.key.
- openssl req -new -key private.key -out cert.csr: Tạo một yêu cầu chứng chỉ mới (CSR) sử dụng khóa riêng tư từ tệp private.key và lưu vào tệp cert.csr.
- openssl x509 -req -in cert.csr -signkey 
- private.key -out certificate.pem: Sử dụng yêu cầu chứng chỉ từ tệp cert.csr và khóa riêng tư từ tệp private.key để tạo và ký một chứng chỉ X.509, rồi lưu vào tệp certificate.pem.

