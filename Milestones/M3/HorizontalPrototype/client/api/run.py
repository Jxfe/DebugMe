from debugme_api import create_app

app = create_app(config_name='production')

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')