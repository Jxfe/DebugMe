import requests

BASE = "http://127.0.0.1:5000/"
data = {
    'email': 'e',
    'password': 'p'
}
response = requests.get(BASE + "/test", {})
print(response)
# print(response.json())
