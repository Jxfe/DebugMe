import requests
BASE = "http://127.0.0.1:5000/"

#response_from_search = requests.get(BASE + "/search/", {'key': 'asdfqfasdf4yt',
#                                                                'category': 'User'})
                                                                
#response_from_search = requests.get(BASE + "/user/Piper", {'name':'AppleMan','email':'apples@gmail.com','password':'apples'})
#print(response_from_search)
#print(response_from_search.json())

response_from_search = requests.get(BASE + "/user/AppleMan", {})
print(response_from_search)
print(response_from_search.json())

