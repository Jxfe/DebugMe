import requests

BASE = "http://127.0.0.1:5000/"
data = {
    'email': 'e',
    'password': 'p'
}
#response = requests.put(BASE + "/user/apple", {'name':'AppleMan','email':'apples@gmail.com','password':'apples'})
#print(response)
#print(response.json())

response = requests.get(BASE + "/user-auth/AppleMan/apple", {})
print(response)
print(response.json())