#!/bin/bash

RETRIES=3
COUNT=0

while [ $COUNT -lt $RETRIES ]; do
  echo "Attempt $(($COUNT+1))..."

  # ✅ Correct: Call Python script
  python3 scripts/deploy_script.py && break

  COUNT=$((COUNT+1))
  sleep 5
done

if [ $COUNT -eq $RETRIES ]; then
  curl -s -X POST "https://api.telegram.org/bot8086613156:AAGOFzh8IWBPUT_zU4ip23bFIW5qcxNh8S4/sendMessage" \
       -d chat_id=1374496521 \
       -d text="❌ Deployment failed after $RETRIES attempts"
  exit 1
else
  curl -s -X POST "https://api.telegram.org/bot8086613156:AAGOFzh8IWBPUT_zU4ip23bFIW5qcxNh8S4/sendMessage" \
       -d chat_id=1374496521 \
       -d text="✅ Deployment successful after $(($COUNT+1)) attempt(s)"
fi
