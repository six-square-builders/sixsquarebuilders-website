#!/usr/bin/env python3
import requests
    
from tenacity import retry, stop_after_attempt, wait_fixed

# ✅ Telegram bot token (regenerate this later for safety)
BOT_TOKEN = '8086613156:AAGOFzh8IWBPUT_zU4ip23bFIW5qcxNh8S4'

# ✅ Your personal chat ID
CHAT_ID = '1374496521'

def send_telegram_alert(message):
    url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'
    payload = {
        'chat_id': CHAT_ID,
        'text': message,
        'parse_mode': 'Markdown'
    }
    response = requests.post(url, data=payload)
    if response.status_code != 200:
        print(f"❌ Telegram alert failed: {response.text}")

@retry(stop=stop_after_attempt(3), wait=wait_fixed(5))
def deploy():
    # Simulate a failing deployment (replace this with real command or endpoint)
    response = requests.get("https://httpstat.us/500")  # Always fails
    if response.status_code != 200:
        raise Exception("Deployment failed with status code: " + str(response.status_code))
    return "Deployment successful"

try:
    result = deploy()
    send_telegram_alert(f"✅ *Success:* {result}")
except Exception as e:
    send_telegram_alert(f"❌ *Failed after retries:* {str(e)}")
