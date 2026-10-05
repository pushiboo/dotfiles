echo "remove all exiting tls certs"
rm /etc/pihole/tls*
sleep 0.5
echo "Creating key + cert"
openssl req -x509 -nodes -newkey ec -pkeyopt ec_paramgen_curve:prime256v1 \
  -days 3650 \
  -keyout /etc/pihole/tls_ca.key \
  -out /etc/pihole/tls_ca.crt \
  -subj "/C=DE/O=piholePushCA/CN=piholePushCA"

sleep 0.5
# Generate server key + CSR
echo "Generate server key + CSR"
openssl req -new -newkey ec -pkeyopt ec_paramgen_curve:prime256v1 -nodes \
  -keyout /etc/pihole/tls.key \
  -out /tmp/tls.csr \
  -subj "/CN=pihole.push"

sleep 0.5
# Sign with the CA
echo "Sign with the CA"
openssl x509 -req -in /tmp/tls.csr \
  -CA /etc/pihole/tls_ca.crt \
  -CAkey /etc/pihole/tls_ca.key \
  -CAcreateserial \
  -out /etc/pihole/tls.crt \
  -days 365 -sha256 \
  -extfile <(printf "subjectAltName=DNS:pihole.push")

sleep 0.5
# Combine into the PEM Pi-hole expects
echo "Combine into the PEM Pi-hole expects"
cat /etc/pihole/tls.crt /etc/pihole/tls.key > /etc/pihole/tls.pem
