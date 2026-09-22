# Generate a 2048-bit RSA key and self-signed certificate valid for 365 days
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/pihole/tls.key \
  -out /etc/pihole/tls.crt \
  -subj "/CN=pihole.push"   
sleep 1
cat /etc/pihole/tls.crt /etc/pihole/tls.key > /etc/pihole/tls.pem
sudo chown pihole:pihole /etc/pihole/tls.pem
sudo chmod 600 /etc/pihole/tls.pem
# Restart Pi-hole FTL to apply changes
sudo service pihole-FTL restart
